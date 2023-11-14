import Field from "../models/Field.js"
import Algorithm from "../models/Algorithm.js"
import catchAsync from "../errors/async.js"

export const fieldDoesExist = catchAsync(async (req, res, next) => {
    const { fieldId } = req.params
    const field = await Field.findById(fieldId)
    if (!field) throw new Error(`The required field of id ${fieldId} does not exist`)
    next()
})

export const algorithmDoesExist = catchAsync(async (req, res, next) => {
    const { algoId } = req.params
    const algorithm = await Algorithm.findById(algoId)
    if (!algorithm) throw new Error(`The required algorithm of id ${algoId} does not exist`)
    next()
})