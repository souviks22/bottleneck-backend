import { Schema, model } from "mongoose"

const feedbackSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    reports: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Report'
        }
    ]
})

const Feedback = model('Feedback', feedbackSchema)
export default Feedback