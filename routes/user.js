var express  = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')

var User = require('../models/user');


//Registering a new user
router.post('/',function(req,res){
  var user = new User({
    firstName : req.body.firstName,
    lastName :req.body.lastName,
    password : bcrypt.hashSync(req.body.password,10),
    email : req.body.email
  })
  user.save(function(err,result){
    if(err){
      return res.status(500).json({
        title:'An error has occured',
        error:err
      })
    }
    res.status(201).json({
      title:'User has been created',
      obj:result
    })
  })
})


//Sigining in with an exsisting user
router.post('/sigin',function(req,res){
  User.findOne({email:req.body.email},function(err,result){
    if(err){
      return res.status(500).json({
        title:'An error has occured',
        error:err
      })
    }
    if(!user){
      return res.status(401).json({
        title:'Login failed',
        error:{message:'Invalid login credentials'}
      })
    }

    if(!bcrypt.compareSync(req.body.password,user.password)){
      res.status(401).json({
        title:'Login Failed',
        error:{message:'Invalid login credentials'}
      })
    }
    var token = jwt.sign({user:user},'secret',{expiresIn:7200})
    res.status(200).json({
      userId:user._id,
      token:token,
      message:'Successfully logged in'
    })
  })
})

module.exports = router;
