const mongoose = require("mongoose");

const dietSchema = new mongoose.Schema(
{
    mealType: {
        type: String,
        enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
        required: true
    },

    mealName: {
        type: String,
        required: true
    },

    foodItems: [{
        type: String
    }],

    calories: {
        type: Number,
        default: 0
    },

    protein: {
        type: Number,
        default: 0
    },

    carbs: {
        type: Number,
        default: 0
    },

    fat: {
        type: Number,
        default: 0
    },

    benefits: {
        type: String
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Diet", dietSchema);