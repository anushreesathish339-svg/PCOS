const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {

    createPrediction,

    getModelInfo,

    getPredictions,

    getPrediction,

    deletePrediction

} = require("../controllers/predictionController");

router.post("/", authMiddleware, createPrediction);

router.get("/", authMiddleware, getPredictions);

router.get("/model/info", authMiddleware, getModelInfo);

router.get("/:id", authMiddleware, getPrediction);

router.delete("/:id", authMiddleware, deletePrediction);

module.exports = router;
