import { Schema, model } from "mongoose"

const algorithmSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['Easy', 'Medium', 'Hard']
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    media: {
        type: String,
        required: true
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    dislikes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    feedbacks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Feedback'
        }
    ]
})

const Algorithm = model('Algorithm', algorithmSchema)
export default Algorithm