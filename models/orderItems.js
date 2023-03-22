const mongoose = require('mongoose');

const orderItemsSchema = mongoose.Schema({
    id: String,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 0,
        required: true
    }
});

exports.OrderItem = mongoose.model('OrderItem', orderItemsSchema);