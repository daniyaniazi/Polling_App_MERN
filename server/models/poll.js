const mongoose = require('mongoose')


const optionSchema = new mongoose.Schema({
    options: {
        type: String,
        required: true,
    },
    votes: {
        type: Number,
        default: 0
    }
})
const pollSchema = new mongoose.Schema({
    //which user posted
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    question: {
        type: String,
        required: true,
    },
    options: [optionSchema], //array of objects
    voted: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
    //list of all user that voted
    ,
    postedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Poll", pollSchema)
