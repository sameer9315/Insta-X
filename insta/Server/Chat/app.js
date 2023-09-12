

const app = require('express')();
const httpServer = require('http').createServer(app);
const dbOperations=require('./mongooperations');
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});
const connectedUsers=new Map();
const groups=new Map();

io.on('connection',(socket)=>{
  console.log('User-Connected: ',socket.id);

  socket.on('userConnected',(username)=>{
    connectedUsers.set(socket.id,username);
    io.emit('activeUsers',Array.from(connectedUsers.values()));
  })

  socket.on('createGroup',(groupName)=>{
    groups.set(groupName,new Set());
    io.emit('groupList',Array.from(groups.keys()));
  })

  socket.on('joinGroup',(data)=>{
    const {groupName,username}=data;
    if(groups.has(groupName)){
      groups.get(groupName).add(username);
      socket.join(groupName);
      io.to(groupName).emit('groupMembers',Array.from(groups.get(groupName)));
      io.to(groupName).emit('userJoined',{
        username,
        groupName,
      });
    }
    console.log('joined grp',username,groupName);
  })


  socket.on('message', async (data)=>{
    const senderUsername=connectedUsers.get(socket.id);
    const {groupName, message}=data;
    if(groupName){
      try{
      const savedMessage=await dbOperations.saveMessaage(senderUsername,groupName, message, socket.id);
      io.to(groupName).emit('chatMessage',{groupName,sender:senderUsername,message:data.message});
      }catch(error){
        throw error
      }
    }else{
    const recipientSocketId=Array.from(
      connectedUsers.entries()).find(([_,username])=>username===data.recipientSocketId)?.[0];
      const message=data.message;

    if(recipientSocketId && message){
      const savedMessage=await dbOperations.saveMessaage(senderUsername,recipientSocketId,message,socket.id);
      io.to(recipientSocketId).emit('privateMessage',{
        sender: senderUsername,
        message: message,
        reciever: data.recipientSocketId,
      })
    }
  }
  })

  socket.on('leaveGroup',(data)=>{
    const {groupName,username}=data;
    socket.leave(groupName);
    io.to(groupName).emit('userLeft',{
      username,groupName
    });
    console.log('Left', username, groupName);
  })
  socket.on('getGroupMembers',(grouName)=>{
    if(groups.has(grouName)){
      const members=Array.from(groups.get(grouName));
      socket.emit('groupMembers',members);
    }
  })

  socket.on('logout',()=>{
    const username=connectedUsers.get(socket.id);
    connectedUsers.delete(socket.id);
    io.emit('activeUsers',Array.from(connectedUsers.values()))
  })

  socket.on('disconnect',()=>{

    console.log('User-Disconnnected: ', socket.id);
    connectedUsers.delete(socket.id);
    io.emit('activeUsers',Array.from(connectedUsers.values()));
  })
})

const PORT=3003;
httpServer.listen(PORT,()=>{
  console.log('Chat Service Started');
})


