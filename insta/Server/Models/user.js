const mongoose=require('mongoose');
const {model_user}=require('../constants');
const bcrypt = require('bcrypt');
// const { generateAccessToken, generateRefreshToken } = require('../Middleware/authMiddleware');
SALT_WORK_FACTOR = 10;
const userSchema=new mongoose.Schema({

    username:{type: String, required: true },
    email:{type: String, required: true},
    // image:{type: String, required: true},
    password: {type: String, required: true},
    // accessToken:{type:String},
    // RefreshToken:{type:String},
});

userSchema.pre('save', async function(next){
    if(this.isNew){
        this.password=await bcrypt.hash(this.password,SALT_WORK_FACTOR);

     }
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
    next();
})

const User=mongoose.model(model_user,userSchema);
exports.User = User;
