const { Connection } = require('mongoose');
const { Socket } = require('socket.io');

const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
    cors: {origin : '*'}
  });

io.on('connection',(socket)=>{
    socket.on('onUserJoined',(data)=>{
        
    })
})