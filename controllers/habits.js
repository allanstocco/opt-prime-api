const Habits = require('../models/Habits')

async function createHabit(req, res) {

    const userID = req.userID

    const user_profile = await Habits.createHabit()

    res.status(201).json(user_profile)

}


module.exports = {
    createHabit
}
