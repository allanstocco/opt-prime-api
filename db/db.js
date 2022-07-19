// SETTING UP CONNECTION TO THE DATABASE.

// Installing SQLITE3 and Creating A Table, Starting DB File and Setting Up Node to Read it.

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./optimizePrime.db')

module.exports = db
