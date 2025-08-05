const express = require("express")
const router = express.Router();
const upload = require('../middleware/uploads');


router.post("/uploads",upload.single("image"),(req,res)=>{

    if(!req.file){

        return res.status(400).json({msg:"no file Uploaded"});

    }
    const imageUtr=`${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.json({msg:"image uploaded successfully",imageUtr});

});
module.exports=router;