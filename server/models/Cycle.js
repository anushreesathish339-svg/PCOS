const mongoose = require("mongoose");

const cycleSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    lastPeriod: {
        type: Date,
        required: true
    },

    cycleLength: {
        type: Number,
        default: 28
    },

    periodDuration: {
        type: Number,
        default: 5
    },

    nextPeriod: Date,

    ovulationDate: Date,

    symptoms: [String]

}, {
    timestamps: true
});

module.exports = mongoose.model("Cycle", cycleSchema);