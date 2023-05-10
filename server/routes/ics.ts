import express from 'express';
const router= express.Router();
const {getICS}=require('../controllers/ics');

//routes
router.route('/getICS').post(getICS);

module.exports = router;