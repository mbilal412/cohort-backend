const mongoose = require('mongoose')


const songSchema = new mongoose.Schema({
    songUrl: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        required: true,
        enum:['Happy','Sad', 'Surprised']
    }
})

const songModel = mongoose.model('Songs', songSchema)

module.exports = songModel