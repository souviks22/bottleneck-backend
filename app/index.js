import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRouter from "../routers/authRouter.js"
import userRouter from "../routers/userRouter.js"
import algorithmRouter from "../routers/algorithmRouter.js"
import fieldRouter from "../routers/fieldRouter.js"

const app = express()
dotenv.config()

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Atlas Connected'))
    .catch(console.error)

app.use(express.json())

app.use('/', authRouter)
app.use('/users', userRouter)
app.use('/algorithms', algorithmRouter)
app.use('/fields', fieldRouter)

app.listen(process.env.PORT, () => console.log('Server is ready'))