const express = require("express");
const mongoose= require('mongoose');
const app = express();
const users = require('./Routes/users');
const signin = require('./Routes/signin');
const posts= require('./Routes/posts');
const like= require('./Routes/like');
const fetchPost= require('./Routes/fetchPost');
const bodyParser = require("body-parser");
const getliked= require('./Routes/getlikedpost');
const postlikeduser= require('./Routes/getpostlikeduser');
const logout= require('./Routes/logout');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
const dotenv=require('dotenv');
dotenv.config();
app.use(express.static('public'));

const dbName=process.env.DB_Name;
const dbUrl=`mongodb://127.0.0.1:27017/${dbName}`;
const port = 3000;

mongoose.connect(dbUrl).then(() => console.log('Now connected to MongoDB!'))
.catch(err => console.error('Something went wrong', err));;


app.use(express.json())

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

app.use('/api/users',users);
app.use('/api/signin', signin);
app.use('/posts', posts);
app.use('/like',like);
app.use('/fetch',fetchPost);
app.use('/getlikedpost',getliked);
app.use('/getusers',postlikeduser);
app.use('/logout',logout);

app.listen(port, () => console.log(`Listening on port ${port}`));




