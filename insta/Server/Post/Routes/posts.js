const express=require('express');
const router=express.Router();
const {upload}=require('../../Middleware/uloadimage');
const tryCatchWrapper= require('../../Middleware/tryCatch');
const {authenticateToken} = require('../../Middleware/authMiddleware');
const mongoOperation = require('../mongoOperation');
const { sendSucessResponse } = require('../../Middleware/response');
const {validatePost}= require('../postValidation');
const postController=require('../Controller/post')

router.post('/' ,authenticateToken , upload.single('image'), tryCatchWrapper(postController.createPost));

module.exports=router;



    // let user=await User.findById(req.user.userId);
    // if(!user){
    //   throw createError(400, userError);
    // }else
    // {
    // const newPost= new Post({
    //     image: req.file.filename,
    //     content: req.body.content,
    //     user: user.username,
    // });
    // await newPost.save();
    // res.status(200).json(newPost);
    // }
