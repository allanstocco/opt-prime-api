const express = require('express');
const router = express.Router();

// MIDDLEWARE CHECK AUTHORIZATION
let Auth = require('../services/auth')

//IMPORT ADMIN CONTROLLER 
const habits = require('../controllers/user_habits');
const days_habits = require('../controllers/user_habits');

// HABITS ROUTES
router.get('/', Auth.authUser, habits.showHabits)
router.post('/new-habit', Auth.authUser, habits.createHabit);

// DAY HABITS ROUTES
router.get('/days/:id', Auth.authUser, days_habits.showHabitDays)


module.exports = router
