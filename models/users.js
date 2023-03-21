const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

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
    isAdmin: Boolean,
    googleId: String,
    secret: String
});

//userSchema PLUGIN
usersSchema.plugin(passportLocalMongoose);
usersSchema.plugin(findOrCreate);

exports.User = mongoose.model('User', usersSchema);