const mongoose = require("mongoose");

const yogaSchema = new mongoose.Schema(
{
    poseName: {
        type: String,
        required: true
    },

    duration: {
        type: Number,
        required: true
    },

    difficulty: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner"
    },

    benefits: {
        type: String,
        required: true
    },

    instructions: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,
        default: ""
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Yoga", yogaSchema);