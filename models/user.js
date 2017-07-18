var mongoose = require('mongoose');
var Schema  = mongoose.Schema
var mongooseUniqueValidator = require('mongoose-unique-validator');


var schema = new Schema({
  firstName:{required:true,type:String},
  lastName:{required:true,type:String},
  password:{required:true,type:String},
  username:{required:true,type:String,unique:true}
})

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User',schema)
