const optimizePrimeDB = require('../db/db');


module.exports = class Account {
    constructor() { };

    static Authorization(credencial) {
        return new Promise((resolve, reject) => {
            try {
                
                const email = credencial.email;
                const pass = credencial.user_password

                if (email && pass) {
                    let user = optimizePrimeDB.get('SELECT * FROM user_account WHERE email = ? AND user_password = ?;', [email, pass])
                    resolve(user)
                } else {
                    console.log('Wierd')
                }

            } catch (err) {
                console.log('Not Good' + err)
            }
        })
    };

}
