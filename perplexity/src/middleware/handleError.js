const handleError = (err, req, res, next) =>{
    const response = {
        message: err.message,
        status: err.status || 500
    }

    if(err.errors){
        response.errors = err.errors.map(err => err.msg)
    }

    if(process.env.NODE_ENV === "development"){
        response.stack = err.stack
    }

    res.status(response.status).json(response)
}

export default handleError