import dotenv from 'dotenv'
dotenv.config({})
import { UserModel } from "../../../database/models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { handleError } from '../../middleware/handleAsyncError.js';
import { appError } from '../../../utilis/appError.js';

export const signUp =handleError(async (req,res,next)=>{
  const{firstName , lastName,email,password,recoveryEmail,DOB,mobileNumber,role,status} = req.body;
  const foundUser = await UserModel.findOne({
    $or: [{ email }, { mobileNumber }]
  });
  if(foundUser){
      // res.json({message:"user already exixts"});
      next(new appError(`user already  exists`,409))
  }else{
      const hashedPass = bcrypt.hashSync(password, parseInt(process.env.SALTROUNDS))
      const addedUser = await UserModel.insertMany({firstName , lastName,username:`${firstName}${lastName}`,email,password:hashedPass,recoveryEmail,DOB,mobileNumber,role,status})
      res.json({message:"success",addedUser})
  }
})
export const signIn = handleError(async (req,res,next)=>{
  const { emailOrMobile, password } = req.body;
  const foundUser = await UserModel.findOne({
      $or: [{ email: emailOrMobile }, { mobileNumber: emailOrMobile }]
    });
  if(foundUser){
      let matched = await bcrypt.compare(password, foundUser.password);
      if (matched) {
          let token = jwt.sign({ id: foundUser._id }, process.env.SECRET_KEY)
          foundUser.status='online';
          await foundUser.save();
          res.json({ message: "signIn successfully", token })

      } else {
        next(new appError(`wrong password`,401))
  }
}else{
  next(new appError(`user not found`,404))
}
})
export const updateUser = handleError(async(req,res,next)=>{
  const{userId} = req.user
    const{email , mobileNumber , recoveryEmail , DOB , lastName , firstName}=req.body;
    const foundUser = await UserModel.findById(userId)
    const foundEmailOrMobile = await UserModel.findOne({
      $or: [{ email }, { mobileNumber }]
    });
    if(foundUser){
      if(foundEmailOrMobile){
        next(new appError(`duplicate email or mobileNumber`,409))
      }else{
      //updated by the owner (foundUser)
        const updatedUser = await UserModel.updateOne({_id:foundUser._id},{email , mobileNumber , recoveryEmail , DOB , lastName , firstName,username:`${firstName}${lastName}`})
        res.json({message:"updated successfully",updatedUser})
      }
    }else{
      next(new appError(`user not found`,404))
    }
    
})

export const deleteUser = handleError(async(req,res,next)=>{
  const{userId} = req.user
  //deleted by the owner (req.userId)
    const foundUser = await UserModel.findByIdAndDelete(userId)
    if(foundUser){
        res.json({message:"deleted successfully",foundUser})
    }else{
      next(new appError(`user not found`,404))
    }

})

export const getUserData = handleError(async(req,res,next)=>{
  const{userId} =req.user
    const foundUser = await UserModel.findById(userId);
    if(foundUser){
      res.json({message:"success",foundUser})
    }else{
      next(new appError(`user not found`,404))
    }
      
})
export const getAnotherUserData = handleError(async(req,res,next)=>{
  const{id} = req.params
  const foundUser = await UserModel.findById(id);
  if(foundUser){
    res.json(foundUser)
  }else{
    next(new appError(`user not found`,404))
  }
  
})

export const updatePassword = handleError(async(req,res,next)=>{
  const {oldPassword, newPassword } = req.body;
  const{userId} = req.user
let foundUser = await UserModel.findById( userId);

if (foundUser) {
  const match = bcrypt.compareSync(oldPassword, foundUser.password);
  if (match) {
    const hashedPassword = bcrypt.hashSync(newPassword, parseInt(process.env.SALTROUNDS));
    foundUser.password = hashedPassword;
    const updated = await UserModel.findOneAndUpdate(
      { _id: userId },
      { password: hashedPassword}
    );
    res.json({ message: "success", updated });
  } else {
    next(new appError(`wrong password`,401))
  }
} else {
  next(new appError(`user must loggin`,409))
}
})

export const forgetPassword = handleError(async(req,res,next)=>{
  const { email} = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return next(new appError(`user not found`,404))
  }
  const OTP = Math.floor(100000 + Math.random() * 900000);
  user.passwordResetOTP = OTP;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; 
  await user.save();
  res.json({ message: 'OTP generated successfully.',user });
})
export const resetPassword = handleError(async(req,res,next)=>{
  const{email,otp,newPassword}=req.body;
  const foundUser = await UserModel.findOne({ email });
  if (!foundUser) {
    return next(new appError(`user not found`,404))
  }
  if (foundUser.passwordResetOTP !== otp || Date.now() > foundUser.passwordResetExpires) {
    return next(new appError(`Invalid OTP or expired. Request a new OTP to reset your password.`,401))
  }
  const hashedPass = bcrypt.hashSync(newPassword, parseInt(process.env.SALTROUNDS))
  foundUser.password = hashedPass;
  foundUser.passwordResetOTP = undefined;
  foundUser.passwordResetExpires = undefined;
  await foundUser.save();
  res.json({ message: 'Password reset successfully.'});

})

export const findRecovery = handleError(async(req,res,next)=>{
  const{recoveryEmail}=req.body
  const foundUsers = await UserModel.find({recoveryEmail})
  if(foundUsers.length>0){
    res.json({message:"success",foundUsers})
  }else{
    next(new appError(`users not found`,404))
  }
  
})



