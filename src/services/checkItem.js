import Transaction from '../model/transaction'
import Stock from '../model/stock'
import _ from 'lodash'
exports.checkStock=async(productid)=>{
    const data=await Transaction.
    aggregate([
        {$group : {_id:productid, quantity_sum : {$sum :"$inv_productQty"}}}])
    // aggregate([
    //     { $match: { status:"A" } },
    //     { $group: { _id:productid, total: { $sum: "$inv_productQty" } } },
    //     { $sort: { total: -1 } }
    //   ])
    // console.log(data)
    // const stock=await Stock.findOne({_id:req.query._id})
    //     const qty=stock.quantity
    //     const diff=qty-data
    //     console.log(diff)
    //     if(diff>0 && stock.quantity>data){
    //         return res.status(200).json({message:'Stock is not empty'})
    //     }
    //         return res.status(500).json({message:'Stock is empty'})
    
}


