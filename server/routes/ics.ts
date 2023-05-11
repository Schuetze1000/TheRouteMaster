import express from 'express';
const router= express.Router();
const {getICS}=require('../controllers/ics');

//routes
router.route('/getics').get(getICS);

module.exports = router;