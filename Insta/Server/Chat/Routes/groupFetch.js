const express=require('express');
const router=express.Router();
// const  {Group} = require('../Model/group');
const {authenticateToken} = require('../../Middleware/authMiddleware');
const tryCatchWrapper= require('../../Middleware/tryCatch');
const mongoOperations= require('../mongooperations');
// const {sendSucessResponse}= require('../../Middleware/response');
const fetch=require('../Controller/fetchGroups')



router.get('/',authenticateToken,tryCatchWrapper(fetch.fetchGroups));

module.exports=router;