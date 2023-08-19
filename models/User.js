import mongoose, { Schema, mongo } from "mongoose"

const userSchema= new mongoose.Schema({
    email:{type:String, required:true,unique:true},
    password:{type:String,required: true},
    firstname: {type: String, required: true},
    lastname: {type: String,required: true},
    phone: {type:Number,required: true},
    designation:{type:String, required:true},
    organization:{type:String,required:true}
});

const User= mongoose.model('User',userSchema);

module.exports = User;
