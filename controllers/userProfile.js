const Profile = require('../models/UserProfile')

async function UserProfile(req, res) {

    const userID = req.userID

    const user_profile = await Profile.ProfileData(userID)

    res.status(201).json(user_profile)
}

async function UpdateProfile(req, res) {

    const userID = req.userID

    const update_profile = await Profile.UpdateProfile(...req.body, userID)

    res.status(201).json(update_profile)
}


module.exports = {
    UserProfile,
    UpdateProfile
}
