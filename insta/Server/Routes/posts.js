const express=require('express');
const router=express.Router();
const  {Post} = require('../Models/post');
const { User} = require('../Models/user');
const { userError } =require('../constants.js');
const {upload}=require('../Middleware/uloadimage');
// const jwt= require('jsonwebtoken');

const {authenticateToken} = require('../Middleware/authMiddleware');


router.post('/' ,authenticateToken , upload.single('image'), async (req,res)=>{

    // let username=req.body.username;
    // console.log('hello from posts');
    // console.log(req.user);
    let user=await User.findById(req.user.userId);
    if(!user){
        return res.status(400).send(userError);
    }else
    {
    const newPost= new Post({
        image: req.file.filename,
        content: req.body.content,
        user: user.username,
    });
    await newPost.save();
    // console.log(newPost);
    res.json(newPost);
    }
});



module.exports=router;
