const express = require("express");

const router = express.Router();

const {

addCycle,
getCycles,
getCycle,
updateCycle,
deleteCycle

} = require("../controllers/cycleController");

router.post("/", addCycle);

router.get("/", getCycles);

router.get("/:id", getCycle);

router.put("/:id", updateCycle);

router.delete("/:id", deleteCycle);

module.exports = router;