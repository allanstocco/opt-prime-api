const optimizePrimeDB = require('../db/db');


module.exports = class Habits {
    constructor(data) {
        this.habits_id = data.habits_id
        this.user_id = data.user_id
        this.habit_name = data.habit_name
        this.goal = data.goal
        this.quantity = data.quantity
        this.frequency = data.frequency
    };

    static createHabit(userID) {
        return new Promise((resolve, reject) => {
            try {
                optimizePrimeDB.get('SELECT initial_date, end_date, JULIANDAY(end_date) - JULIANDAY(initial_date) AS INTEGER FROM user_habit;', (err, rows) => {
                    if (err) {
                        return console.log(err.message)
                    } else {

                        let makeRows = rows['INTEGER'];

                        for (let i = 0; i < makeRows; i++) {

                            optimizePrimeDB.run('INSERT INTO habits (user_id, habit_name, goal, quantity, frequency) VALUES (1,"Water", 5, 0, 3);', (err, rows) => {
                                if (err) {

                                    console.error(err.message)
                                    reject(err);

                                } else {

                                    resolve(rows)

                                }
                            })
                        }

                    }

                })

            } catch (err) {
                console.log('Server' + err)
            }
        })
    };

}
