const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1,
            }
        }
    ],
    details: {
        type: 'object',
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", UserSchema);