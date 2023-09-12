const createError= require('http-errors');
const {errorServerMessage}= require('./constants');
function tryCatchWrapper(callback){
  return async(req,res,next)=>{
  try{
    await  callback(req,res,next);

    // next();
  }catch(error){
    if(error instanceof createError.HttpError){
      const statusCode=error.statusCode||500;
      const message= error.message || errorServerMessage;
      res.status(statusCode).json({error: message});
    }else{
      const code=error.code || 500;
      const message= error.message || errorServerMessage;
      res.status(code).json({error: message});
    }
    // next();
  }
}
}
module.exports = tryCatchWrapper;
