import { applicationModel } from "../../../database/models/applicationModel.js";
import { CompanyModel } from "../../../database/models/companyModel.js";
import { jobModel } from "../../../database/models/jobModel.js";
import { UserModel } from "../../../database/models/userModel.js";
import { appError } from "../../../utilis/appError.js";
import { handleError } from "../../middleware/handleAsyncError.js";

export const addCompany = handleError(async(req,res,next)=>{
    const{userId} = req.user
    const { companyName, companyEmail} = req.body;
    //name and email should be unique
    const foundCompany = await CompanyModel.findOne({
        $or: [{ companyName }, { companyEmail }]
      });
    if(foundCompany){
        next(new appError(`company name or email already exists`,409))
    }else{
        if(req.body.companyHR == userId){
            const addedCompany = await CompanyModel.insertMany(req.body);
            res.json({message:"added successfully",addedCompany})
        }else{
            next(new appError(`Unauthorized.`,404))
        }

    }
})

export const updateCompany = handleError(async(req,res,next)=>{
    const{userId} =req.user
    const{id} = req.params;
    const { companyName, companyEmail}=req.body
    const foundCompany = await CompanyModel.findById(id);
    const existCompany = await CompanyModel.findOne({
        $or: [{ companyName }, { companyEmail }]
      });
    if(foundCompany){
        //check the owner
        if(foundCompany.companyHR == userId.toString()){
            //name and email must be unique
            if(existCompany){
                next(new appError(`name and email must be unique`,409))
            }else{
                const updatedCompany = await CompanyModel.updateOne({_id:id},req.body)
                res.json({message:"updated successfully",updatedCompany})
            }
        }else{
            next(new appError(`Unauthorized.must be the owner who update the company data`,409))
        }
    }else{
        next(new appError(`company not found`,404))
    }
})


export const deleteCompany = handleError(async(req,res,next)=>{
    const{id} = req.params;
    const{userId} = req.user
    const foundCompany = await CompanyModel.findById(id);
    if(foundCompany){
        //check the owner
        if(foundCompany.companyHR == userId.toString()){
                const deletedCompany = await CompanyModel.deleteOne({_id:id})
                res.json({message:"deleted successfully",deletedCompany})
        }else{
            next(new appError(`Unauthorized.must be the owner who delete the company data`,409))
        }
    }else{
        next(new appError(`company not found`,404))
    }
})

export const getCompanyData =handleError( async(req,res,next)=>{
    const{id} = req.params;
    const{userId}= req.user
    const foundCompany = await CompanyModel.findById(id)
    if(foundCompany){
        //check owner
        if(foundCompany.companyHR == userId.toString()){
            //get all jobs related to this company
            const foundJobs = await jobModel.find({companyId:foundCompany._id})
            res.json({message:"success",foundJobs})
        }else{
            next(new appError(`Unauthorized.must be the owner who get the company data`,409))
        }
    }else{
        next(new appError(`company not found`,404))
    }
})


export const searchName= handleError(async(req,res,next)=>{
    const{companyName}=req.body;
    const foundCompany = await CompanyModel.findOne({companyName})
    if(foundCompany){
        //auth
        const user = await UserModel.findById(foundCompany.companyHR)
       if(user.role == 'User' || user.role == 'Company_HR'){
            res.json(foundCompany)
       }else{
        next(new appError(`Unauthorized.must be user or companyHR`,409))
    }   
}else{
    next(new appError(`company not found`,404))
}
})


export const getApplications = handleError(async(req,res,next)=>{
    const{jobId} = req.params
    const{userId}=req.user
    const foundJob = await jobModel.findById(jobId)
    if(foundJob){
        //check that the found job is related to company owner who logged in
        if(foundJob.addedBy == userId.toString()){
            //find this job appliactions
            const foundApplications = await applicationModel.find({jobId}).populate('userId')
            if(foundApplications){
                res.json({message:"success",foundApplications})
            }else{
                next(new appError(`no applications found for this job`,404))

            }

        }else{
            next(new appError(`Unauthorized.must be the owner`,409))

        }  
    }else{
        next(new appError(`job not found`,404))
    }


})
