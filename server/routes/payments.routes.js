const express = require('express');
const { createOrder, verifyPayment } = require('../controllers/payments.controller.js');

const router = express.Router();

// Route to create Razorpay order
router.post('/createOrder', createOrder);

// Route to verify payment
router.post('/verifyPayment', verifyPayment);

module.exports = router;
