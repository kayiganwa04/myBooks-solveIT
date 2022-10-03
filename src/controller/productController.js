import Product from '../model/product'
import uploader from '../helper/storage'
exports.create = async (req, res) => {
    try {
    const {imagePath}=req.files;
    const response=await uploader(imagePath.tempFilePath)
    // req.body.imagePath=response.secure_url
    const product = new Product({
        product_name: req.body.product_name,
        product_type: req.body.product_type,
        imagePath:response.secure_url,
        product_price: req.body.product_price
    })
    
        const details = await product.save()
        res.send({
            message: 'Product saved successfully',
            data: details
        })
    } catch (error) {
       
        res.status(500).json({ error })
    }
}
exports.getProduct= async (req, res) => {
    await Product.find().then((pro) => {
        res.send({
            message: 'Products found are:',
            pro
        })
    })
}
exports.calculateProduct=async(req,res)=>{
    
}
exports.getOneProduct = async (req, res, next) => {
    try {
        const cust = await Product.findOne({ _id: req.params.id})
        if (!cust) {
            res.status(404).send('no Products found ')
        }
        res.send({
            message: 'Product found is:',
            cust
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
}
exports.deleteProduct = async (req, res) => {
    try {
        const cust = await Product.findOne({ _id: req.params.id})
        if (!cust) {
            res.send('Product not found')
        }

        await Product.deleteOne({ _id: req.params.id, supplier_id: req.Supplier._id })
        res.send({
            message: " Product deleted successful",
            cust:cust
        })
    } catch (error) {
        res.status(404).send(error.message)
    }
}

exports.updateProduct = async (req, res) => {
    const product = new Product({
        product_name: req.body.product_name,
        product_type: req.body.product_type,
        imagePath:response.secure_url,
        product_price: req.body.price
    })

    Product.updateOne({ _id: req.params.id }, product).then(() => {
        res.status(201).send({
            message: 'Product updated successfully',
            cus,
        });
    }).catch((error) => {
        res.status(400).json({
            error: error,

        });
    })
}
