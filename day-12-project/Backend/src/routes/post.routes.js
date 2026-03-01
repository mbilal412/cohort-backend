const express = require('express')
const postRouter = express.Router()
const postController = require('../controllers/post.controller')
const multer  = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require('../middleware/auth.middleware')

postRouter.post('/create', upload.single('post-image'), identifyUser, postController.createPostController)

postRouter.get('/', identifyUser, postController.getPostController)

postRouter.get('/details/:postId', identifyUser, postController.getPostDetailsController)

postRouter.post('/like/:postId', identifyUser, postController.likePostController)

postRouter.post('/unlike/:postId', identifyUser, postController.unlikePostController)

postRouter.get('/feed', identifyUser, postController.getFeedController)

module.exports = postRouter