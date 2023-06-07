import express from "express";
const router = express.Router();
const { getRoutesHash, getAllRoutes, getRoute } = require("../controllers/deutschebahn");

//routes
router.route("/getrouteshash").get(getRoutesHash);
router.route("/getallroutes").get(getAllRoutes);
router.route("/getroute").get(getRoute);

module.exports = router;
