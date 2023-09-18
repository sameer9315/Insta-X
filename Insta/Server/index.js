const express = require("express");
const mongoose= require('mongoose');
const app = express();
const users = require('./User/Routes/users');
const signin = require('./User/Routes/signin');
const groups=require('./Chat/Routes/groupFetch');
const chats= require('./Chat/Routes/chatFetch');
const posts= require('./Post/Routes/posts');
const like= require('./Like/Routes/like');
const fetchPost= require('./Post/Routes/fetchPost');
const bodyParser = require("body-parser");
const getliked= require('./Like/Routes/getlikedpost');
const postlikeduser= require('./Like/Routes/getpostlikeduser');
const {errorMessage}= require('./constant');
const postUsers= require('./Post/Routes/fetchuserPost');
const chatApp=require('./Chat/app');
const http=require('http');
const socketIo=require('socket.io');
const server=http.createServer(app);
const io=socketIo(server);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
const dotenv=require('dotenv');
dotenv.config();
app.use(express.static('public'));

const dbName=process.env.DB_Name;
const dbUrl=`mongodb://127.0.0.1:27017/${dbName}`;
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept,Authorization,Refresh-Token"
  );
  if (req.method === "OPTIONS") {
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST,PUT,DELETE,OPTIONS"
    );
    return res.status(200).json({});
  }

  next();
});

app.use((error,req,res,next)=>{
  const code =error.code || 500;
  const message=error.message|| errorMessage;
  res.status(code).json({message: message});
});

mongoose.connect(dbUrl).then(() => console.log('Now connected to MongoDB!'))
.catch((err) => console.error('Something went wrong', err));

app.use('/api/users',users);
app.use('/api/signin', signin);
app.use('/posts', posts);
app.use('/like',like);
app.use('/fetch',fetchPost);
app.use('/getlikedpost',getliked);
app.use('/getusers',postlikeduser);
app.use('/userPost',postUsers);
app.use('/groups',groups);
app.use('/chats',chats);
// app.use('/chat',chatApp);

// io.on('connection',(socket)=>{
//   console.log('USer Connected to main: ',socket.id);
//   socket.on('disconnect',()=>{
//     console.log('Disconnected:',socket.id);
//   })
// })

app.listen(port, () => console.log(`Listening on port ${port}`));




