const jwt= require('jsonwebtoken');
const dotenv=require('dotenv');
const { User} = require('../Models/user');
dotenv.config();
const {access,refresh_token,bearer,auth, noAccessToken, noRefreshToken, errorAccessToken, errorRefreshToken , authMessage} =require('../constants.js');
const generateAccessToken=(userId)=>{
    return jwt.sign({userId},process.env.Private_Key,{expiresIn:process.env.Expire_Time });
}

const generateRefreshToken=(userId)=>{
    return jwt.sign({userId}, process.env.Refresh_Private_key, {expiresIn: process.env.Refresh_Time});
}

// const authenticateToken= async (req,res,next)=>{
//     const authHeader=req.header(auth);
//     const token= authHeader&&authHeader.split(' ')[1];
//     if(!token){
//         return res.status(401).json({message: noAccessToken});
//     }

//     try{
//       const decoded= jwt.verify(token, process.env.Private_Key);
//       req.user= decoded;
//       const currenttime=Math.floor(Date.now()/1000);
//       const expiratationTime=decoded.exp;
//       const timeUntilExpiration= expiratationTime-currenttime;

//       if(timeUntilExpiration<180){
//         const refreshToken=await User.findById({req.user.user._id});
//         if(!refreshToken){
//           return res.status(401).json({message: noRefreshToken});
//       }
//       jwt.verify(refreshToken, process.env.Refresh_Private_key, (err, user)=>{
//         if(err){
//             return res.status(403).json({message: errorRefreshToken});
//         }
//         const newAccessToken = generateAccessToken(user);
//         req.user=user;
//         res.setHeader(auth, `${bearer} ${newAccessToken}`);
//       });
//     }
// //     jwt.verify(token, process.env.Private_Key, (err, user)=>{
// //         if(err){
// //             return res.status(403).json({message: errorAccessToken});
// //         }
// //         req.user=user;
// //         next();
// //     });

// // };
// // const authenticateRefreshToken=(req,res,next)=>{
// //     const authHeader=req.header['Authorization'];
// //     const refreshToken= authHeader&&authHeader.split(' ')[1];

// //     if(!refreshToken){
// //         return res.status(401).json({message: noRefreshToken});
// //     }
// //     jwt.verify(refreshToken, process.env.Refresh_Private_key, (err, user)=>{
// //         if(err){
// //             return res.status(403).json({message: errorRefreshToken});
// //         }
// //         req.user=user;
// //         next();
// //     });

// next();
// }catch(err){
//   return res.status(403).json({message: errorAccessToken});
// }
// }


const authenticateToken=(req,res,next)=>{
  // console.log('hhhhhkjjjjj');
  const token=req.header(auth);
    // const token= authHeader&&authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({message: noAccessToken});
    }
    jwt.verify(token,process.env.Private_Key,(err,user)=>{
      if(err){
      const refreshToken=req.header(refresh_token);
      if(!refreshToken){
        return res.status(401).json({message: noRefreshToken});
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
