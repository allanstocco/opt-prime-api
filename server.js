const express = require('express');
const cors = require('cors')

const server = express();
server.use(express.json())
server.use(cors())

// IMPORT CONTROLLER
const adminRoutes = require('./routes/admin')

// USING ADMIN ROUTE (FULL ACCESS)
server.use('/', (req, res) => {
    res.send('Hello!')
})

server.use('/admin', adminRoutes);


module.exports = server;
