const {OrderItem} = require('../models/orderItems');
const express = require('express');
const {product} = require('../models/products');

const router = express.Router();

const api = process.env.API_URL;

router.get(`/`, async (req, res) => {
    const orderItemList = await OrderItem.find().populate('product');

    if(!orderItemList) {
        res.status(500).json({success:false})
    }
    res.send(orderItemList);
});

router.get(':/id', async(req,res)=>{
    const orderItem = await OrderItem.findById(req.params.id).populate('product');

    if(!orderItem) {
        res.status(500).json({message: 'Te order item with the given ID was not reached.'});
    }
    res.status(200).send(orderItem);
});

// http://localhost:3001/api/v1/orderItems
router.post(`/`, async(req, res)=>{
    let orderItem = new OrderItem({
        id: req.body.id,
        product: req.body.product,
        quantity: req.body.quantity,
    });
    orderItem = await orderItem.save();
    if(!orderItem)
        return res.status(500).send('The order item cannot be created.')
    res.send(orderItem);
});

router.put('/:id', async(req, res)=> {
    const orderItem = await OrderItem.findByIdAndUpdate(
        {
            id: req.body.id,
            product: req.body.product,
            quantity: req.body.quantity,
        },
        { new: true }
    )
    if (!orderItem)
        return res.status(400).send('The order item cannot be created!');

    res.status(200).send(orderItem);
});

// api/v1/id
router.delete('/:id', (req, res) => {
    OrderItem.findByIdAndRemove(req.params.id).then(orderItem => {
        if (orderItem) {
            return res.status(200).json({ success: true, message: 'This item has been deleted from the order' });
        } else {
            return res.status(404).json({ success: false, message: 'This item was not found in the order.' });
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;