const express = require('express');
const router = express.Router();
const verifyAuth = require('../middleware/auth');
const admin = require('../config/admin');
const paginate = require('../middleware/paginate');
const Product = require('../models/Product');
const User = require('../models/User');


router.get('/products', [verifyAuth, paginate(Product)], async (req, res) => {
	try {
		if (!req.authID) {
			return res.status(400).json({
				msg: 'Invalid Credentials',
			});
		}
		return res.json({
			products: req.paginatedResults,
		});
	} catch (e) {
		return res.status(500).json({
			msg: 'Server error',
		});
	}
});

router.post('/products/add-review', verifyAuth, async(req, res) => {
	const customer = await User.findOne({ 'details.id': req.authID }, {_id: 1, details:1});
	const review = {
		customer: customer._id,
		comment: req.body.comment, 
		stars: req.body.stars,
		commentedAt: new Date()
	};
	await Product.updateOne(
		{ _id: req.body.id },
		{ $push: { reviews: review } });
	await Product.updateOne({ _id: req.body.id}, [{$set: {averageRating: { $avg: "$reviews.stars" } }}]);
	
	review.customer = {
		details: {
			photoURL: customer.details.photoURL,
			displayName: customer.details.displayName,
		}
	};
	
	const product = await Product.findOne({_id: req.body.id}, {averageRating: 1, _id: 0});
	
	return res.status(200).json({
			msg: 'Review Saved',
			review,
			averageRating: product.averageRating
		});
});

router.post('/save-cart', verifyAuth, async (req, res) => {
	try {
		await User.updateOne({
			'details.id': req.authID
		}, {
			$set: {
				cart: req.body.cart
			}
		});
		return res.status(200).json({
			msg: 'Cart items Saved',
		});
	} catch (e) {
		return res.status(500).json({
			msg: 'Server error',
		});
	}
});


router.get('/check-stock', verifyAuth, async (req, res) => {
	try {
		const user = await User.findOne({
			'details.id': req.authID
		}, {cart:1}).populate({path: 'cart.product', select: 'stock dish photoURL price restaurant'}).exec();

		user.cart.forEach(item => {
			if(item.product.stock < item.quantity) {
				return res.status(200).json({
					code: 400,
					msg: 'All foods not in stock right Now',
					cart: user.cart.map(item => {
							return {
								...item.product._doc,
								quantity: item.quantity,
							}
						})
				});
			}
		});

		return res.status(200).json({
			code: 200,
			msg: 'Stock available'
		});

	} catch (error) {
		return res.status(500).json({
			msg: 'Server error',
		});
	}
});


router.post('/admin/add-product', verifyAuth, async (req, res) => {
	try {
		if (!req.siteAdmin) {
			return res.status(403).json({
				msg: 'Unauthorized Access',
			});
		}
		const product = await Product.create(req.body);
		return res.json({
			code: 'Server Notification',
			message: 'New Dish Uploaded Successfully',
			id: product._id,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			msg: 'Server error',
		});
	}
});


router.post('/admin/products/:id/update', verifyAuth, async (req, res) => {
	try {
		if (!req.siteAdmin) {
			return res.status(403).json({
				msg: 'Unauthorized Access',
			});
		}
		const product = await Product.updateOne({_id: req.params.id}, {$set: {...req.body}});
		return res.json({
			code: 'Server Notification',
			message: 'Dish updated successfully',
			id: product._id,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			msg: 'Server error',
		});
	}
})

router.get('/view/product/:id', verifyAuth, async (req, res) => {
	try {
		const product = await Product.findOne({_id: req.params.id}, { reviews: 0});
		return res.json({
			product,
		});
	} catch (e) {
		return res.status(500).json({
			msg: 'Server error',
		});
	}
});

router.get('/product/:id/reviews', verifyAuth, async (req, res) => {
	try {
		const reviews = await Product.findOne({_id: req.params.id}, { reviews: 1}).populate({
            path: 'reviews.customer',
            select: 'details.photoURL details.displayName -_id'
        }).exec();
		res.json({
			productID: req.params.id,
			reviews: reviews.reviews,
		});
	} catch (e) {
		return res.status(500).json({
			msg: 'Server error',
		});
	}
});


// Combo Foods
router.get('/products/combos', verifyAuth, async (req, res) => {
	try {
		const products = await Product.find({category: 'Combos'}, {description: 0, reviews: 0});
		return res.json(products);
	} catch (error) {
		return res.status(500).json({
			msg: 'Server error',
		});
	}
});




// Seraching with filters
router.get('/products/search', verifyAuth, async (req, res) => {
	try {
		let restaurants = [
                "Looters",
                "ANC",
				"Pizzeria",
				"Tott"
			];
		let foodCategories = [
                    "Burgers",
                    "Pizza",
                    "Drinks",
                    "Rolls",
                    "Momos",
                    "Ice Cream",
					"Noodles",
					"Combos"
				];
		

		let {text, category, restaurant, price, stocked} = req.query;
		
		let products;
		
		if(restaurant) restaurants = [restaurant];

		if(category) foodCategories = [category];

		if(!price) price = 100; 


		if(stocked) {
			products = await Product
			.find({ $text: {$search: text}, category: {$in: foodCategories }, restaurant: {$in: restaurants}, price: {$lt: price}, stock: {$gt: 0}}, {description: 0, reviews: 0})
			.sort({ createdAt: -1 });
		} else {
			products = await Product
			.find({ $text: {$search: text}, category: {$in: foodCategories }, restaurant: {$in: restaurants}, price: {$lt: price}}, {description: 0, reviews: 0})
			.sort({ createdAt: -1 });
		}

		return res.json({
			mathedFound: products.length,
			results: products,
		});
	} catch (error) {
		return res.status(500).json({
			msg: 'Server error',
		});
	}
});




module.exports = router;
