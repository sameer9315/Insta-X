const Joi= require('joi');
const { sendResponse } = require('../Middleware/response');

const postSchema=Joi.object({
  content: Joi.string().required(),
});
const validatePost=(req,res,next)=>{
  const {error}=postSchema.validate({content: req.body.content});
  if(error){
    return sendResponse(res,res.statusCode,error.details[0].message);
  }
  next();
}
module.exports={
  validatePost,
}
