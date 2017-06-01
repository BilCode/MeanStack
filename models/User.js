const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UsersSchema = mongoose.Schema({name:{type: String ,require:true},password:{type: String, require:true }})

const User= module.exports=mongoose.model("User",UsersSchema)

module.exports.addUser= function(newUser,callback){
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            throw err;           
        }

        bcrypt.hash(newUser.password,salt,(err,hash)=>{
                // const newUser2 = new User({
                //     "name":newUser.name,
                //     "pasword":hash
                // });
                if(err){
                    throw err;           
                }
                newUser.password=hash;
                newUser.save(callback);
            })
    })
}

module.exports.getUserByName = function(userName,callback){
    const qurey = {name: userName};
    User.findOne(qurey,callback);
}

module.exports.comparePasword= function(candidatePassword, hash,callback){
    bcrypt.compare(candidatePassword,hash,(err,isMatch)=>{
        if(err) throw err;
        callback(null,isMatch);
    });
}