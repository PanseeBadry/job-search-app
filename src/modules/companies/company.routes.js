import express from 'express'
import { authRole } from '../../middleware/authRole.js';
import { addCompany, deleteCompany, getApplications, getCompanyData, searchName, updateCompany } from './company.controller.js';
import { auth } from '../../middleware/auth.js';
import { validation } from '../../middleware/validation.js';
import { addCompanySchema, getAllicationSchema, getCompanyDataSchema, searchNameSchema, updateCompanySchema } from './company.validator.js';
export const companyRoutes = express.Router()
companyRoutes.post("/addCompany",auth,authRole('Company_HR'),validation(addCompanySchema),addCompany)
companyRoutes.put("/updateCompany/:id",auth,authRole('Company_HR'),validation(updateCompanySchema),updateCompany)
companyRoutes.delete("/deleteCompany/:id",auth,authRole('Company_HR'),validation(getCompanyDataSchema),deleteCompany)
companyRoutes.get("/getCompanyData/:id",auth,authRole('Company_HR'),validation(getCompanyDataSchema),getCompanyData)
companyRoutes.post("/searchName",validation(searchNameSchema),searchName)
companyRoutes.get("/getApplications/:jobId",auth,authRole('Company_HR'),validation(getAllicationSchema),getApplications)

export default companyRoutes;

