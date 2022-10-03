import Customer from '../model/customer'

exports.create = async (req, res) => {
    const cus = new Customer({
        full_name: req.body.full_name,
        tel: req.body.tel
    })
    try {
        const details = await cus.save()
        res.send({
            message: 'Customer saved successfully',
            data: details
        })
    } catch (err) {
       
        res.status(500).json({ err:err })
    }
}
exports.getCustomer= async (req, res) => {
    await Customer.find().then((cust) => {
        res.send({
            message: 'customers found are:',
            cust
        })
    })
}
exports.getOneCustomer = async (req, res, next) => {
    try {
        const cust = await Customer.findOne({ _id: req.params.id})
        if (!cust) {
            res.status(404).send('no customers found ')
        }
        res.send({
            message: 'Customer found is:',
            cust
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
}
exports.deleteCustomer = async (req, res) => {
    try {
        const cust = await Customer.findOne({ _id: req.params.id })
        if (!cust) {
            res.send('Customer not found')
        }

        await Customer.deleteOne({ _id: req.params.id })
        res.send({
            message: " Customer deleted successful",
            cust:cust
        })
    } catch (error) {
        res.status(404).send(error.message)
    }
}

exports.updateCustomer = async (req, res) => {
    const cus = new Customer({
        full_name: req.body.full_name,
        email: req.body.email,
        tel: req.body.email,
        product_id: req.Product._id
    })

    Customer.updateOne({ _id: req.params.id }, cus).then(() => {
        res.status(201).send({
            message: 'Customer updated successfully',
            cus,
        });
    }).catch((error) => {
        res.status(400).json({
            error: error,

        });
    })
}
