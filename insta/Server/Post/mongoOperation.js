const  {Post} = require('./Model/post');
const { User} = require('../User/Model/user');
const {Like}= require('../Like/Model/likes');
const {not_found,userError,sucess_del}= require('./constants');
const createError=require('http-errors');


module.exports={
  fetchPost: async()=>{
    const posts=await Post.find().sort({_id:-1}).lean().exec();
    return posts;
  },
  fetchUserPosts: async(req)=>{
  let user=await User.findById(req.user.userId);
  if(!user){
    throw createError(400, userError);
  }else{
    const posts=await Post.find({user: user.username}).sort({createdAt: -1});
    return posts;
  }
  },
  deleteUserPost: async(req)=>{
    let user=await User.findById(req.user.userId);
    const deletedPost=await Post.findByIdAndRemove(req.params.postid);
    if(!deletedPost){
      throw createError(404,not_found);
    }
    await Like.deleteMany({post: req.params.postid});
    return sucess_del;
  },
  createPost: async(req)=>{
    let user=await User.findById(req.user.userId);
    if(!user){
      throw createError(400, userError);
    }else
    {
    const newPost= new Post({
        image: req.file.filename,
        content: req.body.content,
        user: user.username,
    });
    await newPost.save();
    return newPost;
    }
  }
}

