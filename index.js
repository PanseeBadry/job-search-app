import dotenv from 'dotenv'
dotenv.config({})
import express from 'express'
import { connection } from './database/dbConnection.js'
import { allRoutes } from './src/modules/routes.js'
import { appError } from './utilis/appError.js'
import { globalError } from './utilis/globalErrorHandle.js'




const app = express()
const port = 3000
connection()
app.use(express.json())
app.use("/resumes",express.static("resumes"))

allRoutes(app)
app.use("*",(req,res,next)=>{
  next(new appError(`invalid URL ${req.originalUrl}`,404))
})

app.use(globalError)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))