import { Schema, model } from "mongoose"

const reportSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Report = model('Report', reportSchema)
export default Report