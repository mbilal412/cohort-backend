const express = require('express');
const noteModel = require('./models/note.model')
const cors = require('cors')
const app = express();
app.use(express.json())
app.use(cors())


app.post('/api/notes', async (req, res)=>{
    const {title, description} = req.body
    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        "message": "note created successfully",
        note
    })
})

app.get('/api/notes', async(req, res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        "message": "note fetched successfully",
        notes
    })
})
module.exports = app