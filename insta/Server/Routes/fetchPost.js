const express=require('express');
const router=express.Router();
const  {Post} = require('../Models/post');
const { User} = require('../Models/user');
const { userError } =require('../constants.js');
const {authenticateToken} = require('../Middleware/authMiddleware');


router.get('/', authenticateToken, async (req,res)=>{
  try{
    const posts=await Post.find().lean().exec();
    // console.log(posts);
    res.json(posts);
  }catch(error){
    res.status(500).json({error: userError});
  }
});
module.exports=router;
