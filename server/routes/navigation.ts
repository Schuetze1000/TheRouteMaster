import express from "express";
const router = express.Router();
const { getRoutesHash, getAllRoutes, getRoute, getNeabyStations } = require("../controllers/deutschebahn");

//routes
router.route("/getrouteshash").get(getRoutesHash);
router.route("/getallroutes").get(getAllRoutes);
router.route("/getroute").get(getRoute);
router.route("/getneabystations").get(getNeabyStations);

module.exports = router;
