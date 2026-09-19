const Prediction = require("../models/Prediction");
const User = require("../models/User");
const Cycle = require("../models/Cycle");
const LabReport = require("../models/LabReport");
const Symptom = require("../models/Symptom");
const { predictPCOS, getModelMetrics } = require("../services/pythonService");

const FEATURE_RULES = {
    Age: { collection: "user profile", field: "age" },
    Weight: { collection: "user profile", field: "weight" },
    Height: { collection: "user profile", field: "height" },
    BMI: { collection: "user profile", field: "bmi" },
    Cycle_Length: { collection: "latest cycle record", field: "cycleLength" },
    LH: { collection: "latest lab report", field: "lh" },
    FSH: { collection: "latest lab report", field: "fsh" },
    Testosterone: { collection: "latest lab report", field: "testosterone" },
    Insulin: { collection: "latest lab report", field: "insulin" },
    AMH: { collection: "latest lab report", field: "amh" },
    Body_Temperature: { collection: "latest lab report", field: "bodyTemperature" },
    Sexually_Active: { collection: "latest symptom record", field: "sexuallyActive" },
    Contraceptive_Pills: { collection: "latest symptom record", field: "contraceptivePills" },
    Breast_Tenderness: { collection: "latest symptom record", field: "breastTenderness" },
    Nipple_Soreness: { collection: "latest symptom record", field: "nippleSoreness" },
};

// The model uses dataset column names, while API clients use conventional
// camel-case field names. Accept both so manually entered form values are not
// silently ignored when profile/history data is unavailable.
const REQUEST_FIELD_ALIASES = {
    Age: ["Age", "age"],
    Weight: ["Weight", "weight"],
    Height: ["Height", "height"],
    BMI: ["BMI", "bmi"],
    Cycle_Length: ["Cycle_Length", "cycleLength", "cycle_length"],
    LH: ["LH", "lh"],
    FSH: ["FSH", "fsh"],
    Testosterone: ["Testosterone", "testosterone"],
    Insulin: ["Insulin", "insulin", "fastingInsulin"],
    AMH: ["AMH", "amh"],
    Body_Temperature: ["Body_Temperature", "bodyTemperature", "body_temperature"],
    Sexually_Active: ["Sexually_Active", "sexuallyActive", "sexually_active"],
    Contraceptive_Pills: ["Contraceptive_Pills", "contraceptivePills", "contraceptive_pills"],
    Breast_Tenderness: ["Breast_Tenderness", "breastTenderness", "breast_tenderness"],
    Nipple_Soreness: ["Nipple_Soreness", "nippleSoreness", "nipple_soreness"],
};

const getRequestValue = (requestBody, name) => {
    for (const field of REQUEST_FIELD_ALIASES[name] || [name]) {
        const value = requestBody[field];
        if (value !== null && value !== undefined && value !== "") {
            return { value, field };
        }
    }
    return null;
};

const getNumericRequestValue = (requestBody, fields, fallback = 0) => {
    for (const field of fields) {
        const value = requestBody[field];
        if (value !== null && value !== undefined && value !== "") {
            const numericValue = Number(value);
            return Number.isFinite(numericValue) ? numericValue : fallback;
        }
    }
    return fallback;
};

const DEFAULT_FEATURE_FALLBACKS = {
    Testosterone: 30,
    Insulin: 12,
    Body_Temperature: 98.6,
    Sexually_Active: 0,
    Contraceptive_Pills: 0,
    Breast_Tenderness: 0,
    Nipple_Soreness: 0,
};

const readFeature = (name, records, requestBody) => {
    // 1. Check explicitly submitted form values in request body first
    const requestValue = getRequestValue(requestBody, name);
    if (requestValue && requestValue.value !== undefined && requestValue.value !== null && requestValue.value !== "") {
        return {
            value: Number(requestValue.value),
            source: "prediction request",
            field: requestValue.field,
        };
    }
    // 2. Check saved user database records
    const rule = FEATURE_RULES[name];
    if (rule) {
        const record = records[rule.collection];
        if (record?.[rule.field] !== null && record?.[rule.field] !== undefined) {
            return {
                value: Number(rule.transform ? rule.transform(record[rule.field]) : record[rule.field]),
                source: rule.collection,
                field: rule.field,
                recordId: record._id?.toString(),
                recordedAt: record.updatedAt,
            };
        }
    }
    // 3. Fallback defaults for secondary parameters
    if (DEFAULT_FEATURE_FALLBACKS[name] !== undefined) {
        return {
            value: DEFAULT_FEATURE_FALLBACKS[name],
            source: "default baseline",
            field: name,
        };
    }
    return null;
};

const buildModelInput = async (userId, requestBody) => {
    const [user, cycle, lab, symptom] = await Promise.all([
        User.findById(userId).lean(),
        Cycle.findOne({ userId }).sort({ createdAt: -1 }).lean(),
        LabReport.findOne({ userId }).sort({ createdAt: -1 }).lean(),
        Symptom.findOne({ userId }).sort({ createdAt: -1 }).lean(),
    ]);
    if (!user) {
        const error = new Error("Authenticated user was not found");
        error.statusCode = 404;
        throw error;
    }

    const records = {
        "user profile": user,
        "latest cycle record": cycle,
        "latest lab report": lab,
        "latest symptom record": symptom,
    };
    const features = {};
    const featureSources = {};
    for (const name of Object.keys(FEATURE_RULES)) {
        let result = readFeature(name, records, requestBody);
        if (!result && name === "BMI" && user.weight && user.height) {
            result = {
                value: Number((user.weight / ((user.height / 100) ** 2)).toFixed(2)),
                source: "calculated from user profile",
                field: "weight / height²",
            };
        }
        if (result && Number.isFinite(result.value)) {
            features[name] = result.value;
            featureSources[name] = {
                source: result.source,
                field: result.field,
                recordId: result.recordId,
                recordedAt: result.recordedAt,
            };
        }
    }
    const missing = Object.keys(FEATURE_RULES).filter((name) => features[name] === undefined);
    if (missing.length) {
        const error = new Error(`Missing prediction data: ${missing.join(", ")}`);
        error.statusCode = 400;
        error.details = {
            missing,
            expectedSources: Object.fromEntries(
                missing.map((name) => [name, FEATURE_RULES[name]])
            ),
            fallback: "Missing values may be supplied in the prediction request body.",
        };
        throw error;
    }
    return { features, featureSources, lab };
};

exports.createPrediction = async (req, res) => {
    try {
        const userId = req.user.id;
        const { features, featureSources, lab } = await buildModelInput(userId, req.body);
        const mlResult = await predictPCOS(features);
        const prediction = await Prediction.create({
            userId,
            age: features.Age,
            weight: features.Weight,
            height: features.Height,
            bmi: features.BMI,
            cycleLength: features.Cycle_Length,
            lh: features.LH,
            fsh: features.FSH,
            amh: features.AMH,
            testosterone: lab?.testosterone ?? getNumericRequestValue(
                req.body,
                ["Testosterone", "testosterone"]
            ),
            insulin: lab?.insulin ?? getNumericRequestValue(
                req.body,
                ["Insulin", "insulin", "fastingInsulin"]
            ),
            prediction: mlResult.prediction,
            probability: mlResult.probability,
            algorithm: mlResult.algorithm,
            modelMetrics: mlResult.modelMetrics,
            featuresUsed: mlResult.featuresUsed,
            featureSources,
        });
        res.status(201).json({
            success: true,
            message: "Prediction completed successfully",
            data: prediction,
            result: mlResult,
            dataProvenance: featureSources,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
            details: error.details,
        });
    }
};

exports.getModelInfo = async (_req, res) => {
    try {
        res.json({ success: true, data: await getModelMetrics() });
    } catch (error) {
        res.status(503).json({ success: false, message: "Prediction service is unavailable" });
    }
};

exports.getPredictions = async (req, res) => {
    try {
        const predictions = await Prediction.find({ userId: req.user.id })
            .sort({ createdAt: -1 });
        res.json({ success: true, count: predictions.length, data: predictions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getPrediction = async (req, res) => {
    try {
        const prediction = await Prediction.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });
        if (!prediction) {
            return res.status(404).json({ success: false, message: "Prediction not found" });
        }
        res.json({ success: true, data: prediction });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deletePrediction = async (req, res) => {
    try {
        const prediction = await Prediction.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id,
        });
        if (!prediction) {
            return res.status(404).json({ success: false, message: "Prediction not found" });
        }
        res.json({ success: true, message: "Prediction deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
