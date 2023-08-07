const express=require('express');
const router=express.Router();
const  {Post} = require('../Models/post');
const { User} = require('../Models/user');
const {Like}= require('../Models/likes');
const {authenticateToken} = require('../Middleware/authMiddleware');
const {errorLoginMessage,removeMessgae, errorServerMessage} =require('../constants.js');


// const Like= require('../Models/likes');

router.post('/',authenticateToken, async (req,res)=>{
  // console.log("heloo");
    let postobject=req.body.postObjectId;
    let user=await User.findById(req.user.userId);
    let post = await Post.findById(postobject);
    if(!user || !post){
        return res.json(errorServerMessage);
    }else
    {
    const newLike= new Like({
       user: user.username,
       post: req.body.postObjectId,
    });
    await newLike.save();
    res.json(newLike);

    }
  }
);

router.delete('/',authenticateToken, async (req,res)=>{

  // console.log('helo for  delete')
  let postobject=req.body.postObjectId;
  let user=await User.findById(req.user.userId);
  let username=user.username;
  const like= await Like.findOne({user: username,post: postobject});
  console.log(like);
  if(like){
    await Like.deleteOne({_id: like._id});
    res.status(200).json({message:removeMessgae })
  }
  return res.status(400);
} )




module.exports=router;
