const Admin = require('../models/Admin');

function Accounts(req, res) {
    try {
        const accounts = Admin.accountsAll;
        accounts.then(response => res.send(response))
    } catch (err) {
        res.status(500).send(err);
    }
}

function Profiles(req, res) {
    try {
        const accounts = Admin.allProfiles;
        accounts.then(response => res.send(response))
    } catch (err) {
        res.status(500).send(err);
    }
}


module.exports = {
    Accounts,
    Profiles
}
