import express, { Router } from "express";
const route=express.Router()
import supplierController from '../controller/supplierController'
import ensureAuthenticated from '../middleware/auth'
route.post('/create',ensureAuthenticated,supplierController.create)
route.get('/getsup',ensureAuthenticated,supplierController.getSupplier)
route.get('/getOnesup/:id',ensureAuthenticated,supplierController.getOneSupplier)
route.patch('/getupdate/:id',ensureAuthenticated,supplierController.updateSupplier)
route.delete('/delete/:id',ensureAuthenticated,supplierController.deleteSupplier)
module.exports=route