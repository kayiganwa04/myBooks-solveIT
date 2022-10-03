import Stock from '../model/stock'

exports.create = async (req, res) => {
    const sup = new Stock({
        prod_stock : req.body.prod_stock,
        supplier_id: req.body.supplier_id,
        quantity:req.body.quantity
    })
    try {
        const details = await sup.save()
        res.send({
            message: 'Stock saved successfully',
            data: details
        })
    } catch (error) {
       
        res.status(500).json({ error })
    }
}
exports.getStock= async (req, res) => {
    await Stock.find().then((pro) => {
        res.send({
            message: 'Stock found are:',
            pro
        })
    })
}
exports.getOneStock = async (req, res, next) => {
    try {
        const cust = await Stock.findOne({ _id: req.params.id})
        if (!cust) {
            res.status(404).send('no Stock found ')
        }
        res.send({
            message: 'Stock found is:',
            cust
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
}
exports.deleteStock = async (req, res) => {
    try {
        const cust = await Stock.findOne({ _id: req.params.id })
        if (!cust) {
            res.send('Stock not found')
        }

        await Stock.deleteOne({ _id: req.params.id })
        res.send({
            message: " Stock deleted successful",
            cust:cust
        })
    } catch (error) {
        res.status(404).send(error.message)
    }
}

exports.updateStock = async (req, res) => {
    const sup = new Supplier({
        prod_stock : req.body.prod_stock,
        supplier_id: req.body.supplier_id,
        quantity:req.body.quantity
    })

    Stock.updateOne({ _id: req.params.id }, sup).then(() => {
        res.status(201).send({
            message: 'Supplier updated successfully',
            sup,
        });
    }).catch((error) => {
        res.status(400).json({
            error: error,

        });
    })
}
