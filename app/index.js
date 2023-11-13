import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRouter from "../routers/authRouter.js"
import userRouter from "../routers/userRouter.js"
import algoRouter from "../routers/algoRouter.js"
import feedbackRouter from "../routers/feedbackRouter.js"

const app = express()
dotenv.config()

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Atlas Connected'))
    .catch(console.error)

app.use(express.json())

app.use('/', authRouter)
app.use('/users', userRouter)
app.use('/algorithms', algoRouter)
app.use('/feedback',feedbackRouter)

app.listen(process.env.PORT, () => console.log('Server is ready'))