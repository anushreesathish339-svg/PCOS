const Yoga = require("../models/Yoga");

// Add Yoga Pose
exports.addYoga = async (req, res) => {

    try {

        const yoga = await Yoga.create(req.body);

        res.status(201).json({
            success: true,
            message: "Yoga Pose Added Successfully",
            data: yoga
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get All Yoga Poses
exports.getYoga = async (req, res) => {

    try {

        const yoga = await Yoga.find();

        res.json({
            success: true,
            count: yoga.length,
            data: yoga
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Yoga By ID
exports.getYogaById = async (req, res) => {

    try {

        const yoga = await Yoga.findById(req.params.id);

        if (!yoga) {

            return res.status(404).json({
                success: false,
                message: "Yoga Pose Not Found"
            });

        }

        res.json({
            success: true,
            data: yoga
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Yoga
exports.updateYoga = async (req, res) => {

    try {

        const yoga = await Yoga.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            success: true,
            message: "Yoga Updated Successfully",
            data: yoga
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete Yoga
exports.deleteYoga = async (req, res) => {

    try {

        await Yoga.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Yoga Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};