const mongoose=require('mongoose');
const {model_group}= require('../constants');


const groupSchema=new mongoose.Schema({
    admin: {
      type: String,
      required: true,
    },
    groupName: {
        type: String,
        required: true,
    },
    timestamp:{
      type: Date,
      default: Date.now,
    },
    members: [{ type: String}],
  })
  
  const Group= mongoose.model(model_group, groupSchema);
  exports.Group=Group;
  