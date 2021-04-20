module.exports.errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({
        err: err.message || 'Something went wrong'
    })
};


module.exports.notFound = (req, res, next) => {
    const err = new Error("Not Found")
    err.status = 404;

    next(err)
}