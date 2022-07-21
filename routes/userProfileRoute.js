const express = require('express');
const router = express.Router();

const Auth = require('../services/auth')

//IMPORT ADMIN CONTROLLER 
const profile = require('../controllers/userProfile');

// ROUTES
router.get('/', Auth.authUser, profile.UserProfile);
router.post('/update', Auth.authUser, profile.UpdateProfile)


module.exports = router
