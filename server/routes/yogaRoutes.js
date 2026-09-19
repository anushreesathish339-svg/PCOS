const express = require("express");

const router = express.Router();

const {

addYoga,
getYoga,
getYogaById,
updateYoga,
deleteYoga

} = require("../controllers/yogaController");

router.post("/", addYoga);

router.get("/", getYoga);

router.get("/:id", getYogaById);

router.put("/:id", updateYoga);

router.delete("/:id", deleteYoga);

module.exports = router;