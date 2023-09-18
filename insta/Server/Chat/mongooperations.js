const {Message}= require('./Model/chat');
const {Group}= require('./Model/group');
const tryCatchWrapper= require('../Middleware/tryCatch');
const { User} = require('../User/Model/user');


async function saveMessage(sender, receiver, message, socketId,type){
  if(receiver.groupName){
    const chat= new Message({
      sender,message, socketId,groupName: receiver.groupName,type
    })
    chat.save();
    return chat;
  }else{
    const chat= new Message({
      sender,message, socketId,receiver: receiver.recipientUserName,type
    })
    chat.save();
    return chat;
  }

}
async function createGroup(groupName, admin){
  const group = new Group({
    admin, groupName
  })
  await group.save();
  return group;
}

async function joinGroup(user,groupName){
  const group=await Group.findOne({groupName: groupName});
  if(!group){
    console.error('Group Not Found');
    return;
  }
  if(group.members.includes(user)){
    console.log('Already In group');
    return;
  }
  group.members.push(user);
  await group.save();
  return;
}
async function leaveGroup(user,groupName){
  const group=await Group.findOne({groupName: groupName});
  // console.log(group);
  if(!group){
    console.error('Group Not Found');
    return;
  }
  if(!group.members.includes(user)){
    console.log('Not In group');
    return;
  }
  const index=group.members.indexOf(user);
  console.log(index); 
  if(index!==-1){
    group.members.splice(index,1);
    await group.save();
    return;
  }
}


async function getMessage(req){
  console.log('hello from getMessage');
  let user=await User.findById(req.user.userId);
  if(!user){
    throw createError(400, userError);
  }else{
    const sender=user.username;
    // console.log(req);
    if(req.body.receiever){
      const chat=await Message.find({
        $or:[
          {sender, receiever},
          {sender: receiever, receiever: sender},
        ],
      }).sort({timestamp: 'asc'});
      return chat;
    }else{
      const groupName=req.body.groupName;
      const chat= await Message.find({groupName}).sort({timestamp:'asc'});
      return chat;
    }
    
  }
}

async function getGroups(){
  const groups=await Group.find().sort({timestamp: 'asc'}).lean().exec();
    return groups;
}

module.exports={
  saveMessage,
  getMessage,
  createGroup,joinGroup,leaveGroup,getGroups
}
