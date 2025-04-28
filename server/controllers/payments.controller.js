// Import Razorpay instance
const { createRazorpayInstance } = require("../config/razorpay.config");
const razorpayInstance = createRazorpayInstance();
require("dotenv").config();
const crypto = require("crypto");

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // in paisa
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    razorpayInstance.orders.create(options, (err, order) => {
      if (err) {
        console.error("Error in Razorpay Order:", err);
        return res.status(500).json({
          success: false,
          message: "Something went wrong while creating the order",
        });
      }

      return res.status(200).json({
        success: true,
        order,
      });
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Verify Payment
exports.verifyPayment = async (req, res) => {
  try {
    const { order_id, payment_id, signature } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(order_id + "|" + payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === signature) {
      return res.status(200).json({
        success: true,
        message: "Payment Verified Successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid signature. Payment not verified.",
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while verifying payment",
    });
  }
};
