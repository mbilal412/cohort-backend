const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgUrl: {
        type: String,
        required: [true, "image is required for post"]
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "user is required for post"]
    },
    
},
    { timestamps: true }    
    
)

postSchema.index({ user: 1 , post:1}, { unique: false })
const postModel = mongoose.model('Post', postSchema)

module.exports = postModel