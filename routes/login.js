const express = require('express');
const router = express.Router();

//IMPORT LOGIN CONTROLLER 
const login = require('../controllers/login');

router.post('/', login.Auth);


module.exports = router
