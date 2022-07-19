const jwt = require('jsonwebtoken')
const Account = require('../models/Login');

const jwtSecret = "8e180f5b52f9be27c82f77b475590fc7e7cd424da37e11d5a61d9f3be8678292b9d873"

async function Auth(req, res) {
    try {

        const authLogin = await Account.Authorization(req.body);


        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
            { id: authLogin.account_id },
            jwtSecret,
            {
                expiresIn: maxAge, // 3hrs in sec
            }
        );
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
        });
        res.status(200).json(authLogin)

    } catch (err) {
        res.status(500).send(err);
    }
}


module.exports = { Auth }
