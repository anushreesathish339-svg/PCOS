const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    height: {
      type: Number,
      required: true,
    },

    bmi: {
      type: Number,
      required: true,
    },

    cycleLength: {
      type: Number,
      required: true,
    },

    lh: {
      type: Number,
      required: true,
    },

    fsh: {
      type: Number,
      required: true,
    },

    testosterone: {
      type: Number,
      required: true,
    },

    insulin: {
      type: Number,
      required: true,
    },

    amh: {
      type: Number,
      required: true,
    },

    prediction: {
      type: String,
      required: true,
    },

    probability: {
      type: Number,
      required: true,
    },

    algorithm: String,

    modelMetrics: {
      type: mongoose.Schema.Types.Mixed,
    },

    featureSources: {
      type: mongoose.Schema.Types.Mixed,
    },

    featuresUsed: {
      type: mongoose.Schema.Types.Mixed,
    },

    recommendations: [
      {
        type: String,
      },
    ],

    predictionDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Prediction", predictionSchema);
