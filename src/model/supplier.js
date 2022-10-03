import  mongoose  from "mongoose";
// import validator from 'validator'
// import bcrypt from 'bcrypt'
const supplierSchema=new mongoose.Schema({
supplier_name:{
    type:String,
    required:true
},
supplier_tel:{
    type:String,
    required:true
},
supplier_email:{
    type:String,
    required:true
},
CreatedAt:{
    type:Date,
    default:Date.now
}
});
const sp=mongoose.model('supplier',supplierSchema)
module.exports=sp;