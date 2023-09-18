const { User} = require('../Model/user');
const express = require('express');
const router = express.Router();
const tryCatchWrapper= require('../../Middleware/tryCatch');
const dotenv=require('dotenv');
dotenv.config();
const {validateUser}=require('../../Middleware/Validation');
const signup=require('../Controllers/resgiter')


router.post('/',validateUser,tryCatchWrapper(signup.register));


module.exports=router;






//Previous code

  // async (req,res)=>{
    // const {username, email, password}= (req.body);
    // const data={
    //   username,
    //   email,
    //   password,
    // }
    // const message= await mongoOperations.registerUser(data);
    // sendSucessResponse(res,message);
    // }));





//Previous register

    // let echeck = await User.findOne({ email: email});
    // let ucheck= await User.findOne({username: username});
    // if (echeck ) {
    //   throw createError(400, errorEmailMessage);
    // }else if(ucheck){
    //   throw createError(400, errorUserMessage);

    // }else {
    //     const user = new User({
    //         username,
    //         email,
    //         password
    //     });

        // const accessToken= generateAccessToken(user._id);
        // const refreshToken=generateRefreshToken(user._id);
        // await user.save();
