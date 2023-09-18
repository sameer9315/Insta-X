const mongoose=require('mongoose');

const {model_like,model_user, model_post}=require('../constants');

const likeSchema=new mongoose.Schema({
    user:{type:String, ref:model_user,required:true},

    post:{type:mongoose.Schema.Types.ObjectId, ref:model_post,required:true},

}
)

const Like=mongoose.model(model_like,likeSchema);
exports.Like=Like;
