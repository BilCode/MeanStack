const express =require("express");
const router= express.Router();
const User = require("../models/User");

router.get("/mypage",(req,res)=>{
    console.log("Welcome to my router");
    res.send("Welcome to my router");
});

router.post("/login",(req,res)=>{
    console.log("Welcome to my router");
    const username = req.body.name;
    const userpass = req.body.password;
    User.getUserByName(username,(err,user)=>{
        if(err) throw err;
        if(!user){
            res.json({success:false,message:"User Name is not valid"});
        }else{
            res.json({success:true,message:"Loged In"});
        }
    });
    

});

router.post("/mydata",(req,res)=>{
    console.log(req.body);
    //res.send("Thanks man");
    //const newUser= new User({name: "bilal", password:"123"});
    const newUser= new User({
        name:req.body.name,
       password:req.body.password 
    });

    User.addUser(newUser, (err, user)=>
    {
        if(err)
        {
            res.json({success:false, msg:"Failed to register user!"});
        }
        else
        {
            res.json({success:true,msg:"User added"});
        }
    });
    //newUser.save((err, User)=>{
      //  console.log("User added succusfully "+User.name+" "+User.password);
   // });
});



module.exports= router;