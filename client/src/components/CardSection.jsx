import React from 'react';
import axios from 'axios'; // 
import Card from './Card';

function CardSection() {
  const products = [
    { id: 1, title: 'Product 1', price: 499 },
    { id: 2, title: 'Product 2', price: 799 },
    { id: 3, title: 'Product 3', price: 999 },
    { id: 4, title: 'Product 4', price: 1299 },
    { id: 5, title: 'Product 5', price: 1599 },
    { id: 6, title: 'Product 6', price: 1999 },
    { id: 7, title: 'Product 7', price: 2299 },
    { id: 8, title: 'Product 8', price: 2599 },
  ];

  const loadRazorpayScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  React.useEffect(() => {
    loadRazorpayScript();
  }, []);

  const handleBuy = async (product) => {
    try {
      // 1. Create order on backend
      const { data } = await axios.post('https://payment-lnvf.onrender.com/api/payment/createOrder', {
        amount: product.price * 100, // Razorpay expects paise
        currency: "INR",
        receipt: `receipt_order_${product.id}`,
      });

      const { order } = data;

      // 2. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Your Store Name",
        description: product.title,
        order_id: order.id,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

          try {
            const verifyRes = await axios.post('https://payment-lnvf.onrender.com/api/payment/verifyPayment', {
              payment_id: razorpay_payment_id,
              order_id: razorpay_order_id,
              signature: razorpay_signature,
            });

            if (verifyRes.data.success) {
              alert(`Payment for ${product.title} successful and verified ✅`);
            } else {
              alert(`Payment for ${product.title} failed to verify ❌`);
            }
          } catch (error) {
            console.error("Verification error", error);
            alert(`Payment verification error ❌`);
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();

    } catch (error) {
      console.error("Payment initiation error", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <section id="cards" className="py-12 px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <Card 
          key={product.id} 
          title={product.title} 
          price={product.price} 
          onBuy={() => handleBuy(product)}
        />
      ))}
    </section>
  );
}

export default CardSection;
