import { appError } from "../../utilis/appError.js"

export const validation = (schema)=>{
    return(req,res,next) =>{
        let filters={}
        if(req.file || req.files){
            filters = {image:req.file?req.file:req.files,...req.body,...req.params,...req.query}
        }else{
            filters ={...req.body,...req.params,...req.query}
        }
       let {error} = schema.validate(filters,{abortEarly:false})
        if(!error){
            next()
        }else{
            let errorList=[]
            error.details.forEach(ele => {
                errorList.push(ele.message) 
            });
            console.log(errorList)
            next(new appError(errorList,401))
        }
    }
}