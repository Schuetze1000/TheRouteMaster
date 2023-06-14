import express from "express";
const router = express.Router();
const { updateProfile, getUser, deactivateAccount, deleteAccount, updatePassword, 
        updateUsername, updateEmail, updateConfigTrain, getUserAddress } = require("../controllers/user");

//routes
router.route("/updateprofile").put(updateProfile);
router.route("/updateconfigtrain").put(updateConfigTrain);
router.route("/getuser").get(getUser);
router.route("/deactivateaccount").put(deactivateAccount);
router.route("/deleteaccount").delete(deleteAccount);
router.route("/updatepassword").put(updatePassword);
router.route("/updateemail").put(updateEmail);
router.route("/updateusername").put(updateUsername);
router.route("/getuseraddress").put(getUserAddress);

module.exports = router;
