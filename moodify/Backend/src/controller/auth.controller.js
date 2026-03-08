const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const redis = require('../config/cache')



async function registerController(req, res) {
    const { email, username, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    })

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: 'user already exist'
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        email,
        username,
        password: hash
    })

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '3d'
        }
    )

    res.cookie('token', token)

    res.status(201).json({
        message: 'user registered',
        user
    })
}


async function loginController(req, res){
    const {identifier, password} = req.body

    const user = await userModel.findOne({
        $or: [
            {email: identifier},
            {username: identifier}
        ]
    }).select('+password')

    if(!user){
        return res.status(404).json({
            message: 'invalid credentials'
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(401).json({
            message: 'invalid credentials'
        })
    }

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '3d'
        }
    )

    res.cookie('token', token)

    res.status(200).json({
        message: 'user logged in',
        user
    })
}

async function logoutController(req, res){
    const token = req.cookies.token
    res.cookies.clear()
    await redis.set(token, Date.now().toString())

    res.status(200).json({
        message: 'logout success'
    })

}

async function getMeController(req, res){
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User fetched successfully",
        user
    })
}

module.exports = {
    registerController,
    loginController,
    getMeController,
    logoutController
}