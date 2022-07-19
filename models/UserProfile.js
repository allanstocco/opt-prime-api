const optimizePrimeDB = require('../db/db');


module.exports = class Profile {
    constructor() { };

    static ProfileData(user) {
        return new Promise((resolve, reject) => {
            try {
                optimizePrimeDB.get('SELECT * FROM user_profile WHERE user_id = ?', [user], (err, rows) => {
                    if (err) {

                        console.error(err.message)
                        reject(err);

                    } else {
                        resolve(rows)
                    }
                })
            } catch (err) {
                console.log('Server' + err)
            }
        })
    };

}
