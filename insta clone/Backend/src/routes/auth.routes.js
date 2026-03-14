const express = require('express')
const identifyUser = require('../middleware/auth.middleware')
const {loginValidator, registerValidator} = require('../validator/auth.validator')
const authController = require('../controllers/auth.controller')
const multer  = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const authRouter = express.Router()

authRouter.post('/register',upload.single('profile-image'),registerValidator, authController.registerController)

authRouter.post('/login', loginValidator, authController.loginController);

authRouter.post('/logout', authController.logoutController)

authRouter.get('/get-me', identifyUser,authController.getMeController)

module.exports = authRouter