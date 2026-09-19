const express = require("express");

const router = express.Router();

const {

addNotification,
getNotifications,
getNotification,
markAsRead,
deleteNotification

} = require("../controllers/notificationController");

router.post("/", addNotification);

router.get("/", getNotifications);

router.get("/:id", getNotification);

router.put("/:id/read", markAsRead);

router.delete("/:id", deleteNotification);

module.exports = router;