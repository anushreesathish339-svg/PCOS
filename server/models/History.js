const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    prediction: String,

    probability: Number

}, {
    timestamps: true
});

module.exports = mongoose.model("History", historySchema);