const Reminder = require("../models/Reminder");

// Add Reminder
exports.addReminder = async (req, res) => {

    try {

        const reminder = await Reminder.create(req.body);

        res.status(201).json({
            success: true,
            message: "Reminder Added Successfully",
            data: reminder
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get All Reminders
exports.getReminders = async (req, res) => {

    try {

        const reminders = await Reminder.find()
            .sort({ reminderDate: 1 });

        res.json({
            success: true,
            count: reminders.length,
            data: reminders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Reminder By ID
exports.getReminder = async (req, res) => {

    try {

        const reminder = await Reminder.findById(req.params.id);

        if (!reminder) {

            return res.status(404).json({
                success: false,
                message: "Reminder Not Found"
            });

        }

        res.json({
            success: true,
            data: reminder
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Reminder
exports.updateReminder = async (req, res) => {

    try {

        const reminder = await Reminder.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            success: true,
            message: "Reminder Updated Successfully",
            data: reminder
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete Reminder
exports.deleteReminder = async (req, res) => {

    try {

        await Reminder.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Reminder Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};