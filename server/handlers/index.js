const errorHandler = (err, req, res, next,) => {
    console.log("Here in error handler", err)
    res.status(err.status || 400).json({
        message: err.message || 'Something went wrong'
    })
};
const notFound = (req, res, next) => {
    const err = new Error("Page Not Found")
    err.status = 404;

    next(err)
}

module.exports = {
    ...require('./auth'),
    ...require('./poll'),
    errorHandler,
    notFound

};

