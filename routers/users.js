const {User} = require('../models/users');
const express = require('express');
const router = express.Router();

const api = process.env.API_URL;

router.get(`/`, async (req, res) => {
    const userList = await User.find();

    if(!userList) {
        res.status(500).json({success:false})
    }
    res.send(userList);
});

// http://localhost:3001/api/v1/users
router.post(`/`, function (req, res) {
    const user = new User({
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
        isAdmin: req.body.isAdmin
    });
    user.save().then((createdUser => {
        res.status(201).json(createdUser)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        });
    });
});

module.exports = router;