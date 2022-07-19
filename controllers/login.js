const Account = require('../models/Login');

function Auth(req, res) {
    try {

        const authLogin = Account.Authorization(req.body);
        authLogin.then(response => res.send(response))
        
    } catch (err) {
        res.status(500).send(err);
    }
}


module.exports = { Auth }
