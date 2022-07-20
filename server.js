require("dotenv").config({ path: "./config.env" });

const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser')


const server = express();
server.use(express.json())
server.use(cors())

server.use(cookieParser());

server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, 'static')));


// IMPORT CONTROLLER
const auth = require('./routes/login');
const adminRoutes = require('./routes/admin');
const profileRoute = require('./routes/userProfileRoute');
const habitRoute = require('./routes/habitsRoutes')


// USING ADMIN ROUTE (FULL ACCESS)
server.use('/auth', auth)
server.use('/admin', adminRoutes);

// APP ROUTES
server.use('/profile', profileRoute)
server.use('/habits', habitRoute)


server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/auth/login.html'));
})



module.exports = server;
