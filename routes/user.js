const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');



// router.get('/getUsers',(req,res,next)=>{
//   User.getUsers()
//     .then(success=>{
//       return user
//     })
//     .catch(err=>{
//       return res.json({msg:err})
//     })
// })


router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  // User.addUser
  // .then(function(success){
  //   res.json({success:true,msg:'User registered'})
  // })
  // .catch(function(err){
  //   return res.json({success:false,msg:'Failed to register user'})
  // })

  User.addUser(newUser)
    .then(success=>{
      return res.json({success: true, msg:'User registered'});
    })
    .catch(err=>{
      return res.json({success:false,msg:'Failed to register user'});
    })

  })

//Authenticate

//problem with auth endpoint
router.post('/authenticate',(req,res,next)=>{
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username,(err,user)=>{
    if(err){
      console.log(err)
    }
    if(!user){
      return res.json({success:false,msg:'User not found'})
    }
  })

    // User.comparePassword(password,user.password)
    //   .then(success=>{
    //     const token = jwt.sign(user,config.secret,{
    //       expiresIn:7200
    //     })
    //     res.json({
    //       success:true,
    //       token:'JWT '+token,
    //       user:{
    //         id:user._id,
    //         name:user.name,
    //         username:user.username,
    //         email:user.email,
    //       }
    //     })
    //   })
    //   .catch(err=>{
    //     return res.json({err,msg:'Invalid credentials'})
    //   })


    User.comparePassword(password,user.password,(err,isMatch)=>{
      if(err){
        console.log(err)
      }
      if(isMatch){
        const token = jwt.sign(user,config.secret,{
          expiresIn:7200
        })
        res.json({
          success:true,
          token:'JWT '+token,
          user:{
            id:user._id,
            name:user.name,
            username:user.username,
            email:user.email,
          }
        })
      }
      else{
        return res.json({success:false,msg:'Invalid credentials'})
      }
    })
  })




//Get profile
router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
  res.json({user:req.user})
})


module.exports  = router;
