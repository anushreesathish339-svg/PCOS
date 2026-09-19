const express = require("express");

const router = express.Router();

const {

addMedication,
getMedications,
getMedication,
updateMedication,
deleteMedication

} = require("../controllers/medicationController");

router.post("/", addMedication);

router.get("/", getMedications);

router.get("/:id", getMedication);

router.put("/:id", updateMedication);

router.delete("/:id", deleteMedication);

module.exports = router;