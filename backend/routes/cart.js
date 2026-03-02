const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// POST /api/cart → Add product to cart
router.post('/', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    let item = await CartItem.findOne({ productId });
    if (item) {
      item.quantity += quantity;
      item.totalPrice = item.quantity * product.price;
      await item.save();
    } else {
      item = new CartItem({ productId, quantity, totalPrice: product.price * quantity });
      await item.save();
    }
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/cart → Get cart items
router.get('/', async (req, res) => {
  try {
    const items = await CartItem.find().populate('productId');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/cart/:id → Remove item
router.delete('/:id', async (req, res) => {
  try {
    const removed = await CartItem.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Cart item not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/cart/:id → Update quantity
router.put('/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    const item = await CartItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Cart item not found' });
    const product = await Product.findById(item.productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    item.quantity = quantity;
    item.totalPrice = product.price * quantity;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
