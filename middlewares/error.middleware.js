const errorMiddleware = (err, req, res, next) => {
    try {
        let error = {...err}

        error.message = err.message

        console.error(err)

        /*
        * we can handle different types of errors
        * 1) Mongoose Bad ObjectId. --> To mean the resource not found.
        * 2) Mongoose Duplicate Key --> Duplicate Record detected.
        * 3) Mongoose Validation Error --> Validation
        * */

        // Mongoose Bad ObjectId.
        if(err.name === 'CastError'){
            const message = "Resource not found."
            error = new Error(message)
            error.statusCode = 404
        }

        if(err.code === 11000){
            const message = "Duplicate field value entered"
            error = new Error(message)
            error.statusCode = 400
        }

        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val => val.message)
            error = new Error(messages.join(", "))
            error.statusCode = 400
        }

        res.status(err.statusCode || 500).json({success: false, error: error.message || "Server Error"})

    } catch (error){
        next(error)
    }
}

export default errorMiddleware;