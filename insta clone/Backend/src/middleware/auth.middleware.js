const jwt = require('jsonwebtoken')


async function identifyUser(req, res, next){

 const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "authentication token missing"
        })
    }
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    }
    catch (error) {
        error.statusCode = 401
        error.message = "Unauthorized"
        throw error
    }

    req.user = decoded

    next()
}

module.exports = identifyUser