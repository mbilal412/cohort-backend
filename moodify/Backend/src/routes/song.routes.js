const { Router } = require('express')
const songRouter = Router()
const songController = require('../controller/song.controller')
const upload = require('../middleware/multer.middleware')


songRouter.post('/', upload.single('song'), songController.uploadSongController)
songRouter.get('/', songController.getSongController)


module.exports = songRouter