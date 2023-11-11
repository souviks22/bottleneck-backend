import { Schema, model } from "mongoose"

const fieldSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    level: {
        type: String,
        required: true,
        enum: ['Beginner', 'Amateur', 'Expert']
    },
    algorithms: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Algorithm'
        }
    ]
})

const Field = model('Field', fieldSchema)
export default Field