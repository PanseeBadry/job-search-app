import express from 'express'
import { deleteUser, findRecovery, forgetPassword, getAnotherUserData, getUserData, resetPassword, signIn, signUp, updatePassword, updateUser } from './user.controller.js';
import { auth } from '../../middleware/auth.js';
import { validation } from '../../middleware/validation.js';
import { findRecoverySchema, forgetPasswordSchema, getAnotherUserDataSchema, signInSchema, signUpSchema, updatePasswordSchema, updateUserSchema } from './user.validator.js';

export const userRoutes = express.Router()


userRoutes.post("/signUp",validation(signUpSchema),signUp)
userRoutes.post("/signIn",validation(signInSchema),signIn)
userRoutes.put("/updateUser",auth,validation(updateUserSchema),updateUser)
userRoutes.delete("/deleteUser",auth,deleteUser)
userRoutes.get("/getUserData",auth,getUserData)
userRoutes.get("/getAnotherUserData/:id",validation(getAnotherUserDataSchema),getAnotherUserData)
userRoutes.put("/updatePassword",auth,validation(updatePasswordSchema),updatePassword)
userRoutes.post("/forgetPassword",validation(forgetPasswordSchema),forgetPassword)
userRoutes.post("/resetPassword",resetPassword)
userRoutes.get("/findRecovery",validation(findRecoverySchema),findRecovery);
export default userRoutes;
