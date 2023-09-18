const app = require('express')();
const httpServer = require('http').createServer(app);
const dbOperations=require('./mongooperations');
const {Group}=require('./Model/group');
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});
const connectedUsers=new Map();
const groups=new Map();
const {privateMessage,disconnect,chatStartMessage,logout,
  userLeft,leaveGroup,connection,message,chatMessage,
  groupJoined,getGroupMembers,members,joinGroup,groupList,connected,users,createGroup}= require('./constants');


async function initializeGroupFromDatabase(){
  try{
    const allGroups=await Group.find().populate('members');
    allGroups.forEach((group)=>{
      const groupMembers= new Set(group.members.map((member)=>member));
      console.log(groupMembers);
      groups.set(group.groupName,groupMembers);
      console.log(groups);
    });
  }catch(error){
    console.error('Eroor Initialize')
  }
}

initializeGroupFromDatabase();

io.on(connection,(socket)=>{
  // console.log('User-Connected: ',socket.id);   

  socket.on(connected,(username)=>{
    connectedUsers.set(socket.id,username);
    io.emit(users,Array.from(connectedUsers.values()));
  })

  socket.on(createGroup,async (groupName)=>{
    groups.set(groupName,new Set());
    const group=dbOperations.createGroup(groupName,connectedUsers.get(socket.id));
    // console.log(socket.id);
    io.emit(groupList,Array.from(groups.keys()));
  })

  socket.on(joinGroup,(data)=>{
    const {groupName,username}=data;
    if(groups.has(groupName)){
      groups.get(groupName).add(username);
      socket.join(groupName);
      const joined=dbOperations.joinGroup(username, groupName);
      io.to(groupName).emit(members,Array.from(groups.get(groupName)));
      io.to(groupName).emit(groupJoined,{
        username,
        groupName,
      });
      const receiever={
        groupName
      }
      const message='Joined The Group';
      const type='notification'
      const notificationMessage=dbOperations.saveMessage(username,receiever, message,socket.id,type )
    }
  })


  socket.on(message, async (data)=>{
    console.log('Hellllo')
    // const senderUsername=connectedUsers.get(socket.id);
    // console.log(connectedUsers);
    const {groupName, message,sender}=data;
    if(groupName){
    console.log(groupName);

        const receiver={
          groupName: groupName
        }
      const savedMessage=await dbOperations.saveMessage(sender,receiver, message, socket.id, type='GroupMessage');
      console.log(groups);
      io.to(groupName).emit(chatMessage,{groupName: data.groupName,sender: data.sender,message:data.message});
    }else{
    const recipientSocketId=Array.from(
      connectedUsers.entries()).find(([_,username])=>username===data.recipientSocketId)?.[0];
      const message=data.message;

    if(recipientSocketId && message){
      const receiever={
        recipientUserName: data.recipientSocketId,
      }
      const savedMessage=await dbOperations.saveMessage(sender,receiever,message,socket.id,type='personalMessage');
      io.to(recipientSocketId).emit(privateMessage,{
        sender,
        message: message,
        receiver: data.recipientSocketId,
      })
    }
  }
  })

  socket.on(leaveGroup,(data)=>{
    const {groupName,username}=data;
    socket.leave(groupName);
    const receiever={
      groupName
    }
    const message='Left The Group';
    const type='notification';
    const leave= dbOperations.leaveGroup(username,groupName);
    const send=dbOperations.saveMessage(username, receiever,message,socket.id,type);
    io.to(groupName).emit(userLeft,{
      username,groupName
    });
  })
  socket.on(getGroupMembers,(grouName)=>{
    if(groups.has(grouName)){
      const members=Array.from(groups.get(grouName));
      socket.emit(members,members);
    }
  })

  socket.on(logout,()=>{
    const username=connectedUsers.get(socket.id);
    connectedUsers.delete(socket.id);
    io.emit(users,Array.from(connectedUsers.values()))
  })

  socket.on(disconnect,()=>{

    // console.log('User-Disconnnected: ', socket.id);
    connectedUsers.delete(socket.id);
    io.emit(users,Array.from(connectedUsers.values()));
  })
})

const PORT=3003;
httpServer.listen(PORT,()=>{
  console.log(chatStartMessage);
})


