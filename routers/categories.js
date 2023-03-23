const { Category } = require('../models/categories');
const express = require('express');
const router = express.Router();

const api = process.env.API_URL;

router.get(`/`, async (req, res) => {
    const categoryList = await Category.find();

    if (!categoryList) {
        res.status(500).json({ success: false })
    }
    res.status(200).send(categoryList);
});

router.get('/:/id', async(req,res)=>{
    const category = await Category.findById(req.params.id);

    if(!category) {
        res.status(500).json({message: 'The category with the given ID was not reached.'});
    }
    res.status(200).send(category);
});

// http://localhost:3001/api/v1/categories
router.post(`/`, async (req, res) => {
    let category = new Category({
        name: req.body.name,
        color: req.body.color,
        icon: req.body.icon,
    });
    category = await category.save();

    if (!category)
        return res.status(400).send('The category cannot be created!');

    res.status(200).send(category);
});

router.put('/:id', async(req, res)=> {
    const category = await Category.findByIdAndUpdate(
        {
            name: req.body.name,
            color: req.body.color,
            icon: req.body.icon,
        },
        { new: true }
    )
    if (!category)
        return res.status(400).send('The category cannot be created!');

    res.status(200).send(category);
});

// api/v1/id
router.delete('/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id).then(category => {
        if (category) {
            return res.status(200).json({ success: true, message: 'This category has been deleted!' });
        } else {
            return res.status(404).json({ success: false, message: 'This category was not found.' });
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;