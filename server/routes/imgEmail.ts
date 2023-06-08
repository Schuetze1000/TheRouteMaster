import express from "express";
const router = express.Router();
const { passwordLogo, headerLogo, footerLogo, chatLogo, chatBackground, githubLogo, tram, bus, train, walk } = require("../controllers/imgEmail");


//routes
router.route("/passwordlogo").get(passwordLogo);
router.route("/headerlogo").get(headerLogo);
router.route("/footerlogo").get(footerLogo);
router.route("/chatlogo").get(chatLogo);
router.route("/chatbackground").get(chatBackground);
router.route("/githublogo").get(githubLogo);
router.route("/train").get(train);
router.route("/bus").get(bus);
router.route("/tram").get(tram);
router.route("/walk").get(walk);


module.exports = router;
