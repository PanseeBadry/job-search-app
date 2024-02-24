import Joi from "joi";

const addJobSchema = Joi.object({
    jobTitle: Joi.string().min(4).required(),
    jobLocation: Joi.string().valid('onsite', 'remotely', 'hybrid').required(),
    workingTime: Joi.string().valid('part-time', 'full-time').required(),
    seniorityLevel: Joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO').required(),
    jobDescription: Joi.string().required(),
    technicalSkills: Joi.array().items(Joi.string()),
    softSkills: Joi.array().items(Joi.string()),
    addedBy: Joi.string().hex().length(24).required(),
    companyId:Joi.string().hex().length(24)
  });


const updateJobSchema = Joi.object({
    jobTitle: Joi.string().min(4),
    jobLocation: Joi.string().valid('onsite', 'remotely', 'hybrid'),
    workingTime: Joi.string().valid('part-time', 'full-time'),
    seniorityLevel: Joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
    jobDescription: Joi.string(),
    technicalSkills: Joi.array().items(Joi.string()),
    softSkills: Joi.array().items(Joi.string()),
    addedBy: Joi.string().hex().length(24).required(), 
    jobId:Joi.string().hex().length(24).required()
  });

const deleteJobSchema = Joi.object({
    jobId: Joi.string().hex().length(24).required()
  })

const getAllJobsForCompanySchema = Joi.object({
    companyName: Joi.string().min(4).required()
  })


const filteredJobSchema = Joi.object({
    workingTime: Joi.string().valid('part-time', 'full-time'),
    jobLocation: Joi.string().valid('onsite', 'remotely', 'hybrid'),
    seniorityLevel: Joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
    jobTitle: Joi.string(),
    technicalSkills: Joi.array().items(Joi.string()),
  });


const applyToJobSchema = Joi.object({
        jobId: Joi.string().hex().length(24).required(), 
        userTechSkills: Joi.array().items(Joi.string()),
        userSoftSkills: Joi.array().items(Joi.string()),
        resume: Joi.string(), 
}).unknown(true);


export {
    addJobSchema,
    updateJobSchema,
    deleteJobSchema,
    getAllJobsForCompanySchema,
    filteredJobSchema,
    applyToJobSchema

}

