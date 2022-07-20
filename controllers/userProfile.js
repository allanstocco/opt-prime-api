const Profile = require('../models/UserProfile')

async function UserProfile(req, res) {

    const userID = req.userID
   
    const user_profile = await Profile.ProfileData(userID)

    res.status(201).json(user_profile)
}


module.exports = {
    UserProfile
}
