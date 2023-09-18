const bcrypt = require('bcrypt');
const { User } = require('../Model/user');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const tryCatchWrapper= require('../../Middleware/tryCatch');
const sign = require('../Controllers/signin');

router.post('/',  tryCatchWrapper(sign.signin));


module.exports = router;









// (async (req, res) => {
  // const {username, password}=req.body;
  // const data={
  //   username: username,
  //   password: password,
  // }
  // const message= await mongoOperations.login(data);
  // console.log(res.statusCode);
  // sendSucessResponse(res,message);

// }));

//   let validPassword=false;
      //   user.comparePassword(password, function(err, isMatch) {
      //     // if (err) throw createError(400,err);
      //      validPassword=isMatch;// -> Password123: true
      // });





    //     const user=await User.findOne({username});
    //     if (!user) {
    //         throw createError(401, errorLoginMessage);
    //     }

    //     const validPassword = await bcrypt.compare(password, user.password);
    // if (!validPassword) {
    //         throw createError(401,errorLoginMessage);
    // }
    // const accessToken= generateAccessToken(user._id);
    // const refreshToken=generateRefreshToken(user._id);
    // await user.save();
    // res.status(200).json({accessToken,refreshToken});
