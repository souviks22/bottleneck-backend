import mongoose, { Schema, mongo } from "mongoose"
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const userSchema= new mongoose.Schema({
    email:{type:String, required:true,unique:true,match:emailRegex},
    password:{type:String,required: true,match:passwordRegex},
    firstname: {type: String,minlength:3 },
    lastname: {type: String, minlength:2},
    phone: {type:Number,min:1000000000,max:9999999999},
    designation:{type:String},
    organization:{type:String}
});

const User= mongoose.model('User',userSchema);

export default User;

