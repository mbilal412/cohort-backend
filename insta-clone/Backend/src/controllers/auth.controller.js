const userModel = require('../models/user.model')
const imageKit = require('@imagekit/nodejs')
const { toFile } = require("@imagekit/nodejs")
const jwt = require('jsonwebtoken')

const client = new imageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})
async function registerController(req, res) {
    if(!req.file){
        const error = new Error("profile image is required")
        error.statusCode = 400
        throw error
    }
    const file = await client.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'profile-image',
        folder: 'insta-clone/profile-images'
        
    })

    const { username, email, password, bio } = req.body

    const isUserAlreadyExist = await userModel.findOne(
        {
            $or: [
                {
                    email
                },
                {
                    username
                }
            ]
        }
    )

    if (isUserAlreadyExist) {
        const error = new Error((isUserAlreadyExist.email === email) ? "email already exist" : "username already exist")
        error.statusCode = 409
        throw error
    }



    const user = await userModel.create({
        email,
        username,
        password,
        bio,
        profileImg: file.url
    })

    const token = jwt.sign(
        {
            id: user._id
        }, process.env.JWT_SECRET_KEY,
        { expiresIn: '15m' }
    )

    res.cookie('token', token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    })

    res.status(201).json({
        message: "user registered successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImg
        }
    })

}

async function loginController(req, res) {
    const { identifier, password } = req.body
    const user = await userModel.findOne(
        {
            $or: [
                {
                    email: identifier
                },
                {
                    username: identifier
                }
            ]
        }
    ).select('+password')

    if (!user) {
        const error = new Error("incorrect username or email")
        error.statusCode = 401
        throw error
    }

    const isPasswordMatch = await user.comparePassword(password)

    if (!isPasswordMatch) {
        const error = new Error("wrong password")
        error.statusCode = 401
        throw error
    }
    const token = jwt.sign(
        {
            id: user._id
        }, process.env.JWT_SECRET_KEY,
        { expiresIn: '15m' }
    )

    res.cookie('token', token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    })

    res.status(200).json({
        message: "successfully logged in",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImg
        }
    })

}

async function logoutController(req, res) {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    })
    res.status(200).json({
        message: "successfully logged out"
    })
}

async function getMeController(req, res) {
    const userId = req.user.id

    const user = await userModel.findById(userId)

    if (!user) {
        const error = new Error("user not found")
        error.statusCode = 404
        throw error
    }

    res.status(200).json({
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImg
        }
    })
}

module.exports = {
    registerController,
    loginController,
    getMeController,
    logoutController
}