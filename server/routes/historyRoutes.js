const express = require("express");

const router = express.Router();

const {

getHistory,
getHistoryById,
deleteHistory

} = require("../controllers/historyController");

router.get("/", getHistory);

router.get("/:id", getHistoryById);

router.delete("/:id", deleteHistory);

module.exports = router;