const multer = require("multer");
// import { destinationFolder } from "../constants.js";

const storage = multer.diskStorage({

  destination: './public/uploads/',

  filename: (req , file, cb) => {
    const uniqueFileName = Date.now() + "-" + file.originalname;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });


const uploadMiddleware=(req,res,next)=>{
  
}

module.exports={upload};
