import express, { Router } from "express";
const route=express.Router()
import stockController from '../controller/stockController'
import ensureAuthenticated from '../middleware/auth'
route.post('/create',ensureAuthenticated,stockController.create)
route.get('/getsup',ensureAuthenticated,stockController.getStock)
route.get('/getOnesup/:id',ensureAuthenticated,stockController.getOneStock)
route.patch('/getupdate/:id',ensureAuthenticated,stockController.updateStock)
route.delete('/delete/:id',ensureAuthenticated,stockController.deleteStock)
module.exports=route