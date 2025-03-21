const express = require('express');
const auth = require('../middleware/auth');
const { getCartData, addToCart,removeFromCart } = require('../controllers/cartController');

const router = express.Router();

router.get('/', auth,getCartData);
router.post('/add', auth,addToCart);
router.post('/remove', auth,removeFromCart);

module.exports = router;