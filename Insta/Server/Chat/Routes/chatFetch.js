const express=require('express');
const router=express.Router();
const {authenticateToken} = require('../../Middleware/authMiddleware');
const tryCatchWrapper= require('../../Middleware/tryCatch');
const fetch=require('../Controller/fetchChats');

router.post('/',authenticateToken,tryCatchWrapper(fetch.fetchChats));
module.exports=router;
