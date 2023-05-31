import express from "express";
const router = express.Router();
const { passwordLogo, headerLogo, footerLogo, chatLogo, chatBackground, githubLogo } = require("../controllers/imgEmail");


//routes
router.route("/passwordlogo").get(passwordLogo);
router.route("/headerlogo").get(headerLogo);
router.route("/footerlogo").get(footerLogo);
router.route("/chatlogo").get(chatLogo);
router.route("/chatbackground").get(chatBackground);
router.route("/githublogo").get(githubLogo);

module.exports = router;
