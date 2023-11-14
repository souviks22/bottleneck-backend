import Field from "../models/Field.js"
import Algorithm from "../models/Algorithm.js"
import catchAsync from "../errors/async.js"
import jwt from "jsonwebtoken"

export const fetchFieldsHandler = catchAsync(async (req, res) => {
    const fields = await Field.find()
    res.status(200).json({
        success: true,
        message: 'All fields retrieved',
        data: { fields }
    })
})

export const fetchAlgorithmsHandler = catchAsync(async (req, res) => {
    const algorithms = await Algorithm.find()
    res.status(200).json({
        success: true,
        message: 'All algorithms retrieved',
        data: { algorithms }
    })
})

export const fetchAlgorithmsOfFieldHandler = catchAsync(async (req, res) => {
    const { fieldId } = req.params
    const fieldDoesExist = await Field.findById(fieldId)
    if (!fieldDoesExist) throw new Error('The required field does not exist')
    const field = await fieldDoesExist.populate('algorithms')
    res.status(200).json({
        success: true,
        message: `All algorithms of field ${field.name} retrieved`,
        data: { algorithms: field.algorithms }
    })
})

export const fetchSingleAlgorithmHandler = catchAsync(async (req, res) => {
    const { fieldId, algoId } = req.params
    const algorithmDoesExist = await Algorithm.findById(algoId)
    if (!algorithmDoesExist) throw new Error('The required algorithm does not exist')
    const algorithm = await algorithmDoesExist.populate(['likes', 'dislikes', 'feedbacks'])
    res.status(200).json({
        success: true,
        message: `${algorithm.name} algorithm of field ${fieldId} retrieved`,
        data: { algorithm }
    })
})

export const addFieldHandler = catchAsync(async (req, res) => {
    const field = new Field(req.body)
    await field.save()
    res.status(201).json({
        success: true,
        message: `${field.name} field added`
    })
})

export const addAlgorithmHandler = catchAsync(async (req, res) => {
    const { fieldId } = req.params
    const fieldDoesExist = await Field.findById(fieldId)
    if (!fieldDoesExist) throw new Error('The required field does not exist')
    const field = await fieldDoesExist.populate('algorithms')
    const algorithm = new Algorithm(req.body)
    await algorithm.save()
    field.algorithms.push(algorithm)
    await field.save()
    res.status(201).json({
        success: true,
        message: `${algorithm.name} algorithm added`
    })
})

export const likeAlgorithmHandler = catchAsync(async (req, res) => {
    const { algoId } = req.params
    const algorithm = await Algorithm.findById(algoId)
    if (!algorithm) throw new Error('The required algorithm does not exist')
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
    if (!algorithm) throw new Error('The required algorithm does not exist')
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