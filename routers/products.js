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

// http://localhost:3001/api/v1/products
router.post(`/`, function (req, res) {
    const product = new Product({
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
    product.save().then((createdProduct => {
        res.status(201).json(createdProduct)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        });
    });
});

module.exports = router;