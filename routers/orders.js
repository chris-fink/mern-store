const {Order} = require('../models/orders');
const express = require('express');
const {OrderItem} = require('../models/orderItems');
const {User} = require('../models/users');
const router = express.Router();

const api = process.env.API_URL;

router.get(`/`, async (req, res) => {
    const order = await Order.find().populate('category');

    if(!order) {
        res.status(500).json({success:false})
    }
    res.send(order);
});

router.get('/:/id', async(req,res)=>{
    const order = await Order.findById(req.params.id).populate('orderItem', 'user');

    if(!order) {
        res.status(500).json({message: 'The order with the given ID was not reached.'});
    }
    res.status(200).send(order);
});

// http://localhost:3001/api/v1/orders
router.post(`/`, async(req, res)=> {
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
    order = await order.save();
    if(!order)
        return res.status(500).send('The order cannot be created.')
    res.send(order);
});

router.put('/:id', async(req, res)=> {
    let order = await Order.findByIdAndUpdate(
        {
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
        },
        { new: true }
    )
    if (!order)
        return res.status(400).send('The order cannot be created!');

    res.status(200).send(order);
});

// api/v1/id
router.delete('/:id', (req, res) => {
    Order.findByIdAndRemove(req.params.id).then(order => {
        if (order) {
            return res.status(200).json({ success: true, message: 'This order has been deleted!' });
        } else {
            return res.status(404).json({ success: false, message: 'This order was not found.' });
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;