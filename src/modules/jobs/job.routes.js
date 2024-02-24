import express from 'express'
import { auth } from '../../middleware/auth.js';
import { authRole } from '../../middleware/authRole.js';
import { addJob, applyToJob, deleteJob, filterdJob, getAllJobsAndCompanyInfo, getAllJobsForCompany, updateJob } from './job.controller.js';
import { uploadSingleFile } from '../../../utilis/fileUpload.js';
import { validation } from '../../middleware/validation.js';
import { addJobSchema, applyToJobSchema, deleteJobSchema, filteredJobSchema, getAllJobsForCompanySchema, updateJobSchema } from './job.validator.js';


export const jobRoutes = express.Router()
jobRoutes.post("/addJob",auth,authRole('Company_HR'),validation(addJobSchema),addJob)
jobRoutes.put("/updateJob/:jobId",auth,authRole('Company_HR'),validation(updateJobSchema),updateJob)
jobRoutes.delete("/deleteJob/:jobId",auth,authRole('Company_HR'),validation(deleteJobSchema),deleteJob)
jobRoutes.get("/getAllJobsAndCompanyInfo",getAllJobsAndCompanyInfo)
jobRoutes.get("/getAllJobsForCompany",validation(getAllJobsForCompanySchema),getAllJobsForCompany)
jobRoutes.post("/filteredJob",validation(filteredJobSchema),filterdJob)
jobRoutes.post("/applyToJob",uploadSingleFile('resume'),auth,authRole('User'),validation(applyToJobSchema),applyToJob)

export default jobRoutes;