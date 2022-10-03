import mongoose from "mongoose";
const transactionSchema=new mongoose.Schema({
inv_customerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'customer',
    required:true
},
inv_productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'product',
    required:true
},
inv_productQty:{
    type:Number,
    required:true
},
inv_productPrice:{
    type:Number,
    required:true
},
inv_total_price:{
    type:Number,
    required:true,
},
CreatedAt:{
    type:Date,
    default:Date.now
}
});
const inv=mongoose.model('transaction',transactionSchema) 
module.exports=inv;