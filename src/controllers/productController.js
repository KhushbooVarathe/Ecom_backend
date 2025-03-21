
const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find({});
        const updatedProducts = products.map(product => ({
        ...product._doc,
        image: product.image ? `http://localhost:3000/uploads/${product.image}` : null
      }));
      res.status(200).json(updatedProducts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  


const addProduct = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : null;
        const { name, price, description, category } = req.body;

    if (!name || !price || !description || !category) {
      return res.status(400).json({ error: 'All fields are required!' });
    }
    const newProduct = new Product({
      name,
      price,
      description,
      category,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully!', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports={getAllProducts,addProduct}