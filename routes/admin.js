const express = require('express');
const router = express.Router();


let adminAuth = require('../services/auth')

//IMPORT ADMIN CONTROLLER 
const admin = require('../controllers/admin');

// ROUTES
router.get('/accounts', adminAuth.adminAuth, admin.Accounts);


module.exports = router


