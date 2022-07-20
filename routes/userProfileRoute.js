const express = require('express');
const router = express.Router();

const adminAuth = require('../services/auth')

//IMPORT ADMIN CONTROLLER 
const profile = require('../controllers/userProfile');

// ROUTES
router.get('/', adminAuth.authProfile, profile.UserProfile);
router.post('/update', adminAuth.authProfile, profile.UpdateProfile)


module.exports = router
