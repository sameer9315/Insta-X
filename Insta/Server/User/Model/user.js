const mongoose=require('mongoose');
const {model_user}=require('../../Like/constants');
const bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;
const userSchema=new mongoose.Schema({

    username:{type: String, required: true },
    email:{
      type: String,
      required: true,
      min: [5],
      max: [32],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
      },
    password: {type: String, required: true},
});

userSchema.pre('save', async function(next){
    if(this.isNew){
        this.password=await bcrypt.hash(this.password,SALT_WORK_FACTOR);

     }

    next();
})

const User=mongoose.model(model_user,userSchema);
exports.User = User;







// userSchema.methods.comparePassword = function(candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//       if (err) return cb(err);
//       cb(null, isMatch);
//   });
// };
// userSchema.methods.validatePassword=async function validatePassword(data){
//   return bcrypt.compare(data, this.password);
// }



    // image:{type: String, required: true},
      // this.accessToken=generateAccessToken(this._id);
    // this.refreshToken=generateRefreshToken(this._id);


    // let user =this;
    // if (!user.isModified('password')){
    //     return next();
    // }
    // bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
    //     if(err){
    //         return next(err);
    //     }
    //     bcrypt.hash(user.password, salt), function(err, hash){
    //         if (err) {
    //             return next(err);
    //         }
    //         user.password = hash;
    //         next();
    //     };
    // });
// const { generateAccessToken, generateRefreshToken } = require('../Middleware/authMiddleware');
