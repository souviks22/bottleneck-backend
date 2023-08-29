import bcrypt from "bcrypt"
import User from "../models/User"
import catchAsync from "../errors/async"

export const signupHandler = catchAsync(async (req, res) => {
    const { email, password } = req.body
    // Check if the user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({
        success: false,
        message: 'User already exists'
    })
    const hashedPassword = await bcrypt.hash(password, 10)
    // Create a new user
    const newUser = new User({ email, password: hashedPassword })
    await newUser.save()
    res.status(201).json({
        success: true,
        message: 'Signup successful'
    })
})

export const signinHandler = catchAsync(async (req, res) => {
    const { email, password } = req.body
    // Check if the user exists or not
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({
        success: false,
        message: 'User not registered'
    })
    const hashedPassword = user.password
    // Check password if correct or not
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatch) return res.status(401).json({
        success: false,
        message: 'Invalid password'
    })
    res.status(200).json({
        success: true,
        message: 'Signin successful'
    })
})

export const signoutHandler = catchAsync(async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Signout successful'
    })
})