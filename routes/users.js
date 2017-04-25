const express =require("express");
const router= express.Router();
const User = require("../models/User");

router.get("/mypage",(req,res)=>{
    console.log("Welcome to my router");
    res.send("Welcome to my router");
});

router.post("/mydata",(req,res)=>{
    console.log(req.body);
    res.send("Thanks man");
    //const newUser= new User({name: "bilal", password:"123"});
    const newUser= new User(req.body);
    newUser.save((err, User)=>{
        console.log("User added succusfully "+User.name+" "+User.password);
    });
});

module.exports= router;