const express = require("express");
const router = express.Router();
const verifyAuth = require("../middleware/auth");
const payPalClient = require('../config/paypal');
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');



// Routes
router.get('/checkout', verifyAuth, async (req, res) => {
    try {

        const customer = await User.findOne({
            'details.id': req.authID
        }, {
            __v: 0,
            createdAt: 0,
            updatedAt: 0
        }).populate({path: 'cart.product', select: 'price'}).exec();

        let total = 0;
        if (customer) {
            let cartItems = [];
            customer.cart.forEach(item => {
                total += (item.product.price * item.quantity);
                cartItems.push({
                    product: item.product._id,
                    quantity: item.quantity
                });
            });

            total += (total * 0.05);

            let order = await Order.findOne({
                "customer.authID": req.authID
            });

            if (!order || (order && order.isPurchased)) {
                order = await Order.create({
                    customer: {
                        authID: req.authID,
                        databaseID: customer._id
                    },
                    products: cartItems,
                    amount: parseFloat(total.toFixed(2)),
                });
            } else {
                await Order.updateOne({
                    _id: order._id
                }, {
                    $set: {
                        products: cartItems,
                        amount: parseFloat(total.toFixed(2))
                    }
                });
            }

            return res.json({
                description: `Phone Store Products--${req.authID}--${order._id}`,
                amount: {
                    currency_code: 'INR',
                    value: parseFloat(total.toFixed(2))
                },
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            msg: "Server Error",
        });
    }
});



// Verify the Order
router.post('/checkout/verify-order', verifyAuth, async (req, res) => {
    try {
        const {
            orderID,
            orderStaticID,
            shippingAddress
        } = req.body;

        const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderID);

        request.requestBody({});

        const captureDoc = await payPalClient.client().execute(request);

        const capture = captureDoc.result;

        if (capture.status === 'COMPLETED') {
            await Order.updateOne({
                _id: orderStaticID
            }, {
                $set: {
                    isPurchased: true,
                    transactionTime: new Date(),
                    orderID: capture.id,
                    captureID: capture.purchase_units[0].payments.captures[0].id,
                    shippingAddress: shippingAddress,
                }
            });

            const order = await Order.findOne({
                _id: orderStaticID
            }, {
                customer: 0,
                captureID: 0,
                createdAt: 0,
                __v: 0
            }).populate('products.product').exec();

            order.products.forEach(async item => {
                await Product.updateOne({_id: item.product._id}, {$set: {stock: item.product.stock - item.quantity }});
            });

            return res.status(200).json({
                msg: 'Order Succesfully Created',
                orderDetails: order
            });
        }
        return res.status(400).json({
            msg: 'Invalid Request or Data you are requesting is not valid',
        });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode).json({
            error: JSON.parse(err.message)
        });
    }
});


// View Order Details
router.get('/user/orders', verifyAuth, async (req, res) => {
    try {
        const orders = await Order.find({
            "customer.authID": req.authID,
            isPurchased: true
        }, {
            captureID: 0,
            customer: 0,
            createdAt: 0,
            __v: 0
        }).sort({
            updatedAt: -1
        }).populate({
            path: 'products.product',
            select: '-description -createdAt -updatedAt -__v'
        }).populate({
            path: 'user',
            select: '-description -createdAt -updatedAt -__v'
        }).exec();
        return res.json({
            orders,
        });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode).json({
            error: JSON.parse(err.message)
        });
    }
});


// Admin Orders
router.get('/admin/orders', verifyAuth, async (req, res) => {
    try {
        if (!req.siteAdmin) {
            return res.status(403).json({
                msg: 'Unauthorized Access',
            });
        }

        const orders = await Order.find({
            isPurchased: true
        }, {
            __v: 0,
            createdAt: 0,
            "customer.authID": 0
        }).sort({
            updatedAt: -1
        }).populate({
            path: 'products.product',
            select: '-description -createdAt -updatedAt -__v'
        }).populate({
            path: 'customer.databaseID',
            select: 'details -_id'
        }).exec();

        return res.json({
            orders,
        });

    } catch (err) {
        console.log(err);
        return res.status(err.statusCode).json({
            error: JSON.parse(err.message)
        });
    }
});


// Update Delivery Status 
router.post('/admin/orders/update', verifyAuth, async (req, res) => {
    try {
        if (!req.siteAdmin) {
            return res.status(403).json({
                msg: 'Unauthorized Access',
            });
        }

        const orderDeliveryCheck = await Order.findOne({
            _id: req.body.orderStaticID
        }, {
            isDelivered: 1
        });

        if (orderDeliveryCheck.isDelivered) {
            return res.status(400).json({
                msg: 'Order already delivered to customer'
            });
        }


        await Order.updateOne({
            _id: req.body.orderStaticID,
        }, {
            $set: {
                isDelivered: true
            }
        });

        const order = await Order.findOne({
            _id: req.body.orderStaticID
        }, {
            updatedAt: 1,
            isDelivered: 1
        });

        return res.json({
            order,
            msg: 'Order updated Successfully'
        });

    } catch (err) {
        console.log(err);
        return res.status(err.statusCode).json({
            error: JSON.parse(err.message)
        });
    }
});



module.exports = router;