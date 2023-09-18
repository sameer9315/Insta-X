const express=require('express');
const router=express.Router();
const  {Post} = require('../Model/post');
const {authenticateToken} = require('../../Middleware/authMiddleware');
const tryCatchWrapper= require('../../Middleware/tryCatch');
const mongoOperations= require('../mongoOperation');
const {sendSucessResponse}= require('../../Middleware/response');
const post=require('../Controller/fetch')


router.get('/', authenticateToken, tryCatchWrapper(post.fetchPost));

module.exports=router;
