const {Product} = require('../models/products');
const express = require('express');
const router = express.Router();

const api = process.env.API_URL;

router.get(`/`, async (req, res) => {
    const productList = await Product.find();

    if(!productList) {
        res.status(500).json({success:false})
    }
    res.send(productList);
});

router.get('/', async(req,res)=>{
    const product = await Product.findById(req.params.id);

    if(!product) {
        res.status(500).json({message: 'The product with the given ID was not reached.'});
    }
    res.status(200).send(product);
});

// http://localhost:3001/api/v1/products
router.post(`/`, async(req, res)=> {
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category');

    let product = new Product({
        image: req.body.image,
        category: req.body.category,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        rating: req.body.rating,
        numberOfReviews: req.body.numberOfReviews,
        countInStock: req.body.countInStock,
        isFeatured: req.body.isFeatured,
        availableForDelivery: req.body.availableForDelivery,
        comments: req.body.comments
    });
    product = await product.save();
    if(!product)
        return res.status(500).send('The product cannot be created.')
    res.send(product);
});

router.put('/:id', async(req, res)=> {
    const product = await Product.findByIdAndUpdate(
        {
            image: req.body.image,
            category: req.body.category,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            rating: req.body.rating,
            numberOfReviews: req.body.numberOfReviews,
            countInStock: req.body.countInStock,
            isFeatured: req.body.isFeatured,
            availableForDelivery: req.body.availableForDelivery,
            comments: req.body.comments
        },
        { new: true }
    )
    if (!product)
        return res.status(400).send('The product item cannot be created!');

    res.status(200).send(product);
});

// api/v1/id
router.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id).then(product => {
        if (product) {
            return res.status(200).json({ success: true, message: 'This product has been deleted!' });
        } else {
            return res.status(404).json({ success: false, message: 'This product was not found.' });
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;