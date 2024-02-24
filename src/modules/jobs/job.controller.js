import { CompanyModel } from "../../../database/models/companyModel.js";
import { jobModel } from "../../../database/models/jobModel.js";
import cloudinary from "../../../utilis/cloudinaryConfig.js";
import { applicationModel } from "../../../database/models/applicationModel.js";
import { handleError } from "../../middleware/handleAsyncError.js";
import { appError } from "../../../utilis/appError.js";

export const addJob = handleError(async(req,res,next)=>{
  const companyFound = await CompanyModel.findById(req.body.companyId)
  const{userId} = req.user
  if(companyFound){
    //check that the one who loggedin is the companyHR
    if(userId.toString() == companyFound.companyHR){
      //check that the one who loggedin (companyHR) is the one who adds the job
      if(companyFound.companyHR == req.body.addedBy){
        const addedJob = await jobModel.insertMany(req.body)
        res.json({message:"success",addedJob})
      }else{
        next(new appError(`Unauthorized. companyHR should add the job`,401))
      }
    }else{
      next(new appError(`Unauthorized. companyHR should login`,401))
    }
  }else{
    next(new appError(`company not found`,404))
  }

    
    
})

export const updateJob = handleError(async(req,res,next)=>{
  const{jobId} = req.params;
  const{userId}=req.user
  const foundJob = await jobModel.findById(jobId);
  if(foundJob){
      //check that companyHR is the one who is updatig the job
      if(foundJob.addedBy == userId.toString()){         
          const updatedJob = await jobModel.updateOne({_id:jobId},req.body)
          res.json({message:"updated successfully",updatedJob})
      }else{
          next(new appError(`Unauthorized. companyHR should update the job`,401))
      }
  }else{
    next(new appError(`job not found`,404))
  }
})

export const deleteJob= handleError(async(req,res,next)=>{
  const{jobId} = req.params;
  const{userId} = req.user
  const foundJob = await jobModel.findById(jobId);
  if(foundJob){
      //check the owner
      if(foundJob.addedBy == userId.toString()){
              const deletedJob = await jobModel.deleteOne({_id:jobId})
              res.json({message:"deleted successfully",deletedJob})
      }else{
          next(new appError(`Unauthorized.owner should delete the job`,401))
      }
  }else{
      next(new appError(`job not found`,404))
  }
}
)
export const getAllJobsAndCompanyInfo = handleError(async (req,res,next)=>{
  const jobs = await jobModel.find().populate('companyId')
  if(jobs){
    res.json({message:"success",jobs})
  }else{
    next(new appError(`jobs not found`,404))
  }
  
})

export const getAllJobsForCompany = handleError(async (req,res,next)=>{
  const companyName = req.query.companyName
  const companyFound = await CompanyModel.findOne({companyName})
  if(companyFound){
    const jobs = await jobModel.find({companyId:companyFound._id})
    if(jobs.length>0){
      res.json({message:"success",jobs})
    }else{
      next(new appError(`no jobs for this company`,404))
    }
    
  }else{
    next(new appError(`company not found`,404))
  }
})

export const filterdJob = handleError(async(req,res,next)=>{
  const { workingTime, jobLocation, seniorityLevel, jobTitle, technicalSkills } = req.body;
    const query = {};
    if (workingTime) {
      query.workingTime = workingTime;
    }
    if (jobLocation) {
      query.jobLocation = jobLocation;
    }
    if (seniorityLevel) {
      query.seniorityLevel = seniorityLevel;
    }
    if (jobTitle) {
      query.jobTitle = { $regex: new RegExp(jobTitle, 'i') };
    }
    if (technicalSkills && technicalSkills.length > 0) {
      query.technicalSkills = { $all: technicalSkills };
    }

    const filteredJobs = await jobModel.find(query);
    if(filteredJobs){
      res.json({message:"success",filteredJobs})
    }else{
      next(new appError(`no found jobs`,404))
    }
})

export const applyToJob = handleError(async (req,res,next)=>{
  const { jobId, userTechSkills, userSoftSkills} = req.body;
  const{userId} = req.user
  const existingApplication = await applicationModel.findOne({ jobId, userId });
  const existingJob = await jobModel.findById(jobId)
  // check that the job to apply is found
  if(existingJob){
    if (existingApplication) {
      next(new appError(`you have applied for this job`,409));
   }else{
    if(req.file){
      cloudinary.uploader.upload(req.file.path,
        {
          folder: 'resumes', // Set the folder where the resumes will be stored in Cloudinary
          allowed_formats: ['pdf']
        },
        async function(error, result){
            let resumeURL = result.secure_url
            const addedApplication = await applicationModel.insertMany({jobId,userId,userTechSkills,userSoftSkills,userResume:resumeURL})
            res.json({message:"success",addedApplication})
        
        });
    }else{
      next(new appError(`resume  required`,404))
    }
   }
  }else{
    next(new appError(`job you are applying for not found`,404))
  } 
  


})



