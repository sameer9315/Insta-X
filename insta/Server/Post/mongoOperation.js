const  {Post} = require('./Model/post');
const { User} = require('../User/Model/user');
const {Like}= require('../Like/Model/likes');
const {not_found,userError,sucess_del}= require('./constants');
const createError=require('http-errors');


// const posts=await Post.find().sort({_id:-1}).lean().exec();




module.exports={
  fetchPost: async(req)=>{

    const page= parseInt(req.body.page) ||1;
    const pageSize=parseInt(req.body.pageSize)||2;
    const startIndex=(page-1)*pageSize;
    const endIndex=page*pageSize;
    const posts=await Post.find().sort({_id:-1}).skip(startIndex).limit(pageSize).lean().exec();
    const totalPosts= await Post.countDocuments();
    console.log(totalPosts,posts);
    return {posts, totalPosts};
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

