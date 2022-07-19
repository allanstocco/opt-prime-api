const optimizePrimeDB = require('../db/db');


module.exports = class Account {
    constructor() { };

    static Authorization(credencial) {
        return new Promise((resolve, reject) => {
            try {

                const email = credencial.email;
                const pass = credencial.user_password

                if (email && pass) {
                    optimizePrimeDB.get('SELECT * FROM user_account WHERE email = ? AND user_password = ?', [email, pass], (err, rows) => {
                        if (err) {

                            return console.log(err.message)
                            
                        } else {
                            console.log(rows)
                            resolve(rows)
                        }
                    })
                } else {
                    console.log('Wierd')
                }

            } catch (err) {
                console.log('Not Good' + err)
            }
        })
    };

}
