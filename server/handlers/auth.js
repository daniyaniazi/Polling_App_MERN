const db = require('../models')

exports.register = async (req, res, next) => {
    try {

        //create user
        const user = await db.User.create(req.body);
        res.json(user)
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}
