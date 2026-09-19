const mongoose = require("mongoose");

const labReportSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    lh: {
        type: Number,
        required: true
    },

    fsh: {
        type: Number,
        required: true
    },

    amh: {
        type: Number,
        required: true
    },

    testosterone: {
        type: Number,
        required: true
    },

    insulin: {
        type: Number,
        required: true
    },

    hba1c: {
        type: Number,
        default: 0
    },

    glucose: {
        type: Number,
        default: 0
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("LabReport", labReportSchema);