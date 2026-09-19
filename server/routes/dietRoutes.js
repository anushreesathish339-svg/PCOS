const express = require("express");

const router = express.Router();

const {

addDiet,
getDiet,
getDietById,
updateDiet,
deleteDiet

} = require("../controllers/dietController");

router.post("/", addDiet);

router.get("/", getDiet);

router.get("/:id", getDietById);

router.put("/:id", updateDiet);

router.delete("/:id", deleteDiet);

module.exports = router;