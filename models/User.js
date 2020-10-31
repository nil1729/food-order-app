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
    isAdmin: {
        type: Boolean,
        default: false,
        required: true,
    },
    details: {
        type: 'object',
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", UserSchema);