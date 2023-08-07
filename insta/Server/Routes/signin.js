const bcrypt = require('bcrypt');
const { User } = require('../Models/user');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const {errorLoginMessage, errorServerMessage} =require('../constants.js');
const {generateAccessToken, generateRefreshToken} = require('../Middleware/authMiddleware')

router.post('/', async (req, res) => {
  // console.log("Api CAlled");
    try{
        const {username, password}=req.body;
        const user=await User.findOne({username});
        if (!user) {
            return res.status(400).json({error:errorLoginMessage});
        }
        const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({error:errorLoginMessage});
    }
    const accessToken= generateAccessToken(user._id);
    const refreshToken=generateRefreshToken(user._id);
    // user.RefreshToken=refreshToken;
    await user.save();
    return res.json({accessToken,refreshToken});
    }catch (err){
        return res.status(500).json({message: errorServerMessage});
    }



    // let username = await User.findOne({ username: req.body.username });



    // const token = jwt.sign({ _id: username._id }, process.env.Private_Key);
    // res.send(token);
});

module.exports = router;
