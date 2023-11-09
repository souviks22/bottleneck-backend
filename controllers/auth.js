import User from "../models/User.js"
import catchAsync from "../errors/async.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { regex, message } from "../validation/regex.js"

export const signupHandler = catchAsync(async (req, res) => {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) throw new Error('You are already registered and may sign-in instead')
    if (!regex.password.test(password)) throw new Error(message.password)
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.HASH_ROUNDS))
    const newUser = new User({ email, password: hashedPassword })
    await newUser.save()
    const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET)
    res.status(201).json({
        success: true,
        message: 'You are successfully signed up',
        data: { token }
    })
})

export const signinHandler = catchAsync(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) throw new Error('Incorrect email or password')
    const passwordIsMatched = await bcrypt.compare(password, user.password);
    if (!passwordIsMatched) throw new Error('Incorrect email or password')
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.status(200).json({
        success: true,
        message: 'You are successfully signed in',
        data: { token }
    })
})

export const signoutHandler = catchAsync(async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'You are successfully signed out'
    })
})