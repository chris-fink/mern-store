const mongoose = require('mongoose');

const orderItemsSchema = mongoose.Schema({
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

orderItemsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderItemsSchema.set('toJSON', {
    virtuals: true,
});

exports.OrderItem = mongoose.model('OrderItem', orderItemsSchema);