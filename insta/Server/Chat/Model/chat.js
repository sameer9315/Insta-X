const mongoose=require('mongoose');
const {model_chat, model_group}= require('../constants');
const chatSchema=new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
  },
  type:{
    type: String,
    required: true,
  },
  groupName:{type: String, ref:model_group}, 
  message: {
    type: String,
    required: true,
  },
  timestamp:{
    type: Date,
    default: Date.now,
  },
  socketId:{
    type: String,
    required: true,
  }
})

const Message= mongoose.model(model_chat, chatSchema);
exports.Message=Message;
