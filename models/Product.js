const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
	{
		dish: {
			type: String,
			text: true,
			required: true,
		},
		restaurant: {
			type: String,
			text: true,
			required: true,
		},
		photoURL: {
			type: String,
			text: true,
			required: true,
		},
		description: {
			type: String,
			text: true,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		stock: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
			text: true,
			required: true,
		},
		reviews: [
			{
				customer: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User'
				},
				comment: String,
				stars: Number,
				commentedAt: {
					type: Date,
					required: true,
				}
			}
		],
		averageRating: {
			type: Object,
			default: 0
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
