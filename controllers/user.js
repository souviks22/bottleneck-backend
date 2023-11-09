import User from "../models/User.js"
import catchAsync from "../errors/async.js"

export const fetchUserHandler = catchAsync(async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) throw new Error('No user exists')
    res.status(200).json({
        success: true,
        message: 'Your details are fetched',
        data: { user }
    })
})

export const updateUserHandler = catchAsync(async (req, res) => {
    const { id } = req.params
    const { update } = req.body
    const user = await User.findByIdAndUpdate(id, update, { runValidators: true })
    if (!user) throw new Error('No user exists')
    res.status(200).json({
        success: true,
        message: 'Your details are updated'
    })
})