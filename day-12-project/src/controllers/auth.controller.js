const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
async function registerController(req, res) {

    const { username, email, password, bio, profileImg } = req.body

    const isUserAlreadyExist = await userModel.findOne(
        {
            $or:[
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
        return res.status(409).json({
            message: (isUserAlreadyExist.email === email) ? "email already exist" : "username already exist"
        })
    }



    const hash = bcrypt.hash(password, 10)



    const user = await userModel.create({
        email,
        username,
        password: hash,
        bio,
        profileImg
    })

    const token = jwt.sign(
        {
            id: user._id
        }, process.env.JWT,
        { expiresIn: '1d' }
    )

    res.cookie('token', token)

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
    const {username, email, password } = req.body
    const user = await userModel.findOne(
        {
            $or:[
                {
                    email
                },
                {
                    username
                }
            ]
        }
    )

    if (!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }

    const isPasswordMatch = bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
        return res.status(404).json({
            message: "wrong password"
        })
    }
    const token = jwt.sign(
        {
            id: user._id
        }, process.env.JWT,
        { expiresIn: '1d' }
    )

    res.cookie('token', token)

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

module.exports = {
    registerController,
    loginController
}