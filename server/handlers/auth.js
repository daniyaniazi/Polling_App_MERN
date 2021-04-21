const jwt = require('jsonwebtoken')
const db = require('../models')

exports.register = async (req, res, next) => {
    try {

        //create user
        const user = await db.User.create(req.body);
        const { _id, username, createdAt } = user

        const token = jwt.sign({ _id, username }, process.env.SECRET)
        res.status(201).json({ _id, username, createdAt, token })
    } catch (error) {
        console.log(error)
        if (error.code = 11000) {
            error.message = "Sorry that username is already taken"
        }
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const user = await db.User.findOne({ username: req.body.username })

        if (user) {

            const { id, username } = user;

            const valid = await user.comparePassword(req.body.password)


            if (valid) {
                const token = jwt.sign({ id, username }, process.env.SECRET)
                res.json({
                    id, username, token
                })
            } else {
                throw new Error('Invalid username/password')
            }
        }
        else {
            throw new Error('No such user exists')
        }
    } catch (error) {
        error.message = "Invalid username/password";
        return next(error)
    }
}
