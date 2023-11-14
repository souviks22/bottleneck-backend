import Algorithm from "../models/Algorithm.js"
import Field from "../models/Field.js"
import catchAsync from "../errors/async.js"
import jwt from "jsonwebtoken"

export const fetchAlgorithmsHandler = catchAsync(async (req, res) => {
    const algorithms = await Algorithm.find()
    res.status(200).json({
        success: true,
        message: 'All algorithms retrieved',
        data: { algorithms }
    })
})

export const fetchSingleAlgorithmHandler = catchAsync(async (req, res) => {
    const { algoId } = req.params
    const algorithm = await Algorithm.findById(algoId).populate(['likes', 'dislikes'])
    const field = await Field.findOne({ algorithms: algorithm })
    res.status(200).json({
        success: true,
        message: `${algorithm.name} algorithm retrieved`,
        data: { algorithm, field }
    })
})

export const likeAlgorithmHandler = catchAsync(async (req, res) => {
    const { algoId } = req.params
    const algorithm = await Algorithm.findById(algoId)
    const { _id: userId } = jwt.decode(req.headers.authorization.split(' ')[1])
    const userDidLike = algorithm.likes.includes(userId)
    if (userDidLike) await algorithm.updateOne({ $pull: { likes: userId } })
    else await algorithm.updateOne({ $push: { likes: userId } })
    await algorithm.updateOne({ $pull: { dislikes: userId } })
    res.status(201).json({
        success: true,
        message: userDidLike ? `${userId} removed like from ${algorithm.name}` : `${userId} liked ${algorithm.name}`
    })
})

export const dislikeAlgorithmHandler = catchAsync(async (req, res) => {
    const { algoId } = req.params
    const algorithm = await Algorithm.findById(algoId)
    const { _id: userId } = jwt.decode(req.headers.authorization.split(' ')[1])
    const userDidDislike = algorithm.dislikes.includes(userId)
    if (userDidDislike) await algorithm.updateOne({ $pull: { dislikes: userId } })
    else await algorithm.updateOne({ $push: { dislikes: userId } })
    await algorithm.updateOne({ $pull: { likes: userId } })
    res.status(201).json({
        success: true,
        message: userDidDislike ? `${userId} removed dislike from ${algorithm.name}` : `${userId} disliked ${algorithm.name}`
    })
})