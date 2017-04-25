const mongoose = require("mongoose")
const UsersSchema = mongoose.Schema({name:{type: String ,require:true},password:{type: String, require:true }})

const User= module.exports=mongoose.model("User",UsersSchema)
