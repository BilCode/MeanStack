const express =require("express");
const router= express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config/database");
const passport= require("passport");

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
        User.comparePasword(userpass,user.password,(err,isMatch)=>{
            if(err) throw err;
            if(isMatch)
            { 
                //res.json({success:true,message:"Loged In"});
                const token= jwt.sign(user,config.secret,{expiresIn:6040800});
                res.json({success:true,token:"JWT "+token});
            }
            else res.json({success:false,message:"User Name is not valid"});
        });
    });
});

router.get("/profile",passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({message:"This is profile"});
});

router.post("/adduser",(req,res)=>{
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