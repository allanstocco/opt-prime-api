const express = require('express');
const cors = require('cors');
const path = require('path');

const server = express();
server.use(express.json())
server.use(cors())

server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, 'static')));

// IMPORT CONTROLLER
const adminRoutes = require('./routes/admin')

// USING ADMIN ROUTE (FULL ACCESS)
server.use('/admin', adminRoutes);

server.use('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/auth/login.html'));
})


module.exports = server;
