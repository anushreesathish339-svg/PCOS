const Medication = require("../models/Medication");

// Add Medication
exports.addMedication = async (req, res) => {

    try {

        const medication = await Medication.create(req.body);

        res.status(201).json({
            success: true,
            message: "Medication Added Successfully",
            data: medication
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get All Medications
exports.getMedications = async (req, res) => {

    try {

        const medications = await Medication.find()
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: medications.length,
            data: medications
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Medication By ID
exports.getMedication = async (req, res) => {

    try {

        const medication = await Medication.findById(req.params.id);

        if (!medication) {

            return res.status(404).json({
                success: false,
                message: "Medication Not Found"
            });

        }

        res.json({
            success: true,
            data: medication
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Medication
exports.updateMedication = async (req, res) => {

    try {

        const medication = await Medication.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            success: true,
            message: "Medication Updated Successfully",
            data: medication
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete Medication
exports.deleteMedication = async (req, res) => {

    try {

        await Medication.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Medication Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};