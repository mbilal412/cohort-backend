import jwt from 'jsonwebtoken'
export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        const error = new Error('token not provided')
        error.status = 401
        throw error
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
}