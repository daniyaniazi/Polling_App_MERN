const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        if (req.headers['authorization']) {
            const token = req.headers.authorization.split(' ')[1]

            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    console.log(err)
                    next("Authentication Failed");
                }
                else {
                    req.decoded = decoded
                    next()
                }
            })
        }
        else {
            throw new Error('No Token Provided Please Login')
        }
    }
    catch (error) {
        error.message = "No Token Provided Please Login";
        console.log("error msg", error.message)
        return next(error)
    }
}