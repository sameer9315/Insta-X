const mongoOperations= require('../mongooperations');
const {sendResponse}= require('../../Middleware/response');

module.exports={
    fetchGroups: async(req,res)=>{
        const groups=await mongoOperations.getGroups();
        sendResponse(res,res.statusCode,groups);
    }
}
