import mongoose from "mongoose";
import validator from "validator";
const customerSchema=new mongoose.Schema({
full_name:{
    type:String,
    required:true
},
tel:{
    type:String,
    required:true,
    unique:true
},
CreatedAt:{
    type:Date,
    default:Date.now
}
});
const cust=mongoose.model('customer',customerSchema)
module.exports=cust;