const express=require('express');
const router=express.Router();
const {authenticateToken} = require('../../Middleware/authMiddleware');
const tryCatchWrapper= require('../../Middleware/tryCatch');
const likeController=require('../Controller/likePost');

router.post('/',authenticateToken, tryCatchWrapper(likeController.like));





















  // async (req,res)=>{
    // let postobject=req.body.postObjectId;
    // let user=await User.findById(req.user.userId);
    // let post = await Post.findById(postobject);
    // let username=user.username;
    // const like= await Like.findOne({user: username,post: postobject});
    // if(like){
    //  await Like.deleteOne({_id: like._id});
    //   res.status(200).json({message:removeMessgae })
    // }else if(!user || !post){
    //     throw createError(400,errorPostNotFound);
    // }else
    // {
    // const newLike= new Like({
    //    user: user.username,
    //    post: req.body.postObjectId,
    // });
    // await newLike.save();
    // res.status(200).json(newLike);

    // }
    // const like=await mongoOperation.like(req);
    // sendSucessResponse(res,like);
//   }
// ));

// router.delete('/',authenticateToken, async (req,res)=>{

//   // console.log('helo for  delete')
//   let postobject=req.body.postObjectId;
//   let user=await User.findById(req.user.userId);
//   let username=user.username;
//   const like= await Like.findOne({user: username,post: postobject});
//   console.log(like);
//   if(like){
//     await Like.deleteOne({_id: like._id});
//     res.status(200).json({message:removeMessgae })
//   }
//   return res.status(400);
// } )




module.exports=router;
