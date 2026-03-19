const errorMiddleware = async (err, req, res, next) => {
    const response = {
        status: err.status || 500,
        message: err.message || 'Something went wrong'
    }

    if(err.errors){
        response.errors = err.errors.map(error => error.msg)
    }

    if(NODE_ENV === 'development') {
        response.stack = err.stack
    }

    res.status(response.status).json(response)
}

export default errorMiddleware