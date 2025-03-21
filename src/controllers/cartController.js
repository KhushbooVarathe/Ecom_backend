const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const getCartData = async (req, res) => {
  try {
      const { _id } = req.user;
      console.log('userId: ', _id);

      const cart = await Cart.findOne({ userId: _id }).populate('items.productId');
      console.log('cart: ', cart);

      if (!cart) {
          return res.json({ items: [], totalCount: 0 });
      }
      const totalCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
      console.log('totalCount: ', totalCount);
      res.json({ cart, totalCount });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const objectIdProductId = new mongoose.Types.ObjectId(productId);

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId: objectIdProductId, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId.toString()
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId: objectIdProductId, quantity });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!existingItem) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1;
    } else {
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
      );
    }

    if (cart.items.length === 0) {
      await Cart.deleteOne({ _id: cart._id });
      return res.json({ message: "Cart deleted successfully" });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  module.exports={getCartData,addToCart,removeFromCart}