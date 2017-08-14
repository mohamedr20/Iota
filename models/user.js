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

//function getUserByUsername  =
module.exports.getUserByUsername = (username,callback)=>{
  const query = {username:username};
  User.findOne(query,callback)
}

module.exports.getUsers = function(){
  return new Promise((resolve,reject)=>{
    User.find({},(err,user)=>{
      if(err){
        reject(err)
      }
      resolve(user);
    })
  })
}



// module.exports.addUser = function(){
//   return new Promise(function(resolve,reject,newUser){
//     if(newUser){
//         bcrypt.genSalt(10, (err, salt)=>{
//         bcrypt.hash(newUser.password, salt, (err, hash) => {
//         if(err) console.log(err)
//         newUser.password = hash;
//         });
//       });
//       resolve(newUser.save())
//     }
//     else{ 
//       const reason = new Error('Unable to add user');
//       reject(reason);
//     }
//   })
// }


module.exports.addUser = function(newUser){
  return new Promise((resolve,reject)=>{
    //return a promise

    //gen a salt
    bcrypt.genSalt(10, (err, salt)=>{
      //hash it 
    bcrypt.hash(newUser.password, salt, (err, hash) => {
    if(err){
      return reject(err) //reject on err
    }
    newUser.password = hash;
    return resolve(newUser.save()); //resolve on success
    });
  });

  })
}


// module.exports.comparePassword = function(canidatePassword,hash){
//   return new Promise((resolve,reject)=>{
//     bcrypt.compare(canidatePassword,hash,(err,isMatch)=>{
//       if(err){
//         reject(err)
//       }
//       return resolve(isMatch)
//     })
//   })
// }

module.exports.comparePassword = (canidatePassword,hash,callback)=>{
  bcrypt.compare(canidatePassword,hash,(err,isMatch)=>{
    if(err){
      console.log(err)
    }
    callback(null,isMatch);
  })
}
