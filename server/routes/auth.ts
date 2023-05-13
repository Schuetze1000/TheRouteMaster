import express from "express";
const router = express.Router();
const { register, login, forgotPassword, resetPassword } = require("../controllers/auth");

//routes
router.route("/register").post(register);
router.route("/login").get(login);
router.route("/forgotpassword").get(forgotPassword);
router.route("/resetpassword/:resetToken").post(resetPassword);

module.exports = router;
