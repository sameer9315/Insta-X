const  {Post} = require('../Post/Model/post');
const { User} = require('../User/Model/user');
const {Like}= require('./Model/likes');
const createError=require('http-errors');

const {removeMessgae,errorPostNotFound} =require('./constants');


module.exports={
  like: async(req)=>{
    let postobject=req.body.postObjectId;
    let user=await User.findById(req.user.userId);
    let post = await Post.findById(postobject);
    let username=user.username;
    const like= await Like.findOne({user: username,post: postobject});
    if(like){
     await Like.deleteOne({_id: like._id});
      return removeMessgae;
    }else if(!user || !post){
        throw createError(400,errorPostNotFound);
    }else
    {
    const newLike= new Like({
       user: user.username,
       post: req.body.postObjectId,
    });
    await newLike.save();
    return newLike;
    }
  },
  likedPost: async (req)=>{
    let user=await User.findById(req.user.userId);
    const likedPosts=await Like.find({user: user.username}).select("post");
    const postIds=likedPosts.map((like)=>like.post);
    const posts=await Post.find({_id: {$in: postIds}});
    return posts;
  },
  postLikedUsers: async (req)=>{
    const postId=req.body.postObjectId;
      const likedUsers=await Like.find({post: postId}).exec();
      const response={
        likedBy: likedUsers,
        othersCount: Math.max(0, likedUsers.length-3),
      }
      return response;
  }
}
