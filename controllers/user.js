import User from "../models/User.js"
import catchAsync from "../errors/async.js"

export const allUsersHandler = catchAsync(async (req, res) => {
    const users = await User.find()
    res.json({
        success: true,
        message: 'All users fetched',
        data: { users }
    })
})