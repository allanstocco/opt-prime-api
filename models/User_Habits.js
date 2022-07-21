const optimizePrimeDB = require('../db/db');

const DailyHabits = require('./Daily_Habits')

module.exports = class UserHabits {
    constructor(data) {
        this.user_habit_id = data.user_habit_id
        this.user_id = data.user_id
        this.habit_name = data.habit_name
        this.goal = data.goal
        this.quantity = data.quantity
        this.frequency = data.frequency
        this.initial_date = data.initial_date
        this.end_date = data.end_date
    };

    static showHabits(userID) {
        return new Promise(async (resolve, reject) => {
            try {
                optimizePrimeDB.all('SELECT * FROM user_habit WHERE user_id = ?;', [userID], (err, rows) => {
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


    static createHabit(userID, habit_name, goal, quantity, frequency, initial_date, end_date) {
        return new Promise(async (resolve, reject) => {
            try {
                optimizePrimeDB.run('INSERT INTO user_habit (user_id, habit_name, goal, quantity, frequency, initial_date, end_date) VALUES (?,?,?,?,?,?,?) RETURNING *;', [userID, habit_name, goal, quantity, frequency, initial_date, end_date], (err, rows) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        optimizePrimeDB.get('SELECT last_insert_rowid();', (err, rows) => {
                            DailyHabits.setDays(userID, rows['last_insert_rowid()'])
                        })
                        resolve(rows);
                    }
                })
            } catch (err) {
                console.log('Server' + err)
            }
        })
    };

}
