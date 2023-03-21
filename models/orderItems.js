const mongoose = require('mongoose');

const orderItemsSchema = mongoose.Schema({
    id: String,
    //product: Product,
    quantity: Number
});

exports.OrderItem = mongoose.model('OrderItem', orderItemsSchema);