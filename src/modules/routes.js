import companyRoutes from "./companies/company.routes.js"
import jobRoutes from "./jobs/job.routes.js"
import userRoutes from "./users/user.routes.js"





export const allRoutes=(app)=>{
    app.use("/",userRoutes)
    app.use("/",companyRoutes)
    app.use("/",jobRoutes)

}