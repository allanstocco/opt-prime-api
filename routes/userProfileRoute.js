const express = require('express');
const router = express.Router();


//IMPORT ADMIN CONTROLLER 
const profile = require('../controllers/userProfile');

// ROUTES
router.get('/:id', profile.UserProfile);


module.exports = router
