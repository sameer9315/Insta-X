const mongoOperations= require('../mongooperations');
const {sendResponse}= require('../../Middleware/response');



module.exports={
    fetchChats: async(req,res)=>{
        const chats= await mongoOperations.getMessage(req);
        sendResponse(res,res.statusCode,chats);
        
    }
}