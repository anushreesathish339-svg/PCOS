const Feedback = require("../models/Feedback");

// Add Feedback
exports.addFeedback = async (req, res) => {

    try {

        const feedback = await Feedback.create(req.body);

        res.status(201).json({
            success: true,
            message: "Feedback Submitted Successfully",
            data: feedback
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get All Feedback
exports.getFeedback = async (req, res) => {

    try {

        const feedback = await Feedback.find()
            .populate("userId", "fullName email")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: feedback.length,
            data: feedback
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Feedback By ID
exports.getFeedbackById = async (req, res) => {

    try {

        const feedback = await Feedback.findById(req.params.id);

        if (!feedback) {

            return res.status(404).json({
                success: false,
                message: "Feedback Not Found"
            });

        }

        res.json({
            success: true,
            data: feedback
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete Feedback
exports.deleteFeedback = async (req, res) => {

    try {

        await Feedback.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Feedback Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};