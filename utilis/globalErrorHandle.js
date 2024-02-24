export const globalError = (err,req,res,next)=>{
    process.env.MODE =='dev'? res.status(err.statusCode).json({err:err.message,stack:err.stack}):res.json({err:err.message})
    
  }