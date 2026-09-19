const Symptom = require("../models/Symptom");

// Add Symptoms
exports.addSymptom = async (req, res) => {
    try {
        const symptom = await Symptom.create({
            ...req.body,
            userId: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Symptoms Added Successfully",
            data: symptom
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Symptoms
exports.getSymptoms = async (req, res) => {
    try {
        const symptoms = await Symptom.find({ userId: req.user.id })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: symptoms.length,
            data: symptoms
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Symptom By ID
exports.getSymptom = async (req, res) => {
    try {
        const symptom = await Symptom.findOne({ _id: req.params.id, userId: req.user.id });

        if (!symptom) {
            return res.status(404).json({
                success: false,
                message: "Symptom Not Found"
            });
        }

        res.json({
            success: true,
            data: symptom
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Symptoms
exports.updateSymptom = async (req, res) => {
    try {
        const symptom = await Symptom.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );

        if (!symptom) {
            return res.status(404).json({
                success: false,
                message: "Symptom Not Found"
            });
        }

        res.json({
            success: true,
            message: "Symptoms Updated Successfully",
            data: symptom
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Symptoms
exports.deleteSymptom = async (req, res) => {
    try {
        const symptom = await Symptom.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

        if (!symptom) {
            return res.status(404).json({
                success: false,
                message: "Symptom Not Found"
            });
        }

        res.json({
            success: true,
            message: "Symptoms Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};