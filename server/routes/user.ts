import express from "express";
const router = express.Router();
const { updateProfile, getProfile, deactivateAccount, deleteAccount } = require("../controllers/user");

//routes
router.route("/updateprofile").put(updateProfile);
router.route("/getprofile").get(getProfile);
router.route("/deactivateaccount").put(deactivateAccount);
router.route("/deleteaccount").put(deleteAccount);

module.exports = router;
