import { Schema, model } from "mongoose"
import { regex } from "../validation/regex.js"

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: regex.email
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    firstname: {
        type: String,
        trim: true,
        minlength: 2
    },
    lastname: {
        type: String,
        trim: true,
        minlength: 2
    },
    phone: {
        type: String,
        unique: true,
        sparse: true,
        index: true,
        trim: true,
        match: regex.phone
    },
    image: {
        type: String,
        default: 'https://res.cloudinary.com/dmoyqi6br/image/upload/v1699707627/bottleneck/user.png'
    },
    designation: {
        type: String,
        trim: true,
        minlength: 3
    },
    organization: {
        type: String,
        trim: true,
        minlength: 3
    }
})

const User = model('User', userSchema)
export default User