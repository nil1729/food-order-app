const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
	{
		dish: {
			type: String,
			required: true,
		},
		restaurant: {
			type: String,
			required: true,
		},
		photoURL: {
			type: String,
			required: true,
		},
		description: {
			type: String,
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
