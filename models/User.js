import { Schema, model } from "mongoose"

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
const phoneRegex = /\d{10}/

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: emailRegex
    },
    password: {
        type: String,
        required: true,
        match: passwordRegex
    },
    firstname: {
        type: String,
        minlength: 3
    },
    lastname: {
        type: String,
        minlength: 3
    },
    phone: {
        type: Number,
        unique: true,
        sparse: true,
        validate: {
            validator: value => phoneRegex.test(value),
            message: props => `${props.value} is not a valid 10-digit phone number!`
        }
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