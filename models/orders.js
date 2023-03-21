const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    id: String,
    //orderItems: orderItems,
    shippingAddress1: String,
    shippingAddress2: String,
    city: String,
    zip: String,
    country: String,
    phone: Number,
    status: String,
    totalPrice: Number,
    //user: User,
    dateOrdered: Date
});

exports.Order = mongoose.model('Order', ordersSchema);