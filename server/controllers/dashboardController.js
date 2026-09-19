const User = require("../models/User");
const Prediction = require("../models/Prediction");
const Cycle = require("../models/Cycle");
const LabReport = require("../models/LabReport");
const Medication = require("../models/Medication");
const Reminder = require("../models/Reminder");
const Symptom = require("../models/Symptom");

exports.getDashboard = async (req, res) => {
    try {
        const userId = req.user.id;

        const totalUsers = await User.countDocuments();
        const totalPredictions = await Prediction.countDocuments({ userId });
        const totalCycles = await Cycle.countDocuments({ userId });
        const totalLabReports = await LabReport.countDocuments({ userId });
        const totalMedications = await Medication.countDocuments({ userId });
        const totalSymptoms = await Symptom.countDocuments({ userId });

        const upcomingReminders = await Reminder.find({
            userId,
            status: "Pending"
        }).sort({ reminderDate: 1 });

        const latestPrediction = await Prediction.findOne({ userId })
            .sort({ createdAt: -1 });

        const latestCycle = await Cycle.findOne({ userId })
            .sort({ createdAt: -1 });

        // Calculate dynamic healthScore based on latest MVI index
        let healthScore = 0;
        if (latestPrediction) {
            const bmi = latestPrediction.bmi;
            let bmiScore = 75;
            if (bmi) {
                if (bmi >= 18.5 && bmi <= 24.9) bmiScore = 100;
                else if (bmi >= 25 && bmi <= 29.9) bmiScore = 70;
                else bmiScore = 40;
            }

            const cl = latestPrediction.cycleLength;
            let cycleScore = 75;
            if (cl) {
                if (cl >= 24 && cl <= 38) cycleScore = 100;
                else cycleScore = 50;
            }

            const ins = latestPrediction.insulin;
            let insulinScore = 75;
            if (ins) {
                if (ins <= 15) insulinScore = 100;
                else if (ins <= 25) insulinScore = 70;
                else insulinScore = 40;
            }

            const amh = latestPrediction.amh;
            let amhScore = 75;
            if (amh) {
                if (amh >= 1.5 && amh <= 4.0) amhScore = 100;
                else amhScore = 50;
            }

            const prob = latestPrediction.probability;
            const symptomScore = Math.round(100 - (prob || 0));

            healthScore = Math.round((bmiScore + cycleScore + insulinScore + amhScore + symptomScore) / 5);
        }

        res.status(200).json({
            success: true,
            dashboard: {
                totalUsers,
                totalPredictions,
                totalCycles,
                totalLabReports,
                totalMedications,
                totalSymptoms,
                healthScore,
                upcomingReminders,
                latestPrediction,
                latestCycle
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};