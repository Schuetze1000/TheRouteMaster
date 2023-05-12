import express from "express";
const router = express.Router();
const { getICS, getHash } = require("../controllers/ics");

//routes
router.route("/getics").get(getICS);
router.route("/gethash").get(getHash);

module.exports = router;
