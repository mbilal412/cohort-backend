const mongoose = require('mongoose')

const followSchema = mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "follower is required for follow"]

    },
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "followee is required for follow"]
    },
    status: {
        type: String,
        enum: ["accepted", "pending"],
        default: "pending"
    }
},
    { timestamps: true }
)

followSchema.index({follower:1, followee: 1, status:1},{unique:true})

const followModel = mongoose.model('follows', followSchema)

module.exports = followModel

