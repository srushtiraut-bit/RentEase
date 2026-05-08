const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add a product to cart
const addToCart = async (req, res) => {
  try {
    const { productId, months } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      // Cart exists — check if product already in cart
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        // Update months if product already exists
        existingItem.months = months;
      } else {
        // Add new item
        cart.items.push({ product: productId, months });
      }
    } else {
      // No cart yet — create a new one
      cart = new Cart({
        user: req.user._id,
        items: [{ product: productId, months }],
      });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all items in user's cart
const getCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove single item from cart
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== req.params.cartItemId
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Clear all items from user's cart
const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addToCart, getCartItems, removeFromCart, clearCart };