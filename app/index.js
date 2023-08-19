import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

const app = express()
dotenv.config()

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Atlas Connected'))
    .catch(console.error)

app.listen(process.env.PORT, () => {
    console.log('Up and Running')
})