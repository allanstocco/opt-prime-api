const optimizePrimeDB = require('../db/db');

const Profile = require('./UserProfile')

module.exports = class Account {
    constructor(data) {
        this.account_id = data.account_id
        this.email = data.email
        this.firstname = data.firstname
        this.lastname = data.lastname
        this.password = data.user_password
        this.is_superuser = data.is_superuser
    };


    static newAccount({ email, firstname, lastname, user_password }) {
        return new Promise(async (resolve, reject) => {
            try {

                const is_superuser = 0;

                const result = optimizePrimeDB.run('INSERT INTO user_account (email, firstname, lastname, user_password, is_superuser) VALUES (?,?,?,?,?) RETURNING *;', [email, firstname, lastname, user_password, is_superuser]);

                optimizePrimeDB.get('SELECT last_insert_rowid();', (err, rows) => {
                    Profile.SetProfile(rows['last_insert_rowid()'])
                })

                resolve(result)

            } catch (err) {

                reject(`Error creating user: ${err}`)
            }
        })
    }

    static Login(email) {
        return new Promise(async (resolve, reject) => {
            try {
                optimizePrimeDB.get('SELECT * FROM user_account WHERE email = ?', [email], (err, rows) => {
                    if (err) {

                        return console.log(err.message)

                    } else {

                        if (rows === undefined) {
                            reject(rows)
                        } else {

                            const resolved = new Account(rows)
                            resolve(resolved)
                        }
                    }
                })
            } catch (err) {
                console.log('Server' + err)
            }
        })
    };

}
