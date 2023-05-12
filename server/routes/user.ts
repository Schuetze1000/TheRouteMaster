import express from "express";
const router = express.Router();
const { updateProfile, getUser, deactivateAccount, deleteAccount } = require("../controllers/user");

//routes
router.route("/updateprofile").put(updateProfile);
router.route("/getuser").get(getUser);
router.route("/deactivateaccount").put(deactivateAccount);
router.route("/deleteaccount").delete(deleteAccount);

module.exports = router;
