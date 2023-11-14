import Algorithm from "../models/Algorithm.js"
import Feedback from "../models/Feedback.js"
import catchAsync from "../errors/async.js"
import jwt from "jsonwebtoken"

export const fetchFeedBacksHandler = catchAsync(async (req, res) => {
    const { algoId } = req.params
    const algorithm = await Algorithm.findById(algoId).populate('feedbacks')
    res.status(200).json({
        success: true,
        message: `feedbacks of ${algorithm.name} retrieved`,
        data: { feedbacks: algorithm.feedbacks }
    })
})

export const addFeedBackHandler = catchAsync(async (req, res) => {
    const { algoId } = req.params
    const { content } = req.body
    const { _id: userId } = jwt.decode(req.headers.authorization.split(' ')[1])
    const algorithm = await Algorithm.findById(algoId).populate('feedbacks')
    const feedback = new Feedback({ author: userId, content })
    await feedback.save()
    algorithm.feedbacks.push(feedback)
    await algorithm.save()
    res.status(200).json({
        success: true,
        message: `feedbacks of ${algorithm.name} retrieved`,
        data: { feedbacks: algorithm.feedbacks }
    })
})