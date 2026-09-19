const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
    addSymptom,
    getSymptoms,
    getSymptom,
    updateSymptom,
    deleteSymptom
} = require("../controllers/symptomController");

router.post("/", authMiddleware, addSymptom);
router.get("/", authMiddleware, getSymptoms);
router.get("/:id", authMiddleware, getSymptom);
router.put("/:id", authMiddleware, updateSymptom);
router.delete("/:id", authMiddleware, deleteSymptom);

module.exports = router;