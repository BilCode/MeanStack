const express = require("express")
const bodyParser = require("body-parser")
const app=express();
const routes = require("./routes/users")
const mongoose = require("mongoose")
const config = require("./config/database");
const passport=require("passport")

app.use(bodyParser.json());
app.use(routes);

mongoose.Promise=global.Promise;
mongoose.connect(config.database);

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

mongoose.connection.on("connected",()=>{
    console.log("Connection to DB established");
});

/*app.get("/welcome",(req, res)=>{
    res.send("Welcome");
});

app.get("/callb",(req, res)=>{
    res.send("Reached to route");
});

app.post("/getName",(req,res)=>{
    res.json({"name":"bilal"});
    console.log(req.body);
    //res.send("Thanks");
});

app.post("/getCompany",(req,res)=>{
    res.json({"company":"vectra"});
    console.log(req.body);
});
*/
app.listen(3000,()=>{
    console.log("Server started");
});