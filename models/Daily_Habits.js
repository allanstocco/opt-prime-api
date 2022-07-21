const optimizePrimeDB = require('../db/db');


module.exports = class DailyHabits {
    constructor(data) {
        this.daily_habit_id = data.daily_habit_id
        this.user_habit_id = data.user_habit_id
        this.day_date = data.day_date
        this.completed = data.completed
    };

    static showDays(user_habit_id) {
        return new Promise(async (resolve, reject) => {
            try {
                optimizePrimeDB.all('SELECT firstname, user_habit.habit_name, user_habit.goal, daily_habit_user.daily_habit_id, daily_habit_user.completed FROM user_account INNER JOIN user_habit ON user_account.account_id = user_habit.user_id INNER JOIN daily_habit_user ON user_habit.user_habit_id = daily_habit_user.user_habit_id WHERE user_habit.user_habit_id = ?;', [user_habit_id], (err, rows) => {
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
    }

    static setDays(userID, user_habit_id) {
        return new Promise(async (resolve, reject) => {
            try {
                optimizePrimeDB.get('SELECT initial_date, end_date, JULIANDAY(end_date) - JULIANDAY(initial_date) AS INTEGER FROM user_habit WHERE user_habit_id = ? AND user_id = ?;', [user_habit_id, userID], (err, rows) => {
                    if (err) {
                        return console.log(err.message)
                    } else {
                        let makeRows = rows['INTEGER'];

                        for (let i = 0; i < makeRows; i++) {
                            optimizePrimeDB.run('INSERT INTO daily_habit_user (user_habit_id) VALUES (?);', [user_habit_id], (err, rows) => {
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

    static checkDay(completed, habitID, dayID) {
        return new Promise(async (resolve, reject) => {
            try {
                optimizePrimeDB.run('UPDATE daily_habit_user SET completed = ? WHERE user_habit_id = ? AND daily_habit_id = ?;', [completed, habitID, dayID], (err, rows) => {
                    if (err) {
                        console.error(err.message)
                        reject(err);
                    } else {
                        resolve(rows)
                    }
                })
            } catch (err) {

            }
        })
    }

}
