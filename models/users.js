const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const usersSchema = mongoose.Schema({
    id: String,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: String,
    street: {
        type: String,
        required: true
    },
    apartment: String,
    city: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    googleId: String,
    secret: String
});

//userSchema PLUGIN
usersSchema.plugin(passportLocalMongoose);
usersSchema.plugin(findOrCreate);

exports.User = mongoose.model('User', usersSchema);