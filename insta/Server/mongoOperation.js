const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

const dbName=process.env.DB_Name;
const dbUrl=`mongodb://127.0.0.1:27017/${dbName}`;
const port = 3000;

mongoose.connect(dbUrl).then(() => console.log('Now connected to MongoDB!'))
.catch((err) => console.error('Something went wrong', err));

const db =mongoose.connection;
db.on('error',console.error.bind(console,'Connection Error'));
db.once('open',()=>{
  console.log('connected to MongoDB');
})



