const mongoose = require('mongoose')

const likeSchema = mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: [true, "post is required for like"]
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "user is required for like"]
    }
},
    { timestamps: true }
)

likeSchema.index({post:1, user:1}, {unique:true})

const likeModel = mongoose.model('likes', likeSchema)

module.exports = likeModel