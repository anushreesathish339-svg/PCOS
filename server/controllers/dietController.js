const Diet = require("../models/Diet");

// Add Diet
exports.addDiet = async (req, res) => {

    try {

        const diet = await Diet.create(req.body);

        res.status(201).json({
            success: true,
            message: "Diet Added Successfully",
            data: diet
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get All Diet Plans
exports.getDiet = async (req, res) => {

    try {

        const diet = await Diet.find();

        res.json({
            success: true,
            count: diet.length,
            data: diet
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Diet By ID
exports.getDietById = async (req, res) => {

    try {

        const diet = await Diet.findById(req.params.id);

        if (!diet) {

            return res.status(404).json({
                success: false,
                message: "Diet Plan Not Found"
            });

        }

        res.json({
            success: true,
            data: diet
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Diet
exports.updateDiet = async (req, res) => {

    try {

        const diet = await Diet.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            success: true,
            message: "Diet Updated Successfully",
            data: diet
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete Diet
exports.deleteDiet = async (req, res) => {

    try {

        await Diet.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Diet Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};