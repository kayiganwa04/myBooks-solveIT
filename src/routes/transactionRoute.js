import express, { Router } from "express";
const route=express.Router()
import transactionController from '../controller/transactionController'
import ensureAuthenticated from '../middleware/auth'
route.post('/create',ensureAuthenticated,transactionController.create)
route.get('/getsup',ensureAuthenticated,transactionController.getTransaction)
route.get('/getOnesup/:id',ensureAuthenticated,transactionController.getOneTransaction)
route.patch('/getupdate/:id',ensureAuthenticated,transactionController.updateTransaction)
route.delete('/delete/:id',ensureAuthenticated,transactionController.deleteTransaction)
module.exports=route