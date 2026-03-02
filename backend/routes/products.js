const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// POST /api/products → Add product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/products → Get all products (with optional search & category)
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};
    if (search) {
      const re = new RegExp(search, 'i');
      query.$or = [{ name: re }, { description: re }, { category: re }];
    }
    if (category) {
      query.category = category;
    }
    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id → Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
