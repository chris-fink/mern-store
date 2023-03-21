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

const productsRouter = require('./routers/products');
const categoriesRouter = require('./routers/categories');
const orderItemsRouter = require('./routers/orderItems');
const ordersRouter = require('./routers/orders');
const usersRouter = require('./routers/users');

//Middleware
app.use(express.json());
app.use(morgan('tiny'));

//routers folder
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/orderItems`, orderItemsRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/users`, usersRouter);


app.use(bodyParser.urlencoded({ extended: true }));

//models folder
const Product = require('./models/products');
const Order = require('./models/orders');
const OrderItem = require('./models/orderItems');
const User = require('./models/users');
const Category = require('./models/categories');

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

//server
app.listen(3001, function () {
    console.log(`Server has started on port ${port}`)
});