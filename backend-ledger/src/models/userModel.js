import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
},
    { timestamps: true }
)

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return

    this.password = await bcrypt.hash(this.password, 10)

})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.verify(password, this.password)
}

const userModel = mongoose.model('User', userSchema)

export default userModel