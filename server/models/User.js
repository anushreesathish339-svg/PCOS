const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      default: null,
    },

    gender: {
      type: String,
      default: "Female",
    },

    height: {
      type: Number,
      default: null,
    },

    weight: {
      type: Number,
      default: null,
    },

    bmi: {
      type: Number,
      default: null,
    },

    bloodGroup: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    emergencyContact: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "/logo.png",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);