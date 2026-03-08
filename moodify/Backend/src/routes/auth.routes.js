const userModel = require('../models/user.model')
const authController = require('../controller/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')

const {Router} = require('express')

const authRouter = Router()

authRouter.post('/register', authController.registerController)
authRouter.post('/login', authController.loginController)
authRouter.get('/me', authMiddleware.authUser ,authController.getMeController)
authRouter.post('/logout', authController.logoutController)


module.exports = authRouter
