import Field from "../models/Field.js"
import Algorithm from "../models/Algorithm.js"
import catchAsync from "../errors/async.js"

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
        message: 'All fields retrieved',
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
        message: `All algorithms of field ${fieldId} retrieved`,
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
        message: `Algorithm ${algoId} of field ${fieldId} retrieved`,
        data: { algorithm }
    })
})

export const addFieldHandler = catchAsync(async (req, res) => {
    const field = new Field(req.body)
    await field.save()
    res.status(201).json({
        success: true,
        message: 'New field added'
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
        message: 'New algorithm added'
    })
})