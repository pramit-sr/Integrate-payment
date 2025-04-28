const express = require('express');
const cors = require('cors');
const paymentRoutes = require('./routes/payments.routes');  // ✅ Correct require path
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/payment', paymentRoutes);

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
