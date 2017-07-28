const express = require('express');
const path = require('path');
const cors  =require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const port = process.env.PORT || 8000
const config = require('./server/config/database');
const debug = require('debug');
const userRoutes = require('./server/routes/user');

mongoose.connect(config.database);

mongoose.connection.on('connected',()=>{
  console.log('Connection to '+config.databse+' is successfull')
})
mongoose.connection.on('error',(err)=>{
  console.log('Databse error: '+ err)
})
//Cors MiddleWare
app.use(cors());

//BodyParser
app.use(bodyParser.json())

//Set static folder
app.use(express.static(path.join(__dirname,'client')))

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

require('./server/config/passport')(passport)

app.use('/users',userRoutes)

app.get('/',(req,res)=>{
  res.send('Home page')
})

app.listen(port,()=>{
  console.log('Server started on port'+port)
});


mongoose.connect('localhost:27017/Iota',()=>{
  console.log('Connected to Database')
});

module.exports = app;
