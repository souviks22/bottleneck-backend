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

export const fetchAlgorithmsOfFieldHandler = catchAsync(async (req, res) => {
    const { fieldId } = req.params
    const field = await Field.findById(fieldId).populate('algorithms')
    res.status(200).json({
        success: true,
        message: `All algorithms of field ${field.name} retrieved`,
        data: { algorithms: field.algorithms }
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
    const field = await Field.findById(fieldId).populate('algorithms')
    const algorithm = new Algorithm(req.body)
    await algorithm.save()
    field.algorithms.push(algorithm)
    await field.save()
    res.status(201).json({
        success: true,
        message: `${algorithm.name} algorithm added`
    })
})