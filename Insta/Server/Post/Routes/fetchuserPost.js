const express=require('express');
const router=express.Router();
const {authenticateToken} = require('../../Middleware/authMiddleware');
const tryCatchWrapper= require('../../Middleware/tryCatch');
const post=require('../Controller/fetch');

router.get('/', authenticateToken, tryCatchWrapper(post.fetchParticularUserPost))


router.delete('/:postid',authenticateToken, tryCatchWrapper(post.deletePost));


module.exports=router;




















// async (req,res)=>{
//   const delPosts=await mongoOperation.deleteUserPost(req);
//   sendSucessResponse(res,delPosts);
// }))

// async (req,res)=>{
//   const posts=await mongoOperation.fetchUserPosts(req);
//   sendSucessResponse(res,posts);
// }));

  // let user=await User.findById(req.user.userId);
  // if(!user){
  //   throw createError(400, userError);
  // }else{
  //   const posts=await Post.find({user: user.username}).sort({createdAt: -1});
  //   // console.log(posts);
  //   res.status(200).json(posts);

  // }



    // console.log('hello Form post Dlete');
  // let user=await User.findById(req.user.userId);
  // const deletedPost=await Post.findByIdAndRemove(req.params.postid);
  // if(!deletedPost){
  //   throw createError(404,not_found);
  // }
  // await Like.deleteMany({post: req.params.postid});
  // res.status(200).json({message: sucess_del});

