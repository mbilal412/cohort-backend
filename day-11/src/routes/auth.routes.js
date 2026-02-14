const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const authRouter = express.Router()
const crypto = require('crypto')

authRouter.use(express.json())

authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    const hashedPassword = crypto.createHash("md5").update(password).digest("hex")

    const isUserExist = await userModel.findOne({ email })

    if (isUserExist) {
        return res.status(409).json({
            message: "user already exist on this email"
        })
    }

    const user = await userModel.create({
        name, email, password:hashedPassword
    })

    const token = jwt.sign(
        {
            id: user._id,
            test:"test_register"
        },
        process.env.JWT_SECRET
    )

    res.cookie('jwt_token', token)



    res.status(201).json({
        message: "user created successfully",
        user,
        token
    })

})


authRouter.post('/login', async (req, res)=>{
    const {email, password} = req.body
    const hashedPassword = crypto.createHash("md5").update(password).digest("hex")
    const user = await userModel.findOne({email})
    
    if(!user){
        return res.status(404).json({
            message: "Email not exist"
        })
    }

    const isPasswordMatched = hashedPassword === user.password
    if(!isPasswordMatched){
        return res.status(401).json({
            message: "Wrong password!"
        })
    }

    const token = jwt.sign(
        {
            id: user._id,
            test: "test_login"
        },
        process.env.JWT_SECRET
    )

    res.cookie('jwt_token', token)

    res.status(200).json({
        user
    })
})

module.exports = authRouter