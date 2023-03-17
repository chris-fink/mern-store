//jshint esversion: 6

const express = require('express');
const https = require('https');
const port = 3001;
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
//Sets StrictQuery to false
mongoose.set('strictQuery', false);

require('dotenv/config');

const api = process.env.API_URL;

//Middleware
app.use(express.json());
app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({ extended: true }));

//MongoDb connect
mongoose.connect(process.env.MONGO_CONNECT, { 
    useNewUrlParser: true 
})
.then(()=>{
    console.log('Database Connection is Ready');
})
.catch((err)=>{
    console.log(err);
});

// http://localhost:3001/api/v1/products
app.get(`${api}/products`, function (req, res) {
    const product = {
        id: 1,
        name: 'green velvet sofa',
        image: 'some_url'
    }
    res.send(product);
});

app.post(`${api}/products`, function (req, res) {
    const newProduct = req.body;
    console.log(newProduct);
    res.send(newProduct);
});

app.listen(3001, function () {
    console.log(`Server has started on port ${port}`)
});