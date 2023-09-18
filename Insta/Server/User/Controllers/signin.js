const {sendResponse}= require('../../Middleware/response');

const mongoOperations= require('../mongooseOperations');


exports.signin=async(req,res)=>{
  const {username, password}=req.body;
  const data={
    username,
    password,
  }
  const message= await mongoOperations.login(data);
  sendResponse(res,res.statusCode,message);
}
