const handleError = (err, req, res, next) => {
    const response = {
        message: err.message,
        status: err.status || 500,
        isValidationError: err.isValidationError || false
    }

    if (err.isValidationError) {
        response.errors = err.errors
    }

    if (process.env.NODE_ENV === "development") {
        response.stack = err.stack
    }

    res.status(response.status).json(response)
}

export default handleError