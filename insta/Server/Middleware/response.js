module.exports={
  sendResponse: (res,statuscode,message,data=null)=>{
    res.status(statuscode).json({
      sucess: true,
      message,
      data
    });
  },
}
