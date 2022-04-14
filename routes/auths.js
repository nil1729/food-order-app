const express = require('express');
const router = express.Router();
const { uniqueNamesGenerator, names } = require('unique-names-generator');
const validator = require('validator');
const admin = require('../config/admin');
const verifyAuth = require('../middleware/auth');
const User = require('../models/User');

router.get('/register', verifyAuth, async (req, res) => {
	try {
		if (req.token.name) {
			return res.status(200).json({
				msg: 'Already Registered',
			});
		}
		const displayName = uniqueNamesGenerator({
			dictionaries: [names, names],
			length: 2,
			separator: ' ',
			style: 'capital',
		});
		const updatedUser = await admin.auth().updateUser(req.authID, {
			displayName,
			photoURL: 'https://occtao.com/?qa=image&qa_blobid=10029442562307742919&qa_size=200',
		});

		await User.create({
			details: {
				id: req.authID,
				...updatedUser.providerData[0],
				phoneNumber: null,
			},
		});

		const user = await User.findOne(
			{
				'details.id': req.authID,
			},
			{
				__v: 0,
				createdAt: 0,
				updatedAt: 0,
				isAdmin: 0,
			}
		);

		return res.json({
			user: {
				...user._doc,
				siteAdmin: req.siteAdmin,
			},
		});
	} catch (e) {
		console.log(e);
		return res.status(400).json({
			msg: 'Invalid Credentials',
		});
	}
});

router.post('/google-register', verifyAuth, async (req, res) => {
	try {
		let existing_user = await User.findOne({
			'details.id': req.authID,
		});

		if (!existing_user) {
			existing_user = await User.create({
				details: {
					id: req.authID,
					...req.body.user,
					phoneNumber: null,
				},
			});
		}
		return res.json({
			user: {
				...existing_user._doc,
				siteAdmin: req.siteAdmin,
			},
		});
	} catch (e) {
		console.log(e);
		return res.status(400).json({
			msg: 'Invalid Credentials',
		});
	}
});

router.get('/login', verifyAuth, async (req, res) => {
	try {
		let user = await User.findOne(
			{
				'details.id': req.authID,
			},
			{
				__v: 0,
				createdAt: 0,
				updatedAt: 0,
				isAdmin: 0,
			}
		)
			.populate({ path: 'cart.product', select: 'stock dish photoURL price restaurant' })
			.exec();
		user = {
			...user._doc,
			cart: user.cart.map((item) => {
				return {
					...item.product._doc,
					quantity: item.quantity,
				};
			}),
		};
		return res.json({
			user: {
				...user,
				siteAdmin: req.siteAdmin,
			},
		});
	} catch (e) {
		console.log(e);
		return res.status(400).json({
			msg: 'Invalid Credentials',
		});
	}
});

router.post('/update-profile-details', verifyAuth, async (req, res) => {
	try {
		let { displayName, phoneNumber, photoURL } = req.body;
		if (photoURL) {
			await admin.auth().updateUser(req.authID, {
				photoURL,
			});
			await User.updateOne(
				{
					'details.id': req.authID,
				},
				{
					$set: {
						'details.photoURL': photoURL,
					},
				}
			);
			return res.status(200).json({
				msg: 'Profile Photo Updated Succesfully',
			});
		}
		if (displayName) {
			let words = displayName.split(' ');
			words.forEach((word) => {
				if (word.trim().length !== 0 && !validator.isAlpha(word)) {
					return res.status(400).json({
						msg: 'Display Name is not valid',
					});
				}
			});
		}
		if (phoneNumber && !validator.isMobilePhone(phoneNumber)) {
			return res.status(400).json({
				msg: 'Phone Number is not valid',
			});
		}
		if (phoneNumber && displayName) {
			await admin.auth().updateUser(req.authID, {
				displayName,
			});
			await User.updateOne(
				{
					'details.id': req.authID,
				},
				{
					$set: {
						'details.displayName': displayName,
						'details.phoneNumber': phoneNumber,
					},
				}
			);
		} else if (displayName) {
			await User.updateOne(
				{
					'details.id': req.authID,
				},
				{
					$set: {
						'details.displayName': displayName,
					},
				}
			);
		} else if (phoneNumber) {
			await User.updateOne(
				{
					'details.id': req.authID,
				},
				{
					$set: {
						'details.phoneNumber': phoneNumber,
					},
				}
			);
		} else {
			return res.status(400).json({
				msg: 'No Data Provided',
			});
		}
		return res.status(200).json({
			msg: 'Profile Updated Succesfully',
		});
	} catch (e) {
		console.log(e);
		return res.status(400).json({
			msg: 'Invalid Credentials',
		});
	}
});

module.exports = router;
