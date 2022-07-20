const jwt = require('jsonwebtoken')

const jwtSecret = "8e180f5b52f9be27c82f77b475590fc7e7cd424da37e11d5a61d9f3be8678292b9d873"

function adminAuth(req, res, next) {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            console.log(decodedToken)
            if (err) {
                return res.status(401).json({ message: "Not authorized" })
            } else {
                if (decodedToken.superuser == 1) {
                    next()
                } else {
                    return res.status(401).json({ message: "Not authorized" })
                }
            }
        })
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" })
    }
}

function authProfile(req, res, next) {

    const authHeader = req.headers['authorization']
    const authToken = req.cookies.jwt

    const token = authHeader || authToken

    if (token == undefined) return res.sendStatus(401)

    jwt.verify(token, jwtSecret, (err, decodedToken) => {

        if (err) return res.sendStatus(403)

        req.userID = decodedToken.id

        next()
    })

}

module.exports = { adminAuth, authProfile }
