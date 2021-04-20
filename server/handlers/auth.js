const db = require('../models')

exports.register = async (req, res, next) => {
    try {

        //create user
        const user = await db.User.create(req.body);
        const { _id, username, createdAt } = user
        res.json({ _id, username, createdAt })
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const user = await db.User.findOne({ username: req.body.username })
        console.log("USER AGAYA")
        if (user) {
            console.log("IF KY ANDAR")
            const { id, username } = user;

            const valid = await user.comparePassword(req.body.password)
            console.log("VALID VALUE AGAYE", valid)
            if (valid) {
                res.json({
                    id, username
                })
            } else {
                throw new Error('Invalid username/password')
            }
        }
        else {
            throw new Error('No such user exists')
        }
    } catch (error) {
        return next(error)
    }
}
