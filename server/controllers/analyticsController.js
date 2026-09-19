const Prediction = require("../models/Prediction");
const Cycle = require("../models/Cycle");

exports.getAnalytics = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch predictions and cycles for this user only
        const predictions = await Prediction.find({ userId })
            .sort({ createdAt: 1 });

        const cycles = await Cycle.find({ userId })
            .sort({ createdAt: 1 });

        // Weight Progress
        const weightProgress = predictions.map(item => ({
            date: item.createdAt,
            weight: item.weight
        }));

        // BMI Progress
        const bmiProgress = predictions.map(item => ({
            date: item.createdAt,
            bmi: item.bmi
        }));

        // Cycle Progress
        const cycleProgress = cycles.map(item => ({
            date: item.createdAt,
            cycleLength: item.cycleLength
        }));

        // Calculate MVI history
        const mviHistory = predictions.map(record => {
            // 1. BMI Component (Healthy: 18.5 - 24.9)
            const bmi = record.bmi;
            let bmiScore = 75; // Default fallback
            if (bmi) {
                if (bmi >= 18.5 && bmi <= 24.9) bmiScore = 100;
                else if (bmi >= 25 && bmi <= 29.9) bmiScore = 70;
                else bmiScore = 40;
            }

            // 2. Cycle Length Component (Healthy: 24 - 38 days)
            const cl = record.cycleLength;
            let cycleScore = 75;
            if (cl) {
                if (cl >= 24 && cl <= 38) cycleScore = 100;
                else cycleScore = 50;
            }

            // 3. Insulin Component (Healthy: <= 15 uIU/mL)
            const ins = record.insulin;
            let insulinScore = 75;
            if (ins) {
                if (ins <= 15) insulinScore = 100;
                else if (ins <= 25) insulinScore = 70;
                else insulinScore = 40;
            }

            // 4. AMH Component (Healthy: 1.5 - 4.0 ng/mL)
            const amh = record.amh;
            let amhScore = 75;
            if (amh) {
                if (amh >= 1.5 && amh <= 4.0) amhScore = 100;
                else amhScore = 50;
            }

            // 5. Symptoms Score (Risk-free score: 100 - probability of PCOS)
            const prob = record.probability;
            const symptomScore = Math.round(100 - (prob || 0));

            // Average MVI score
            const mviIndex = Math.round((bmiScore + cycleScore + insulinScore + amhScore + symptomScore) / 5);

            return {
                date: record.createdAt,
                score: mviIndex,
                breakdown: {
                    bmi: bmiScore,
                    cycle: cycleScore,
                    insulin: insulinScore,
                    amh: amhScore,
                    symptoms: symptomScore
                }
            };
        });

        const latestMvi = mviHistory[mviHistory.length - 1] || null;
        const latestPrediction = predictions[predictions.length - 1] || null;

        res.status(200).json({
            success: true,
            analytics: {
                totalPredictions: predictions.length,
                weightProgress,
                bmiProgress,
                cycleProgress,
                mviHistory,
                latestMvi,
                latestPrediction,
                latestWeight: latestPrediction ? latestPrediction.weight : null
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};