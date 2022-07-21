const UserHabits = require('../models/User_Habits')
const UserDaysHabits = require('../models/Daily_Habits')

async function showHabits(req, res) {

    const userID = req.userID;

    const show_habits = await UserHabits.showHabits(userID);

    res.status(201).json(show_habits)
}

async function createHabit(req, res) {

    const userID = req.userID;

    const create_habit = await UserHabits.createHabit(userID, req.body.habit_name, req.body.goal, req.body.quantity, req.body.frequency, req.body.initial_date, req.body.end_date);

    res.status(201).json(create_habit);

}

async function showHabitDays(req, res) {

    const show_days = await UserDaysHabits.showDays(req.params.id)

    res.status(201).json(show_days)

}

async function setCompletion(req, res) {

    const set_done = await UserDaysHabits.checkDay(req.body.completed, req.body.user_habit_id, req.body.daily_habit_id)

    res.status(201).json(set_done)

}


module.exports = {
    showHabits,
    createHabit,
    showHabitDays,
    setCompletion
}
