const {Order} = require('../models/orders');
const express = require('express');
const router = express.Router();

const api = process.env.API_URL;

router.get(`/`, async (req, res) => {
    const orderList = await Order.find();

    if(!orderList) {
        res.status(500).json({success:false})
    }
    res.send(orderList);
});

// http://localhost:3001/api/v1/orders
router.post(`/`, function (req, res) {
    const order = new Order({
        id: req.body.id,
        orderItems: req.body.orderItems,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: req.body.totalPrice,
        user: req.body.user,
        dateOrdered: req.body.dateOrdered
    });
    order.save().then((createdOrder => {
        res.status(201).json(createdOrder)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        });
    });
});

module.exports = router;