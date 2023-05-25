import express from "express";
const router = express.Router();
const { register, login, forgotPassword, resetPassword, refreshToken } = require("../controllers/auth");

//routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/refreshtoken").post(refreshToken);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resetToken").post(resetPassword);

module.exports = router;
