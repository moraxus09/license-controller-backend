const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const authRouter = require('./auth/auth.router');
const productsRouter = require('./products/products.router');
const adminRouter = require('./admin/admin.router');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/admin', adminRouter);

module.exports = app;