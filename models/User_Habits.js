const optimizePrimeDB = require('../db/db');


module.exports = class UserHabits {
    constructor(data) {
        this.user_habit_id = data.user_habit_id
        this.user_id = data.user_id
        this.habits_id = data.habits_id
        this.initial_date = data.initial_date
        this.end_date = data.end_date
    };

    static ProfileData(userID) {
        return new Promise((resolve, reject) => {
            try {
                optimizePrimeDB.get('SELECT * FROM user_profile WHERE user_id = ?', [userID], (err, rows) => {
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
