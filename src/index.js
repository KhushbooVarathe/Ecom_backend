const express = require('express');
require('dotenv').config();
require('./db_config/db.js')
const cors = require('cors');
const connectDatabase = require('./db_config/db.js'); // Import database connection

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

const app = express();
connectDatabase();


app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(express.json());



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});