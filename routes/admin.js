const express = require('express');
const router = express.Router();

// MIDDLEWARE CHECK AUTHORIZATION
const adminAuth = require('../services/auth')

//IMPORT ADMIN CONTROLLER 
const admin = require('../controllers/admin');

// ROUTES
router.get('/accounts', adminAuth.adminAuth, admin.Accounts);
router.get('/profile', adminAuth.adminAuth, admin.Profiles)


module.exports = router


