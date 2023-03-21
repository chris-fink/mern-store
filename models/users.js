const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    id: String,
    name: String,
    email: String,
    passwordHash: String,
    street: String,
    apartment: String,
    city: String,
    zip: String,
    country: String,
    phone: Number,
    isAdmin: Boolean
});

exports.User = mongoose.model('User', usersSchema);