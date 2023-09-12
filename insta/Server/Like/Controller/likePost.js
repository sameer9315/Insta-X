const mongoOperation=require('../mongoOperations');

const { sendResponse } = require('../../Middleware/response');


module.exports={
  like: async(req,res)=>{
    const like=await mongoOperation.like(req);
    sendResponse(res,res.statusCode,like);
  },
  getLikes: async(req,res)=>{
    const posts= await mongoOperation.likedPost(req);
    sendResponse(res,res.statusCode,posts);
  },
  getUserLikedPost: async(req,res)=>{
    const response= await mongoOperation.postLikedUsers(req);
  sendResponse(res,res.statusCode,response);
  }

}
