import express from "express";
const route=express.Router()
import productRouter from './productRoute'
import customerRouter from './customerRoutes'
import supplierRoute from './supplierRoute'
import userRoute from './userRoute'
import employeeRoute from './employeeRoute'
import stockRoute from '../routes/stockRoute'
import transactionRoute from '../routes/transactionRoute'
route.use('/supp',supplierRoute)
route.use('/pro',productRouter)
route.use('/cus',customerRouter)
route.use('/use',userRoute)
route.use('/employee',employeeRoute)
route.use('/stock',stockRoute)
route.use('/transaction',transactionRoute)
module.exports=route