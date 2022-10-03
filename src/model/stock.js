import  mongoose  from "mongoose";

const stockSchema=mongoose.Schema({
    prod_stock:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required:true
    },
    supplier_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'supplier',
        required:true,
    },
    quantity:{
        type:Number,
        required:true
    },
})
const Stock=mongoose.model('stock',stockSchema)
module.exports=Stock