const mongoose = require("mongoose")
mongoose.set("debug", true) //log transaction
mongoose.Promise = global.Promise //async


//connect to db
mongoose.connect('mongodb://localhost/vote', { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log("Database Connected")
}) //vote is db name

module.exports.User = require('./user') //db.User
module.exports.Poll = require('./poll')
