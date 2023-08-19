import { Schema, model } from "mongoose"

const algoSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    level: {
        type: String,
        required: true,
        enum: ['Easy', 'Medium', 'Hard']
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    feedbacks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Feedback'
        }
    ]
})

const Algorithm = model('Algorithm', algoSchema)
export default Algorithm