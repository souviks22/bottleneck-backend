import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRouter from "../routers/authRouter"

const app = express()
dotenv.config()

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Atlas Connected'))
    .catch(console.error)

app.use(express.json())

app.use(authRouter, '/')

app.listen(process.env.PORT, () => console.log('Up and Running'))