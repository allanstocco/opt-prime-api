const optimizePrimeDB = require('../db/db');


module.exports = class Profile {
    constructor(data) {
        this.id = data.user_id
        this.nickname = data.nickname
        this.bio = data.bio
        this.birthday = data.birthday
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

    static SetProfile(userID) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = optimizePrimeDB.run('INSERT INTO user_profile (user_id) VALUES (?)', [userID]);

                let setting_profile = new Profile(result);

                resolve(setting_profile)
            } catch (err) {
                reject('Error setting profile' + err)
            }
        })
    }

    static UpdateProfile(picture, nickname, bio, birthday, userID) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = optimizePrimeDB.run('UPDATE user_profile SET picture = ?, nickname = ?, bio = ?, birthday = ? WHERE user_id = ?', [picture, nickname, bio, birthday, userID])

                let update_profile = new Profile(result)

                resolve(update_profile)
            } catch (err) {
                reject('Error updating profile')
            }
        })
    }

}
