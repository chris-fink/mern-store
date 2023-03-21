const {Category} = require('../models/categories');
const express = require('express');
const router = express.Router();

const api = process.env.API_URL;

router.get(`$/`, async (req, res) => {
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({success:false})
    }
    res.send(categoryList);
});

// http://localhost:3001/api/v1/categories
router.post(`/`, function (req, res) {
    const category = new Category({
        id: req.body.id,
        name: req.body.name,
        color: req.body.color,
        icon: req.body.icon,
        image: req.body.image
    });
    category.save().then((createdCategory => {
        res.status(201).json(createdCategory)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        });
    });
});

module.exports = router;