const {User} = require('../models/users');
const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const api = process.env.API_URL;

router.get(`/`, async (req, res) => {
    const user = await User.find();

    if(!user) {
        res.status(500).json({success:false})
    }
    res.send(user);
});

router.get(':/id', async(req,res)=>{
    const user = await User.findById(req.params.id);

    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not reached.'});
    }
    res.status(200).send(user);
});

// http://localhost:3001/api/v1/users
router.post(`/`, async(req, res)=>{
    let user = new User({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        passwordHash: req.body.passwordHash,
        street: req.body.street,
        apartment: req.body.apartment,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        googleId: req.body.googleId,
        secret: req.body.secret
    });
    user = await user.save();
    if(!user)
        return res.status(500).send('The user cannot be created.')
    res.send(user);
});

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

router.put('/:id', async(req, res)=> {
    const user = await User.findByIdAndUpdate(
        {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            passwordHash: req.body.passwordHash,
            street: req.body.street,
            apartment: req.body.apartment,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            googleId: req.body.googleId,
            secret: req.body.secret
        },
        { new: true }
    )
    if (!product)
        return res.status(400).send('The user item cannot be created!');

    res.status(200).send(user);
});

// api/v1/id
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id).then(user => {
        if (user) {
            return res.status(200).json({ success: true, message: 'This user has been deleted!' });
        } else {
            return res.status(404).json({ success: false, message: 'This user was not found.' });
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;