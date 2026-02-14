const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        required:[true, "image is required for post"]
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true, "user is required for post"]
    }
})

const postModel = mongoose.model('posts', postSchema)