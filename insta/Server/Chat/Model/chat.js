const mongoose=require('mongoose');

const chatSchema=new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
  },
  groupName: String,
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

const Message= mongoose.model('Message', chatSchema);
exports.Message=Message;
