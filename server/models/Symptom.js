const mongoose = require("mongoose");

const symptomSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    mood: {
        type: String
    },

    acne: {
        type: Boolean,
        default: false
    },

    hairFall: {
        type: Boolean,
        default: false
    },

    weightGain: {
        type: Boolean,
        default: false
    },

    fatigue: {
        type: Boolean,
        default: false
    },

    irregularPeriods: {
        type: Boolean,
        default: false
    },

    pelvicPain: {
        type: Boolean,
        default: false
    },

    breastTenderness: {
        type: Boolean,
        default: false
    },

    nippleSoreness: {
        type: Boolean,
        default: false
    },

    bodyTemperature: {
        type: Number
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Symptom", symptomSchema);