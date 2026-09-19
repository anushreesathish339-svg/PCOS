const mongoose = require("mongoose");

const medicationSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    medicineName: {
        type: String,
        required: true
    },

    dosage: {
        type: String,
        required: true
    },

    frequency: {
        type: String,
        required: true
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date
    },

    reminderTime: {
        type: String
    },

    status: {
        type: String,
        default: "Active"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Medication", medicationSchema);