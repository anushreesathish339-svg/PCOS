const Prediction = require("../models/Prediction");

// Get Prediction History
exports.getHistory = async (req, res) => {

    try {

        const history = await Prediction.find()
            .populate("userId", "fullName email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: history.length,
            data: history
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get History By ID
exports.getHistoryById = async (req, res) => {

    try {

        const history = await Prediction.findById(req.params.id)
            .populate("userId", "fullName email");

        if (!history) {

            return res.status(404).json({
                success: false,
                message: "History Not Found"
            });

        }

        res.status(200).json({
            success: true,
            data: history
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete History
exports.deleteHistory = async (req, res) => {

    try {

        const history = await Prediction.findByIdAndDelete(req.params.id);

        if (!history) {

            return res.status(404).json({
                success: false,
                message: "History Not Found"
            });

        }

        res.json({
            success: true,
            message: "History Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};