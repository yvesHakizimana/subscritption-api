const errorMiddleware = (err, req, res, next) => {
    try {
        let error = {...err}

        error.message = err.message

        /*
        * we can handle different types of errors
        * 1) Mongoose Bad ObjectId. --> To mean the resource not found.
        * 2) Mongoose Duplicate Key --> Duplicate Record detected.
        * 3) Mongoose Validation Error --> Validation
        * */

        // Mongoose Bad ObjectId.
        if(err.name === 'CastError'){
            error.message = "Resource not found."
            error.statusCode = 404
        }

        if(err.code === 11000){
            error.message = "Duplicate field value entered"
            error.statusCode = 400
        }

        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val => val.message)
            error.message = messages.join(', ')
            error.statusCode = 400
        }

        res.status(error.statusCode || 500).json({success: false, error: error.message || "Server Error"})

    } catch (error){
        next(error)
    }
}

export default errorMiddleware;