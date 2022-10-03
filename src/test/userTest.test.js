process.env.NODE_ENV="test"
import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http'
let app=require ('../../app')
let User=require ('../../src/model/user')
import {validaData,loginUser,forgetPassword,resetPassword,invalidData} from '../test/dummyData'
let token=null
let tokenTest='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWY3OTE1NGNkYzA1MWFjNTU1NmFkOGEiLCJpYXQiOjE2NDM2MTQ1NTUsImV4cCI6MTY0MzYxNzU1NX0.yb4yebECPlQdvCcaGPcE_vfsKcWrBOf2PclWhEHdAsI'
require('dotenv').config()
use(chaiHttp)

    describe('SIGNUP ENDPOINT-TESTING',()=>{
    
    it('Should not save user with identical email', async () => {
        const res = await request(app).post('/api/use/signUp').send(invalidData)
        expect(res).to.have.status(400);
        expect(res.type).to.equal('text/html');
      });
      it("it should create user", async () => {
        const res = await request(app).post('/api/use/signUp').send(validaData);
        expect(res).to.have.status(200);
      });
    })
      describe('AUTHENTICATION LOGIN END-POINTS TESTING', () => {
      it('should login',async()=>{
          const res = await request(app).post('/api/use/login').send(loginUser)
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('Login successfully')
          token=res.body.token;
      })
      it('should not log a user who is not verified',async()=>{
        const res = await request(app).post('/api/use/login').send({
          email:'hello@gmail.com',
          password:'mazinad1'
        })
        expect(res).to.have.status(404);
      })
      it('it should logout the logged in user', async () => {
        const res = await request(app).post('/api/use/logout').set({'Authorization': `Bearer ${token}`});
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal('Logout successful!')
      });
      it('should get all users',async()=>{
        const res = await request(app).get('/api/use/getAll')
        expect(res).to.have.status(200)
      })
      it("should verify the user",async()=>{
        const res = await request(app).put(`/api/use/verify/?token=${tokenTest}`)
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('message')
        expect(res.type).to.equal('application/json');
      },30000)
      it('should forget password',async()=>{
        const res = await request(app).post('/api/use/forgetpassword').send(forgetPassword)
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('message')
      })
      it('shoul reset the password',async()=>{
        const res = await request(app).post('/api/use/resetPassword').send(resetPassword)
        expect(res).to.have.status(200)
      })
    });