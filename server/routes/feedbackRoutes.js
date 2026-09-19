const express = require("express");

const router = express.Router();

const {

addFeedback,
getFeedback,
getFeedbackById,
deleteFeedback

} = require("../controllers/feedbackController");

router.post("/", addFeedback);

router.get("/", getFeedback);

router.get("/:id", getFeedbackById);

router.delete("/:id", deleteFeedback);

module.exports = router;