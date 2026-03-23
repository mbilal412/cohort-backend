const userController = require('../controllers/user.controller')

const identifyUser = require('../middleware/auth.middleware')
const express = require('express')

const userRouter = express.Router()


userRouter.post('/follow/:userId',identifyUser, userController.followUserController)

userRouter.delete('/unfollow/:userId',identifyUser, userController.unfollowUserController)

userRouter.patch('/follow/accept/:requestId',identifyUser, userController.acceptFollowRequestController)
userRouter.delete('/follow/reject/:requestId',identifyUser, userController.rejectFollowRequestController)
userRouter.get('/followers', identifyUser, userController.getFollowers)
userRouter.get('/following', identifyUser, userController.getFollowing)
userRouter.get('/suggested-users', identifyUser, userController.getSuggestedUsers)
userRouter.delete('/follow/cancel/:userId',identifyUser, userController.cancelFollowRequestController)

module.exports = userRouter