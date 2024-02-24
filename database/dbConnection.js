import mongoose from "mongoose"
export const connection = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/jobSearchApp')
    .then(()=>console.log("db connected"))
    .catch((err)=>console.log(err))
}
