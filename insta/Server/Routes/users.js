const { User} = require('../Models/user');
const express = require('express');
// const bcrypt = require('bcrypt');
const router = express.Router();
const { errorUserMessage , errorEmailMessage, errorServerMessage }=require('../constants.js');
const {generateAccessToken, generateRefreshToken}= require('../Middleware/authMiddleware');
// const _ = require('lodash');
// const jwt = require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();



router.post('/',async (req,res)=>{
  // console.log("users called");
    try{
    const {username, email, password}= req.body;
    let echeck = await User.findOne({ email: email});
    let ucheck= await User.findOne({username: username});
    if (echeck ) {
        return res.status(400).json({error: errorEmailMessage});
    }else if(ucheck){
      console.log(errorUserMessage);
        return res.status(400).json({error: errorUserMessage});
    }else {
        const user = new User({
            username,
            email,
            password
        });

        const accessToken= generateAccessToken(user._id);
        const refreshToken=generateRefreshToken(user._id);
        // user.RefreshToken=refreshToken;
        await user.save();
    return res.json({accessToken,refreshToken});
    // return res.json(user);
    }
}catch (err){
        return res.status(500).json({message: errorServerMessage});
    }
})

module.exports=router;

// const token = jwt.sign({ _id: user._id }, process.env.Private_Key);
        // res.header('x-auth-token', token).send(_.pick(user, ['_id', 'username', 'email']));
