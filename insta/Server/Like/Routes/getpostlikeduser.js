const express=require('express');
const router=express.Router();
const {authenticateToken} = require('../../Middleware/authMiddleware');
const tryCatchWrapper= require('../../Middleware/tryCatch');
const likeController=require('../Controller/likePost');

router.post('/', authenticateToken, tryCatchWrapper(likeController.getUserLikedPost));


module.exports=router;










// async (req,res)=>{
    // const postId=req.body.postObjectId;
    //   const likedUsers=await Like.find({post: postId}).exec();
    //   const response={
    //     likedBy: likedUsers,
    //     othersCount: Math.max(0, likedUsers.length-3),
    //   }
    // res.status(200).json(response);
//   const response= await mongoOperation.postLikedUsers(req);
//   sendSucessResponse(res,response);
// }));
