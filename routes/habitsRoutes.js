const express = require('express');
const router = express.Router();

// MIDDLEWARE CHECK AUTHORIZATION
let adminAuth = require('../services/auth')

//IMPORT ADMIN CONTROLLER 
const habits = require('../controllers/habits');

// ROUTES
router.post('/new-habit', habits.createHabit);


module.exports = router
