import Joi from "joi";

const signUpSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
  recoveryEmail: Joi.string().email().required(),
  DOB:Joi.string().regex(/^\d{4}-\d{1,2}-\d{1,2}$/).required(),
  mobileNumber: Joi.string()
    .required(),
  role: Joi.string().valid("User", "Company_HR").required(),
  status: Joi.string().valid("online", "offline").required(),
});
const signInSchema = Joi.object({
  emailOrMobile: Joi.alternatives()
    .try(
      Joi.string().email(),
      Joi.string()
    )
    .required(),
  password: Joi.string().min(3).required(),
});

const updateUserSchema = Joi.object({
    email: Joi.string().email(),
    mobileNumber: Joi.string(),
    recoveryEmail: Joi.string().email(),
    DOB: Joi.date(),
    lastName: Joi.string(),
    firstName: Joi.string(),
});

const getAnotherUserDataSchema = Joi.object({
    id:Joi.string().hex().length(24).required(), 
});

const updatePasswordSchema = Joi.object({
    oldPassword: Joi.string().min(3).required(),
    newPassword: Joi.string().min(3).required(),
});

const forgetPasswordSchema = Joi.object({
    email: Joi.string().email().required()
})


const findRecoverySchema = Joi.object({
    recoveryEmail: Joi.string().email(),
})


export{
    signInSchema,
    signUpSchema,
    updateUserSchema,
    getAnotherUserDataSchema,
    updatePasswordSchema,
    findRecoverySchema,
    forgetPasswordSchema
}
