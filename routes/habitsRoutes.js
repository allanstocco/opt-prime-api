const express = require('express');
const router = express.Router();

// MIDDLEWARE CHECK AUTHORIZATION
let adminAuth = require('../services/auth')

//IMPORT ADMIN CONTROLLER 
const admin = require('../controllers/habits');

// ROUTES
router.get('/');


module.exports = router
