import jsPDF from "jspdf";
import { Link } from "react-router-dom";

function ResultCard() {
    const storedPrediction = localStorage.getItem("prediction");
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
    const currentUser = storedUser ? JSON.parse(storedUser) : null;
    const currentUserId = currentUser?._id || currentUser?.id;

    let result = null;
    try {
        if (storedPrediction) {
            const parsed = JSON.parse(storedPrediction);
            const predictionUserId = parsed.inputData?.userId || parsed.userId;
            if (predictionUserId && currentUserId && predictionUserId === currentUserId) {
                result = parsed;
            } else {
                localStorage.removeItem("prediction");
            }
        }
    } catch {
        localStorage.removeItem("prediction");
    }

    const getRiskLevel = (probability) => {
        if (probability >= 70) {
            return {
                text: "HIGH RISK",
                color: "text-danger"
            };
        }
        if (probability >= 40) {
            return {
                text: "MEDIUM RISK",
                color: "text-warning"
            };
        }
        return {
            text: "LOW RISK",
            color: "text-success"
        };
    };

    const downloadReport = () => {
        if (!result) return;

        const risk = getRiskLevel(result.probability);
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("PCOS Prediction & Risk Guidance Report", 20, 20);

        doc.setFontSize(12);
        doc.text(`Prediction : ${result.prediction}`, 20, 40);
        doc.text(`Risk Level : ${risk.text}`, 20, 50);
        doc.text(`Probability : ${result.probability}%`, 20, 60);

        let y = 80;

        doc.text("Diet Recommendations", 20, y);
        y += 10;
        result.diet?.forEach(item => {
            doc.text("- " + item, 25, y);
            y += 8;
        });

        y += 5;
        doc.text("Exercise", 20, y);
        y += 10;
        result.exercise?.forEach(item => {
            doc.text("- " + item, 25, y);
            y += 8;
        });

        y += 5;
        doc.text("Yoga", 20, y);
        y += 10;
        result.yoga?.forEach(item => {
            doc.text("- " + item, 25, y);
            y += 8;
        });

        y += 5;
        doc.text("Medical Advice", 20, y);
        y += 10;
        result.medical?.forEach(item => {
            doc.text("- " + item, 25, y);
            y += 8;
        });

        doc.save("PCOS_Risk_Report.pdf");
    };

    if (!result) {
        return (
            <div className="alert alert-warning">
                No Prediction Available
            </div>
        );
    }

    const risk = getRiskLevel(result.probability);
    const rawProb = Number(result.probability || 0);
    const prob = Number.isFinite(rawProb) ? Math.round(rawProb <= 1 ? rawProb * 100 : rawProb) : 0;
    const riskLevel = prob >= 70 ? "high" : prob >= 40 ? "medium" : "low";

    // Feature Risk Contribution Analysis (How the prediction came)
    const amhVal = Number(result.inputData?.AMH || 0);
    const lhVal = Number(result.inputData?.LH || 0);
    const fshVal = Number(result.inputData?.FSH || 1);
    const ratioVal = fshVal > 0 ? (lhVal / fshVal).toFixed(2) : "N/A";
    const bmiVal = Number(result.inputData?.BMI || 0);
    const cycleVal = Number(result.inputData?.Cycle_Length || 0);
    const regularityVal = Number(result.inputData?.Cycle_Regularity || 0);
    const insulinVal = Number(result.inputData?.Insulin || 0);

    const riskDrivers = [];

    if (amhVal > 4.0) {
        riskDrivers.push({
            name: "AMH Level",
            val: `${amhVal} ng/mL`,
            ref: "1.5 – 4.0 ng/mL",
            impact: "High Impact (+30% risk)",
            status: "Elevated Ovarian Reserve Marker",
            level: "danger"
        });
    } else if (amhVal > 2.5) {
        riskDrivers.push({
            name: "AMH Level",
            val: `${amhVal} ng/mL`,
            ref: "1.5 – 4.0 ng/mL",
            impact: "Moderate Impact (+15% risk)",
            status: "Upper Borderline Range",
            level: "warning"
        });
    } else {
        riskDrivers.push({
            name: "AMH Level",
            val: amhVal ? `${amhVal} ng/mL` : "Normal",
            ref: "1.5 – 4.0 ng/mL",
            impact: "Low Impact",
            status: "Healthy Range",
            level: "success"
        });
    }

    if (ratioVal !== "N/A" && Number(ratioVal) >= 2.0) {
        riskDrivers.push({
            name: "LH / FSH Ratio",
            val: `${ratioVal}`,
            ref: "~ 1.0",
            impact: "High Impact (+25% risk)",
            status: "LH Dominant Hormone Imbalance",
            level: "danger"
        });
    } else if (ratioVal !== "N/A" && Number(ratioVal) >= 1.5) {
        riskDrivers.push({
            name: "LH / FSH Ratio",
            val: `${ratioVal}`,
            ref: "~ 1.0",
            impact: "Moderate Impact (+12% risk)",
            status: "Borderline Hormone Ratio",
            level: "warning"
        });
    } else {
        riskDrivers.push({
            name: "LH / FSH Ratio",
            val: ratioVal !== "N/A" ? `${ratioVal}` : "Normal",
            ref: "~ 1.0",
            impact: "Low Impact",
            status: "Normal Balanced Ratio",
            level: "success"
        });
    }

    if (regularityVal >= 4 || cycleVal > 38 || cycleVal < 24) {
        riskDrivers.push({
            name: "Menstrual Cycle",
            val: cycleVal ? `${cycleVal} Days` : "Irregular",
            ref: "24 – 38 Days",
            impact: "High Impact (+20% risk)",
            status: "Irregular Cycle / Anovulation",
            level: "danger"
        });
    } else {
        riskDrivers.push({
            name: "Menstrual Cycle",
            val: cycleVal ? `${cycleVal} Days` : "Regular",
            ref: "24 – 38 Days",
            impact: "Low Impact",
            status: "Regular Cycle Interval",
            level: "success"
        });
    }

    if (bmiVal >= 25) {
        riskDrivers.push({
            name: "Body Mass Index (BMI)",
            val: `${bmiVal.toFixed(1)} kg/m²`,
            ref: "18.5 – 24.9 kg/m²",
            impact: "Moderate Impact (+15% risk)",
            status: "Elevated Weight / Insulin Marker",
            level: "warning"
        });
    } else if (bmiVal > 0) {
        riskDrivers.push({
            name: "Body Mass Index (BMI)",
            val: `${bmiVal.toFixed(1)} kg/m²`,
            ref: "18.5 – 24.9 kg/m²",
            impact: "Low Impact",
            status: "Optimal Healthy Weight",
            level: "success"
        });
    }

    if (insulinVal > 15) {
        riskDrivers.push({
            name: "Fasting Insulin",
            val: `${insulinVal} µIU/mL`,
            ref: "≤ 15 µIU/mL",
            impact: "Moderate Impact (+10% risk)",
            status: "Elevated Fasting Insulin",
            level: "warning"
        });
    } else if (insulinVal > 0) {
        riskDrivers.push({
            name: "Fasting Insulin",
            val: `${insulinVal} µIU/mL`,
            ref: "≤ 15 µIU/mL",
            impact: "Low Impact",
            status: "Healthy Insulin Sensitivity",
            level: "success"
        });
    }

    const riskPlans = {
        high: {
            label: "High Risk Plan",
            summary: "Your screening probability suggests stronger PCOS-related patterns. Use this guidance as an actionable step prior to clinical consultation.",
            priorities: [
                "Schedule an appointment with a gynecologist or endocrinologist.",
                "Consistently log menstrual cycles, daily symptoms, and medications.",
                "Focus on gradual, sustainable lifestyle adjustments and stress reduction.",
                "Ask your clinician whether Fasting Glucose, Insulin, LH, FSH, and AMH panels are recommended."
            ]
        },
        medium: {
            label: "Moderate Risk Plan",
            summary: "Some clinical markers indicate moderate PCOS patterns that benefit from proactive tracking and balanced habits.",
            priorities: [
                "Discuss persistent or worsening physical symptoms with a healthcare professional.",
                "Aim for 150 minutes of moderate physical exercise per week.",
                "Pair carbohydrates with protein and healthy fiber to support insulin sensitivity.",
                "Re-evaluate your screening parameters after 4-6 weeks of consistent logging."
            ]
        },
        low: {
            label: "Low Risk Plan",
            summary: "Your screening result shows fewer PCOS-related indicators. Maintain your supportive routine and routine monitoring.",
            priorities: [
                "Maintain regular physical movement, adequate sleep, and balanced nutrition.",
                "Continue logging cycle intervals and symptom patterns.",
                "Focus on dietary consistency and variety rather than restriction.",
                "Consult a healthcare provider if new symptoms arise."
            ]
        }
    };

    const riskPlan = riskPlans[riskLevel];
    const inputRows = [
        ["Age", result.inputData?.Age, "years"],
        ["Weight", result.inputData?.Weight, "kg"],
        ["Height", result.inputData?.Height, "cm"],
        ["BMI", result.inputData?.BMI, ""],
        ["Cycle length", result.inputData?.Cycle_Length, "days"],
        ["LH", result.inputData?.LH, "mIU/mL"],
        ["FSH", result.inputData?.FSH, "mIU/mL"],
        ["AMH", result.inputData?.AMH, "ng/mL"],
        ["Testosterone", result.inputData?.Testosterone, "ng/dL"],
        ["Fasting insulin", result.inputData?.Insulin, "µIU/mL"],
        ["Body temperature", result.inputData?.Body_Temperature, "°C"]
    ].filter(([, value]) => value !== undefined);

    return (
        <div className="card shadow border-0 p-4 p-md-5">
            <h2 className="text-center mb-4 fw-bold">Prediction Result & Risk Guidance</h2>

            <h1 className={`text-center fw-bold ${risk.color}`}>
                {risk.text}
            </h1>

            <h4 className="text-center mt-2 fw-semibold">
                {result.prediction}
            </h4>

            <h3 className="text-center text-muted">
                Probability : {result.probability}%
            </h3>

            <hr className="my-4" />

            {/* Embedded Risk Guidance */}
            <div className="card border-0 bg-light p-4 mb-4 rounded-3 text-start shadow-sm">
                <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                    <h4 className="fw-bold text-dark m-0">📋 Personalized Risk Guidance</h4>
                    <span className={`badge ${riskLevel === 'high' ? 'bg-danger' : riskLevel === 'medium' ? 'bg-warning text-dark' : 'bg-success'} px-3 py-2 fs-6`}>
                        {riskPlan.label}
                    </span>
                </div>
                <p className="text-muted mb-3">{riskPlan.summary}</p>

                <div className="p-3 bg-white border rounded-3 shadow-sm">
                    <h5 className="fw-bold text-success mb-3">✅ Actionable Next Steps</h5>
                    <ul className="mb-0 ps-3">
                        {riskPlan.priorities.map((item, idx) => (
                            <li key={idx} className="mb-2 text-secondary small">{item}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-4">
                {inputRows.length > 0 && (
                    <>
                        <h4 className="fw-bold mb-3">Data used for this prediction</h4>
                        <div className="table-responsive mb-4">
                            <table className="table table-sm table-hover border">
                                <thead className="table-light">
                                    <tr>
                                        <th>Parameter</th>
                                        <th>Recorded Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inputRows.map(([label, value, unit]) => (
                                        <tr key={label}>
                                            <th scope="row" className="fw-medium">{label}</th>
                                            <td>{value} {unit}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                <h4 className="fw-bold mb-3">Diet Recommendations</h4>
                <ul className="list-group mb-4">
                    {result.diet?.map((item, index) => (
                        <li key={index} className="list-group-item">{item}</li>
                    ))}
                </ul>

                <h4 className="fw-bold mb-3">Exercise</h4>
                <ul className="list-group mb-4">
                    {result.exercise?.map((item, index) => (
                        <li key={index} className="list-group-item">{item}</li>
                    ))}
                </ul>

                <h4 className="fw-bold mb-3">Yoga</h4>
                <ul className="list-group mb-4">
                    {result.yoga?.map((item, index) => (
                        <li key={index} className="list-group-item">{item}</li>
                    ))}
                </ul>

                <h4 className="fw-bold mb-3">Medical Advice</h4>
                <ul className="list-group mb-4">
                    {result.medical?.map((item, index) => (
                        <li key={index} className="list-group-item">{item}</li>
                    ))}
                </ul>
            </div>

            <div className="d-flex flex-wrap gap-2 mt-4 pt-3 border-top">
                <button
                    className="btn btn-success btn-lg px-4"
                    onClick={downloadReport}
                >
                    Download Report
                </button>
                <Link className="btn btn-primary btn-lg px-4" to="/prediction?new=true">
                    Start New Screening
                </Link>
            </div>
        </div>
    );
}

export default ResultCard;
