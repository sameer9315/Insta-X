const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

const { User } = require('./Model/user');
const {generateAccessToken, generateRefreshToken}= require('../Middleware/authMiddleware');
const { errorUserMessage , errorEmailMessage}=require('./constants');
const {errorLoginMessage} =require('./constants');
const createError=require('http-errors');

module.exports={
  registerUser: async (userData) => {
    let echeck = await User.findOne({ email: userData.email});
    let ucheck= await User.findOne({username: userData.username});
    if (echeck ) {
      throw createError(400, errorEmailMessage);
    }else if(ucheck){
      throw createError(400, errorUserMessage);
    }else {
      const user = new User({
        username: userData.username,
        email: userData.email,
        password: userData.password,
    });
    const accessToken= generateAccessToken(user._id);
    const refreshToken=generateRefreshToken(user._id);
    await user.save();
     return {accessToken,refreshToken} ;
    }
  },
  login : async (userdata) => {
    const user=await User.findOne({username: userdata.username});
    if (!user) {
      throw createError(401, errorLoginMessage);
    }
    const validPassword = await bcrypt.compare(userdata.password, user.password);
    if (!validPassword) {
      throw createError(401,errorLoginMessage);
    }
    const accessToken= generateAccessToken(user._id);
    const refreshToken=generateRefreshToken(user._id);
    return {accessToken,refreshToken};

  },
}
