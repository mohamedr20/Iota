process.env.NODE_ENV = 'test';


const mongoose = require('mongoose');
const User = require('../models/user');
const server = require('../../app');
const chai = require('chai');
const should = chai.should();
const chaiHttp =require('chai-http');

chai.use(chaiHttp)


describe('User', () => {
    beforeEach((done) => {
        User.remove({}, (err) => {
           done();
        });
    });


  describe('Post a User',()=>{
    it('should post a user to the database',(done)=>{
      let newUser = new User({
        name:'Test',
        password:'validPass',
        email:'test@email.com',
        username:'tester20'
      })
      chai.request(server)
        .post('/users/register')
        .send(newUser)
        .end((err,res)=>{
          console.log(res)
          res.should.have.status(201);
          res.body.should.be.a('object');
          done()
        })
    })
  })
})
