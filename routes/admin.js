const express = require('express');
const router = express.Router();

//IMPORT ADMIN CONTROLLER 
const admin = require('../controllers/admin');

// ROUTES
router.get('/accounts', admin.Accounts);


module.exports = router


