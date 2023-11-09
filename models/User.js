import { Schema, model } from "mongoose"
import { regex } from "../validation/regex.js"

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: regex.email
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        minlength: 2
    },
    lastname: {
        type: String,
        minlength: 2
    },
    phone: {
        type: String,
        unique: true,
        match: regex.phone
    },
    designation: {
        type: String,
        minlength: 3
    },
    organization: {
        type: String,
        minlength: 3
    }
})

const User = model('User', userSchema)
export default User