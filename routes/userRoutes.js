const express = require("express");
const router = express.Router();
const User = require("./../models/User");

// ✅ CREATE: Register new user
router.post("/registers", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

router.get("/users", async (req,res) =>{
    try{
        const users = await User.find();
    res.json(users); 
    }catch(error){
        res.status(500).json({error: "error"});
    }
});

router.delete("/users/:id",async(req,res)=>{

    try{

        await User.findByIdAndDelete(req.params.id);
        res.json({message:"successfully deleted"});
    }catch(error){
        res.status(500).json({error: "error"});
    }
})


module.exports=router;