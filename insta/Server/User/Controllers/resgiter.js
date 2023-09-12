
const {sendResponse}= require('../../Middleware/response');

const mongoOperations= require('../mongooseOperations');

exports.register=async(req,res)=>{
  const {username, email, password}= (req.body);
  const data={
    username,
    email,
    password,
  }
  const message= await mongoOperations.registerUser(data);
  sendResponse(res,res.statusCode,message);
}
