const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id: String,
    image: String,
    //category: Category,
    name: String,
    description: String,
    price: Number,
    rating: Number,
    numberOfReviews: Number,
    countInStock: Number,
    isFeatured: Boolean,
    availableForDelivery: Boolean,
    comments: [{ body: String, date: Date }]
});

exports.Product = mongoose.model('Product', productSchema);