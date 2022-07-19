const express = require('express');
const router = express.Router();

//IMPORT LOGIN CONTROLLER 
const login = require('../controllers/login');

router.post('/login', login.LoginControl);
router.post('/register', login.newUserAccount);


module.exports = router
