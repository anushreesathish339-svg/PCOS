const express = require("express");

const router = express.Router();

const {

addReminder,
getReminders,
getReminder,
updateReminder,
deleteReminder

} = require("../controllers/reminderController");

router.post("/", addReminder);

router.get("/", getReminders);

router.get("/:id", getReminder);

router.put("/:id", updateReminder);

router.delete("/:id", deleteReminder);

module.exports = router;