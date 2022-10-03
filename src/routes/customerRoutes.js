import express, { Router } from "express";
const route=express.Router()
import customerController from '../controller/customerController'
import ensureAuthenticated from '../middleware/auth'

route.post('/create',ensureAuthenticated,customerController.create)
route.get('/getCust',ensureAuthenticated,customerController.getCustomer)
route.get('/getOneCust/:id',ensureAuthenticated,customerController.getOneCustomer)
route.patch('/getupdate/:id',ensureAuthenticated,customerController.updateCustomer)
route.delete('/delete/:id',ensureAuthenticated,customerController.deleteCustomer)
module.exports=route