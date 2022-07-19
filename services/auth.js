const jwt = require('jsonwebtoken')

const jwtSecret = "8e180f5b52f9be27c82f77b475590fc7e7cd424da37e11d5a61d9f3be8678292b9d873"

function adminAuth(req, res, next) {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized" })
            } else {
                if (decodedToken.id !== 1) {
                    return res.status(401).json({ message: "Not authorized" })
                } else {
                    next()
                }
            }
        })
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" })
    }
}

module.exports = { adminAuth }
