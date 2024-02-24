import { Schema ,model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  recoveryEmail: {
    type: String,
    required: true
  },
  DOB: {
    type: Date,
    required: true
  },
  mobileNumber: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    enum: ['User', 'Company_HR'],
    required: true
  },
  status: {
    type: String,
    enum: ['online', 'offline'],
    required: true
  },
  passwordResetOTP:{
    type:String
  },
  passwordResetExpires:{
    type:String
  }
  
},{timestamps:true});

export const UserModel = model('User', userSchema);


