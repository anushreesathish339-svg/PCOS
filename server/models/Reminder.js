const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    reminderDate: {
        type: Date,
        required: true
    },

    reminderTime: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: ["Medication", "Appointment", "Exercise", "Diet", "Other"],
        default: "Other"
    },

    status: {
        type: String,
        enum: ["Pending", "Completed"],
        default: "Pending"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Reminder", reminderSchema);