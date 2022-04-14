const express = require('express');
const router = express.Router();
const verifyAuth = require('../middleware/auth');
const admin = require('../config/admin');
// const paginate = require('../middleware/paginate');
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

router.get('/admin/stats', verifyAuth, async (req, res) => {
	try {
		if (!req.siteAdmin) {
			return res.status(403).json({
				msg: 'Unauthorized Access',
			});
		}

		const orderCount = await Order.countDocuments({ isPurchased: true });
		const productCount = await Product.countDocuments();
		const customerCount = await User.countDocuments({
			isAdmin: false,
		});

		return res.status(200).json({
			stats: {
				orderCount,
				productCount,
				customerCount,
			},
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			msg: 'Oops! Server error occurred',
		});
	}
});

module.exports = router;
