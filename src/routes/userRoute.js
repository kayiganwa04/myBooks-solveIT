import userController from '../controller/userController'
import auth from '../middleware/auth'
import express from 'express'
const route=express.Router()
route.post('/signUp',userController.createUser)
route.put('/verify/',userController.verify)
route.post('/login',userController.loginUser)
route.post('/logout',auth,userController.logoutUser)
route.get('/getAll',userController.findAll)
route.post('/forgetpassword',userController.forgetPassword)
route.post('/resetPassword',userController.resetPassword)
module.exports=route