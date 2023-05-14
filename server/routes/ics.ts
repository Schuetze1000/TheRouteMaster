import express from "express";
const router = express.Router();
const { getICS, getHash, getAvailableICS } = require("../controllers/ics");

//routes
router.route("/getics").get(getICS);
router.route("/gethash").get(getHash);
router.route("/getavailableics").get(getAvailableICS);

module.exports = router;
