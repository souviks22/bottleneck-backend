import mongoose, { Schema, mongo } from "mongoose"
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const userSchema= new mongoose.Schema({
    email:{type:String, required:true,unique:true,match:emailRegex},
    password:{type:String,required: true,match:passwordRegex},
    firstname: {type: String, required: true,minlength:3 },
    lastname: {type: String,required: true,minlength:2},
    phone: {type:Number,required: true,minlength:10,maxlength:10},
    designation:{type:String, required:true},
    organization:{type:String,required:true}
});

const User= mongoose.model('User',userSchema);

export default User;

