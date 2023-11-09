import catchAsync from "../errors/async.js"
import jwt from "jsonwebtoken"

export const isAuthorized = catchAsync(async (req, res, next) => {
    const { authorization } = req.headers
    const split = authorization.split(' ')
    if (split.length != 2) throw new Error('Invalid authorization token')
    const token = split[1]
    if (!jwt.verify(token, process.env.TOKEN_SECRET)) throw new Error('You are not authorized')
    next()
})