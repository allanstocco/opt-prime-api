const optimizePrimeDB = require('../db/db');


module.exports = class Admin {
    constructor() { };

    static get accountsAll() {
        return new Promise((resolve, reject) => {
            try {
                optimizePrimeDB.all('SELECT * FROM user_account;', (err, rows) => {
                    if (err) {
                        console.error(err.message)
                        console.log('It is entering but something is getting wrong.')
                        reject(err);
                    } else {
                        resolve(rows)
                    }
                })
            } catch (err) {
                console.log('showAll Broke' + err)
            }
        })
    };

    static get allProfiles() {
        return new Promise((resolve, reject) => {
            try {
                optimizePrimeDB.all('SELECT * FROM user_profile;', (err, rows) => {
                    if (err) {
                        console.error(err.message)
                        console.log('It is entering but something is getting wrong.')
                        reject(err);
                    } else {
                        resolve(rows)
                    }
                })
            } catch (err) {
                console.log('showAll Broke' + err)
            }
        })
    };

    static get AllHabits() {
        return new Promise((resolve, reject) => {
            try {
                optimizePrimeDB.all('SELECT * FROM user_habit;', (err, rows) => {
                    if (err) {
                        console.error(err.message)
                        console.log('It is entering but something is getting wrong.')
                        reject(err);
                    } else {
                        resolve(rows)
                    }
                })
            } catch (err) {
                console.log('showAll Broke' + err)
            }
        })
    }

}
