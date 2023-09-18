const multer = require("multer");
const {destinationFolder} = require('./constants');

const storage = multer.diskStorage({

  destination: destinationFolder,

  filename: (req , file, cb) => {
    const uniqueFileName = Date.now() + "-" + file.originalname;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

module.exports={upload};
