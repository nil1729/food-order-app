const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
	{
		model: {
			type: String,
			required: true,
		},
		brand: {
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
