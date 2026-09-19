const Notification = require("../models/Notification");

// Add Notification
exports.addNotification = async (req, res) => {

    try {

        const notification = await Notification.create(req.body);

        res.status(201).json({
            success: true,
            message: "Notification Added Successfully",
            data: notification
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get All Notifications
exports.getNotifications = async (req, res) => {

    try {

        const notifications = await Notification.find()
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: notifications.length,
            data: notifications
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Notification By ID
exports.getNotification = async (req, res) => {

    try {

        const notification = await Notification.findById(req.params.id);

        if (!notification) {

            return res.status(404).json({
                success: false,
                message: "Notification Not Found"
            });

        }

        res.json({
            success: true,
            data: notification
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Mark Notification as Read
exports.markAsRead = async (req, res) => {

    try {

        const notification = await Notification.findByIdAndUpdate(

            req.params.id,

            {
                isRead: true
            },

            {
                new: true
            }

        );

        res.json({
            success: true,
            message: "Notification Marked as Read",
            data: notification
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete Notification
exports.deleteNotification = async (req, res) => {

    try {

        await Notification.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Notification Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};