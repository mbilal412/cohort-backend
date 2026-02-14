const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookieparser')
const authRouter = express.Router()
authRouter.use(express.json())


authRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    const isUserExist = await userModel.findOne({ email })

    if (isUserExist) {
        return res.status(400).json({
            message: "user already exist on this email"
        })
    }

    const user = await userModel.create({
        username, email, password
    })

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET
    )

    res.cookie('jwt_token', token)

    res.status(201).json({
        message: "user registered",
        user
    })
})

module.exports = authRouter