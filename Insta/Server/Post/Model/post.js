const mongoose=require('mongoose');
const {model_post, model_user}=require('../constants');

const postSchema=new mongoose.Schema({
    image: {type: String, required: true},
    content:{type: String, required: true},
    // user:{type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    user:{type: String, ref:model_user,required : true},

})

const Post=mongoose.model(model_post,postSchema);
exports.Post=Post;
