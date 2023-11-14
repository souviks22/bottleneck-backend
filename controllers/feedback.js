import Algorithm from "../models/Algorithm.js"
import Feedback from "../models/Feedback.js"
import catchAsync from "../errors/async.js"

export const fetchFeedBacksHandler = catchAsync(async (req, res) => {
    const { algoId } = req.params
    
})