import Supplier from '../model/supplier'

exports.create = async (req, res) => {
    const sup = new Supplier({
        supplier_name: req.body.supplier_name,
        supplier_tel: req.body.supplier_tel,
        supplier_email:req.body.supplier_email
    })
    try {
        const details = await sup.save()
        res.send({
            message: 'Supplier saved successfully',
            data: details
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}
exports.getSupplier= async (req, res) => {
    await Supplier.find().then((pro) => {
        res.send({
            message: 'Suppliers found are:',
            pro
        })
    })
}
exports.getOneSupplier = async (req, res, next) => {
    try {
        const cust = await Supplier.findOne({ _id: req.params.id})
        if (!cust) {
            res.status(404).send('no Suppliers found ')
        }
        res.send({
            message: 'Supplier found is:',
            cust
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
}
exports.deleteSupplier = async (req, res) => {
    try {
        const cust = await Supplier.findOne({ _id: req.params.id })
        if (!cust) {
            res.send('Supplier not found')
        }

        await Supplier.deleteOne({ _id: req.params.id })
        res.send({
            message: " Supplier deleted successful",
            cust:cust
        })
    } catch (error) {
        res.status(404).send(error.message)
    }
}

exports.updateSupplier = async (req, res) => {
    const sup = new Supplier({
        supplier_name: req.body.supplier_name,
        supplier_tel: req.body.supplier_tel,
        supplier_email:req.body.supplier_email
    })

    Supplier.updateOne({ _id: req.params.id }, sup).then(() => {
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
