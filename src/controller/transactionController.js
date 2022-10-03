import Transaction from '../model/transaction'
import {checkStock} from '../services/checkItem'
exports.create = async (req, res) => {
    const total_price=req.body.inv_productQty * req.body.inv_productPrice
    const sup = new Transaction({
        inv_customerId : req.body.inv_customerId,
        inv_productId: req.body.inv_productId,
        inv_productQty:req.body.inv_productQty,
        inv_productPrice:req.body.inv_productPrice,
        inv_total_price:total_price,
    })
    try {
        const check=await checkStock(req.body.inv_productId)
        // console.log(check)
        // const details = await sup.save()
        // res.send({
        //     message: 'Transaction saved successfully',
        //     data: details
        // })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}
exports.getTransaction= async (req, res) => {
    await Transaction.find().then((pro) => {
        res.send({
            message: 'Transaction found are:',
            pro
        })
    })
}
exports.getOneTransaction = async (req, res, next) => {
    try {
        const cust = await Transaction.findOne({ _id: req.params.id})
        if (!cust) {
            res.status(404).send('no Transaction found ')
        }
        res.send({
            message: 'Transaction found is:',
            cust
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
}
exports.deleteTransaction = async (req, res) => {
    try {
        const cust = await Transaction.findOne({ _id: req.params.id })
        if (!cust) {
            res.send('Transaction not found')
        }

        await Transaction.deleteOne({ _id: req.params.id })
        res.send({
            message: " Transaction deleted successful",
            cust:cust
        })
    } catch (error) {
        res.status(404).send(error.message)
    }
}

exports.updateTransaction = async (req, res) => {
    const sup = new Supplier({
        inv_customerId : req.body.inv_customerId,
        inv_productId: req.body.inv_productId,
        inv_productQty:req.body.inv_productQty,
        inv_total_price:req.body.inv_total_price
    })

    Transaction.updateOne({ _id: req.params.id }, sup).then(() => {
        res.status(201).send({
            message: 'Transaction updated successfully',
            sup,
        });
    }).catch((error) => {
        res.status(400).json({
            error: error,

        });
    })
}
