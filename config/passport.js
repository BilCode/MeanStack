const JWTStrategy= require("passport-jwt").Strategy;
const ExtractJwt=require("passport-jwt").ExtractJwt;
const config=require("./database");
const User = require("../models/User");

//console.log(User);
module.exports = function(passport){
let opts = { };
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = config.secret;
passport.use(new JWTStrategy(opts,(jwt_payload,done)=>{
        console.log(jwt_payload);
        User.getUserByName(jwt_payload._doc.name,(err,User)=>{
            if(err)
            {
                //throw Error;
                return done(err,false)
            }
            if(User)
            {
                return done(null,User); 
            }
            else
            {
                return done(null,false);
            }
        })
    }))
}