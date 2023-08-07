const express=require('express');
const router=express.Router();
const  {Post} = require('../Models/post');
const { User} = require('../Models/user');
const { userError } =require('../constants.js');
const {authenticateToken} = require('../Middleware/authMiddleware');
const { Like } = require('../Models/likes');
const {errorLoginMessage, errorServerMessage} =require('../constants.js');



router.get('/', authenticateToken, async (req,res)=>{
  try{
    let user=await User.findById(req.user.userId);
    // const userId=req.user.userId;
    const likedPosts=await Like.find({user: user.username}).select("post");
    const postIds=likedPosts.map((like)=>like.post);

    const posts=await Post.find({_id: {$in: postIds}});
    res.status(200).json({posts});
  }catch(error){
    res.status(500).json({error: errorServerMessage})
  }
})
module.exports=router;
