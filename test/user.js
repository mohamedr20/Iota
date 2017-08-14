

process.env.NODE_ENV = 'test';


const mongoose = require('mongoose');
const User = require('../models/user');
const server = require('../app.js');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp =require('chai-http');

chai.use(chaiHttp)


describe('User API Tests', () => {


    let newUser = new User({
        name:'Test',
        password:'validPass',
        email:'test@email.com',
        username:'tester20'
      })

    it('Able to post a user',(done)=>{
      chai.request(server)
        .post('/users/register')
        .send(newUser)
        .end((err,res)=>{
          if(err){
            console.log(err);
          }
          expect(res.statusCode).to.equal(200);
          done()
        })
    })

    it('able to authenticate a user',(done)=>{
      chai.request(server)
      .post('/users/authenticate')
      .send(newUser.name,newUser.password)
      .end((err,res)=>{
        if(err){
          console.log(err)
        }
        expect(res.statusCode).to.equal(200);
      })
    })

    // it('Able to get a user',(done)=>{
    //   chai.request(server)
    //     .get('/users/')
    // })
    
})
