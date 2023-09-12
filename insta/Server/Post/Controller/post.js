
const mongoOperation = require('../mongoOperation');
const { sendResponse } = require('../../Middleware/response');

exports.createPost=async(req,res)=>{
  const posts=await mongoOperation.createPost(req);
  sendResponse(res,res.statusCode,posts);
}
