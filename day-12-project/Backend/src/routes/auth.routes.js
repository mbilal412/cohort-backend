const express = require('express')
const identifyUser = require('../middleware/auth.middleware')
const authController = require('../controllers/auth.controller')
const multer  = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const authRouter = express.Router()

authRouter.post('/register',upload.single('profile-image'), authController.registerController)

authRouter.post('/login', authController.loginController);

authRouter.post('/logout', authController.logoutController)

authRouter.get('/get-me', identifyUser,authController.getMeController)

module.exports = authRouter