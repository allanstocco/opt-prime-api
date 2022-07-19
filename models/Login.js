const optimizePrimeDB = require('../db/db');


module.exports = class Account {
    constructor(data) {
        this.id = data.account_id
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

                const result = optimizePrimeDB.run('INSERT INTO user_account (email, firstname, lastname, user_password, is_superuser) VALUES (?,?,?,?,?)', [email, firstname, lastname, user_password, is_superuser]);

                let new_account = new Account(result);

                resolve(new_account)

            } catch (err) {

                reject(`Error creating user: ${err}`)
            }
        })
    }

    static Login(email) {
        return new Promise((resolve, reject) => {
            try {
                optimizePrimeDB.get('SELECT * FROM user_account WHERE email = ?', [email], (err, rows) => {
                    if (err) {

                        return console.log(err.message)

                    } else {

                        let log = new Account(rows)
                        resolve(log)
                    }
                })
            } catch (err) {
                console.log('Server' + err)
            }
        })
    };

}
