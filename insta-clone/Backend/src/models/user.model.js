const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:[true, "username is required"]
    },

    email:{
        type: String,
        unique:true,
        lowercase: true,
        required:[true, "email is required"]
    },

    password:{
        type: String,
        required:[true, "password is required"],
        select: false
    },
    bio:{
        type:String,
        default:"default bio"
    },
    profileImg:{
        type:String,
        default: "https://ik.imagekit.io/4hjtmx0un/default%20profile.jpg"
    }
})

userSchema.pre('save', async function(){
    if(!this.isModified('password' )) return 
    this.password = await bcrypt.hash(this.password, 10)
})


userSchema.methods.comparePassword = async function (candidatePassword){
    const match = await bcrypt.compare(candidatePassword, this.password)
    return match
}
const userModel = mongoose.model("User", userSchema)


module.exports = userModel