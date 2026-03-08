const NodeID3 = require('node-id3')
const songModel = require('../models/song.model')
const { uploadFile } = require('../services/imagekit')

async function uploadSongController(req, res) {
    const mood = req.body.mood
    const songBuffer = req.file.buffer
    const tag = NodeID3.read(songBuffer)

    if (!tag.title ) {
        tag.title = "Unknown"
    }
    if (!tag.artist ) {
        tag.artist = "Unknown"
    }
    if (!mood ) {
        mood = "Unknown"
    }

    const [songFile, posterFile] = await Promise.all([
        uploadFile({
            fileBuffer: songBuffer,
            fileName: tag.title + '.mp3'
        }),
        uploadFile({
            fileBuffer: tag.image.imageBuffer,
            fileName: tag.title + '.jpeg'
        })
    ])

    

    if (!songFile ) {
        return res.status(400).json({
            message: "Invalid song file"
        })
    }

    if (!posterFile ) {
        posterFile = ""
    }


    const song = await songModel.create({
        songUrl: songFile.url,
        posterUrl: posterFile.url,
        title: tag.title,
        artist: tag.artist,
        mood: mood
    })

    res.status(201).json({
        message: "Song uploaded successfully",
        song
    })
    


}

async function getSongController(req,res){
    const mood = req.query.mood

    const song = await songModel.findOne({ mood })

    if(!song){
        return res.status(404).json({
            message: "No song found"
        })
    }

    res.status(200).json({
        message: "Song fetched successfully",
        song
    })
}


module.exports = { uploadSongController, getSongController }