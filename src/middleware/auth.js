//user must login first ==> middleware
import  jwt  from "jsonwebtoken"
import { UserModel } from "../../database/models/userModel.js"

export const auth = (req,res,next)=>{
let token=req.header('token')
jwt.verify(token,process.env.SECRET_KEY,async(err,decodded)=>{
    if(err){
        res.json({message:"err",err})
    }else{
        const user = await UserModel.findById(decodded.id)
        if(!user){
            return res.json({message:"Unauthorized. user not found"})
        }
        req.user ={
        userId: user._id,
        role: user.role
        }
        next()
       
    }
})


}
