const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    polls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Poll" }]

})
userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        //hash password
        const hashed = await bcrypt.hash(this.password, 10)
        this.password = hashed
        return next();
    } catch (error) {
        return next(error);
    }
})

//match password
userSchema.methods.comparePassword = async function (attemp, next) {
    try {
        return await bcrypt.compare(attemp, this.password)
    } catch (error) {
        return next(error);
    }
}
module.exports = mongoose.model("User", userSchema)
