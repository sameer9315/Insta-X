const express=require('express');
const router=express.Router();
const {authenticateToken} = require('../../Middleware/authMiddleware');
const tryCatchWrapper= require('../../Middleware/tryCatch');
const likeController=require('../Controller/likePost');

router.get('/', authenticateToken, tryCatchWrapper(likeController.getLikes))

module.exports=router;





  // async (req,res)=>{

    // let user=await User.findById(req.user.userId);
    // const likedPosts=await Like.find({user: user.username}).select("post");
    // const postIds=likedPosts.map((like)=>like.post);
    // const posts=await Post.find({_id: {$in: postIds}});
    // res.status(200).json({posts});
//     const posts= await mongoOperation.likedPost(req);
//     sendSucessResponse(res,posts);
// }))
