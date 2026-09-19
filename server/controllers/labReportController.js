const LabReport = require("../models/LabReport");

// Add Lab Report
exports.addLabReport = async (req, res) => {

    try {

        const report = await LabReport.create(req.body);

        res.status(201).json({
            success: true,
            message: "Lab Report Added Successfully",
            data: report
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get All Reports
exports.getLabReports = async (req, res) => {

    try {

        const reports = await LabReport.find().sort({
            createdAt: -1
        });

        res.json({
            success: true,
            count: reports.length,
            data: reports
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Report By ID
exports.getLabReport = async (req, res) => {

    try {

        const report = await LabReport.findById(req.params.id);

        if (!report) {

            return res.status(404).json({
                success: false,
                message: "Lab Report Not Found"
            });

        }

        res.json({
            success: true,
            data: report
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Report
exports.updateLabReport = async (req, res) => {

    try {

        const report = await LabReport.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            success: true,
            message: "Lab Report Updated Successfully",
            data: report
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete Report
exports.deleteLabReport = async (req, res) => {

    try {

        await LabReport.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Lab Report Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};