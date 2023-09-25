const mongoOperation = require('../mongoOperation');
const { sendResponse } = require('../../Middleware/response');


module.exports={
  fetchPost: async(req,res)=>{
    // console.log(req.body.page);
    const result= await mongoOperation.fetchPost(req);
    // console.log(result);
    sendResponse(res,res.statusCode,result);
  },
  fetchParticularUserPost: async(req,res)=>{
    const posts=await mongoOperation.fetchUserPosts(req);
    sendResponse(res,res.statusCode,posts);
  },
  deletePost: async(req,res)=>{
    const delPosts=await mongoOperation.deleteUserPost(req);
    sendResponse(res,res.statusCode,delPosts);
  }
}
