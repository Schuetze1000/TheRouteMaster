import express from 'express';
const router= express.Router();
const { updateProfile } = require('../controllers/user');

//routes
router.route('/updateprofile').put(updateProfile);

module.exports = router;