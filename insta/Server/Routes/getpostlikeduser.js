const express=require('express');
const router=express.Router();
const  {Post} = require('../Models/post');
const { User} = require('../Models/user');
const { userError } =require('../constants.js');
const {authenticateToken} = require('../Middleware/authMiddleware');
const { Like } = require('../Models/likes');
const {errorLoginMessage, errorServerMessage} =require('../constants.js');




router.post('/', authenticateToken, async (req,res)=>{

    // let user=await User.findById(req.user.userId);

    const postId=req.body.postObjectId;
    // console.log(postId);
    // const likedPosts=await Like.find({user: user.username}).select("post");
    // const postIds=likedPosts.map((like)=>like.post);
    try{
      const likedUsers=await Like.find({post: postId}).exec();
    // const posts=await Post.find({_id: {$in: postIds}});
    res.status(200).json(likedUsers);
  }
  catch(error){
    res.status(500).json({error: errorServerMessage})
  }
})

module.exports=router;
