const OrderItem = require('../models/orderItems');
const express = require('express');
const router = express.Router();

const api = process.env.API_URL;

router.get(`$/`, async (req, res) => {
    const orderItemList = await OrderItem.find();

    if(!orderItemList) {
        res.status(500).json({success:false})
    }
    res.send(orderItemList);
});

// http://localhost:3001/api/v1/orderItems
router.post(`/`, function (req, res) {
    const orderItem = new OrderItem({
        id: req.body.id,
        product: req.body.product,
        quantity: req.body.quantity,
    });
    orderItem.save().then((createdOrderItem => {
        res.status(201).json(createdOrderItem)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        });
    });
});

module.exports = router;