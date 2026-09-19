const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ===============================
// Get Logged-in User Profile
// ===============================
exports.getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ===============================
// Update Logged-in User Profile
// ===============================
exports.updateProfile = async (req, res) => {

    try {

        const user = await User.findByIdAndUpdate(

            req.user.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        ).select("-password");

        res.status(200).json({

            success: true,

            message: "Profile Updated Successfully",

            user

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ===============================
// Change Password
// ===============================
exports.changePassword = async (req, res) => {

    try {

        const {

            oldPassword,

            newPassword

        } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        const match = await bcrypt.compare(

            oldPassword,

            user.password

        );

        if (!match) {

            return res.status(400).json({

                success: false,

                message: "Old Password Incorrect"

            });

        }

        user.password = await bcrypt.hash(

            newPassword,

            10

        );

        await user.save();

        res.status(200).json({

            success: true,

            message: "Password Changed Successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ===============================
// Delete Account
// ===============================
exports.deleteUser = async (req, res) => {

    try {

        await User.findByIdAndDelete(req.user.id);

        res.status(200).json({

            success: true,

            message: "Account Deleted Successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};