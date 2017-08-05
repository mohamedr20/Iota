const mongoose =require('mongoose');
const bcrypt = require('bcryptjs')
const config = require('../config/database')

const userSchema = mongoose.Schema({
  name:{
    type:String,
  },
  email:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
})

const User = module.exports = mongoose.model('User',userSchema);

module.exports.getUserById = (id)=>{
  User.findById(id,function(err,user){
    if(err){
      throw err
    }
    return user;
  })
}

//function getUserByUsername  =
module.exports.getUserByUsername = (username,callback)=>{
  const query = {username:username};
  User.findOne(query,callback)
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) console.log(err)
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = (canidatePassword,hash,callback)=>{
  bcrypt.compare(canidatePassword,hash,(err,isMatch)=>{
    if(err){
      console.log(err)
    }
    callback(null,isMatch);
  })
}
