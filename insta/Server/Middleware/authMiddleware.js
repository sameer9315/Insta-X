const jwt= require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const createError= require('http-errors');

const {access,refresh_token,auth, noAccessToken, noRefreshToken} =require('./constants');
const generateAccessToken=(userId)=>{
    return jwt.sign({userId},process.env.Private_Key,{expiresIn:process.env.Expire_Time });
}

const generateRefreshToken=(userId)=>{

    return jwt.sign({userId}, process.env.Refresh_Private_key, {expiresIn: process.env.Refresh_Time});
}


const authenticateToken=(req,res,next)=>{
  const token=req.header(auth);
    if(!token){
        throw createError(401,noAccessToken)
    }
    jwt.verify(token,process.env.Private_Key,(err,user)=>{
      if(err){
      const refreshToken=req.header(refresh_token);
      if(!refreshToken){
        throw createError(401,noRefreshToken);
      }
      jwt.verify(refreshToken,process.env.Refresh_Private_key,(err,user)=>{
        if(err){
          return res.sendStatus(401);
        }
        const currenttime=Math.floor(Date.now()/1000);
        const decodedToken=jwt.decode(token);
        const expiratationTime=decodedToken.exp;
        const timeUntilExpiration= expiratationTime-currenttime;
      if(timeUntilExpiration<180){
        const accessToken=generateAccessToken({id: user.sub});
        res.set(access,accessToken);
      }
      req.user=user;
      next();
    });
}else{
  req.user=user;
  next();
}
    });
  }
module.exports={generateAccessToken, generateRefreshToken,authenticateToken};
