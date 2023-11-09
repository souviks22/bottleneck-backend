const catchAsync = handler => {
    return (req, res, next) => {
        handler(req, res, next).catch(error => {
            const code = error.name === 'ValidationError' ? 400 : 500
            res.status(code).json({
                success: false,
                message: error.message
            })
        })
    }
}

export default catchAsync