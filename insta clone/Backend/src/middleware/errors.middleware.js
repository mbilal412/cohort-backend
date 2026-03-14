function handleError(err, req, res, next){
    const response = {
    success: false,
    message: err.message,
}


if(process.env.NODE_ENV === 'development'){
    response.stack = err.stack
}
    err.statusCode = err.statusCode || 500
    res.status(err.statusCode).json(response)

}

module.exports = handleError