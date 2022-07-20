const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const Account = require('../models/Login');

const jwtSecret = process.env.ACCESS_TOKEN_SECRET;

async function LoginControl(req, res) {

    try {
        const authLogin = await Account.Login(req.body.email);

        if (!authLogin) { throw new Error('No user with this email') }

        const authenticated = await bcrypt.compare(req.body.user_password, authLogin.password);

        if (!!authenticated) {

            const maxAge = 3 * 60 * 60;

            const token = jwt.sign(
                {
                    superuser: authLogin.is_superuser,
                    id: authLogin.account_id
                },
                jwtSecret,
                {
                    expiresIn: maxAge,
                }
            );

            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: maxAge * 1000,
            });

            res.status(200).json({ "Token": req.cookies.jwt })

        } else {

            throw new Error('USER NOT AUTHENTICATED')
        }

    } catch (err) {
        res.status(500).send(err);
    }

}

async function newUserAccount(req, res) {

    try {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.user_password, salt)

        await Account.newAccount({ ...req.body, user_password: hashed })

        res.status(201).json({ msg: 'New User Successfully Created' })

    } catch (err) {

        res.status(500).json({ err });

    }
}


module.exports = {
    LoginControl,
    newUserAccount
}
