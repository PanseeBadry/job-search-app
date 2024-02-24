import Joi from "joi"

const addCompanySchema = Joi.object({
    companyName: Joi.string().min(6).required(),
    description: Joi.string().required(),
    industry: Joi.string().required(),
    address: Joi.string().required(),
    numberOfEmployees: Joi.string().pattern(/^\d+-\d/).required(),
    companyEmail: Joi.string().email().required(),
    companyHR: Joi.string().hex().length(24).required(), 
  });

const updateCompanySchema = Joi.object({
    companyName: Joi.string().min(6),
    description: Joi.string(),
    industry: Joi.string(),
    address: Joi.string(),
    numberOfEmployees: Joi.string().pattern(/^\d+-\d/),
    companyEmail: Joi.string().email(),
    companyHR: Joi.string(), 
});

const getCompanyDataSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
})


const searchNameSchema = Joi.object({
    companyName: Joi.string().min(6).required(),
});

const getAllicationSchema = Joi.object({
    jobId:Joi.string().hex().length(24).required()
})


export{
    addCompanySchema,
    updateCompanySchema,
    searchNameSchema,
    getCompanyDataSchema,
    getAllicationSchema

}

