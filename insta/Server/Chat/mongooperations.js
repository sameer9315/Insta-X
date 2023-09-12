const {Message}= require('./Model/chat');

async function saveMessaage(sender, receiver, message, socketId){
  console.log("hello sav");
  try{
  const chat=new Message({
    sender, receiver, message, socketId
  })
  await chat.save();
  console.log('hello after save');
  return chat;
}
catch(error){
  throw error;
}

}


async function getMessage(sender, receiever){
  try{
    const chat=await Message.find({
      $or:[
        {sender, receiever},
        {sender: receiever, receiever: sender},
      ],
    }).sort({timestamp: 'asc'});
    return chat;
  }
  catch(error){
    throw error;
  }

}

module.exports={
  saveMessaage,
  getMessage,

}
