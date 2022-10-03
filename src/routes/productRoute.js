import express, { Router } from "express";
const route=express.Router()
import productController from '../controller/productController'
import ensureAuthenticated from '../middleware/auth'
route.post('/create',ensureAuthenticated,productController.create)
route.get('/getpro',ensureAuthenticated,productController.getProduct)
route.get('/getOnepro/:id',ensureAuthenticated,productController.getOneProduct)
route.patch('/getupdate/:id',ensureAuthenticated,productController.updateProduct)
route.delete('/delete/:id',productController.deleteProduct)
module.exports=route