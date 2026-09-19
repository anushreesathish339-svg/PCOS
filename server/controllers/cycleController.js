const Cycle = require("../models/Cycle");

// Add Cycle
exports.addCycle = async (req, res) => {
    try {

        const cycle = await Cycle.create(req.body);

        res.status(201).json({
            success: true,
            message: "Cycle Added Successfully",
            data: cycle
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Cycles
exports.getCycles = async (req, res) => {

    try {

        const cycles = await Cycle.find().sort({
            createdAt: -1
        });

        res.json({
            success: true,
            count: cycles.length,
            data: cycles
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Cycle By ID
exports.getCycle = async (req, res) => {

    try {

        const cycle = await Cycle.findById(req.params.id);

        if (!cycle) {

            return res.status(404).json({
                success: false,
                message: "Cycle Not Found"
            });

        }

        res.json({
            success: true,
            data: cycle
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Cycle
exports.updateCycle = async (req, res) => {

    try {

        const cycle = await Cycle.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            success: true,
            message: "Cycle Updated Successfully",
            data: cycle
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete Cycle
exports.deleteCycle = async (req, res) => {

    try {

        await Cycle.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Cycle Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};