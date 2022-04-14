const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema(
	{
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product',
				},
				quantity: {
					type: Number,
				},
			},
		],
		customer: {
			authID: {
				type: String,
				required: true,
			},
			databaseID: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: 'User',
			},
		},
		isPurchased: {
			type: Boolean,
			required: true,
			default: false,
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false,
		},
		shippingAddress: {
			type: 'object',
		},
		amount: {
			type: Number,
			required: true,
		},
		orderID: {
			type: String,
		},
		paymentID: {
			type: String,
		},
		paymentSignature: {
			type: String,
		},
		transactionTime: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Order', OrderSchema);
