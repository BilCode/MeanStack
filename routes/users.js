const express =require("express");
const router= express.Router();

router.get("/mypage",(req,res)=>{
    console.log("Welcome to my router");
    res.send("Welcome to my router");
});

router.post("/mydata",(req,res)=>{
    console.log(req.body);
    res.send("Thanks man");
});

module.exports= router;