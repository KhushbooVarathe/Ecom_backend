const express = require('express');
const multer = require('multer');
const { addProduct, getAllProducts } = require('../controllers/productController');
const auth = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});

const upload = multer({ storage });

// Routes
router.get('/',auth, getAllProducts);
router.post('/add-product',auth, addProduct); 

module.exports = router;
