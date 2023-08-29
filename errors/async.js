const catchAsync = handler => {
    return (req, res) => {
        handler(req, res).catch(error => {
            const response = {
                success: false,
                message: error.message
            }
            // Handle validation errors
            if (error.name === 'ValidationError') return res.status(400).json(response)
            // Handle internal errors
            res.status(500).json(response)
        })
    }
}

export default catchAsync