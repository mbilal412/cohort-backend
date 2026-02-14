const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:[true, "username already exist"],
        required:[true, "username is required"]
    },

    email:{
        type: String,
        unique:[true, "email already exist"],
        required:[true, "email is required"]
    },

    password:String,
    bio:String,
    profileImg:{
        type:String,
        default: "https://ik.imagekit.io/4hjtmx0un/default%20profile.jpg"
    }
})

const userModel = mongoose.model("users", userSchema)


module.exports = userModel