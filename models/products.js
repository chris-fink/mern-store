const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 250
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    availableForDelivery: {
        type: Boolean,
        default: true
    },
    comments: [{ body: String, date: Date }]
});

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true,
});

exports.Product = mongoose.model('Product', productSchema);