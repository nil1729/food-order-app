const path = require('path');
const configFilePath = path.join('/opt/nil1729/food-order-app/backend.env');
require('dotenv').config({ path: configFilePath });

const express = require('express');
const app = express();
const auths = require('./routes/auths');
const products = require('./routes/products');
const orders = require('./routes/orders');
const admin = require('./routes/admin');

app.use(express.json());
app.use('/api/v1', auths);
app.use('/api/v1', orders);
app.use('/api/v1', products);
app.use('/api/v1', admin);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public'));
  app.get('*', async (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
}

module.exports = app;
