if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const auths = require('./routes/auths');
const products = require('./routes/products');
const orders = require('./routes/orders');
const admin = require('./routes/admin');
const connectDB = require('./config/db');

connectDB();

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

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});