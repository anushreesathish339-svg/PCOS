const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getProfile,
    updateProfile,
    changePassword,
    deleteUser
} = require("../controllers/userController");

// Logged-in user's profile
router.get("/profile", authMiddleware, getProfile);

// Update logged-in user's profile
router.put("/profile", authMiddleware, updateProfile);

// Change password
router.put("/change-password", authMiddleware, changePassword);

// Delete account
router.delete("/delete", authMiddleware, deleteUser);

module.exports = router;