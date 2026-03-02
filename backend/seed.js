const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mini_ecom';

const products = [
  { name: 'Red T-Shirt', description: 'Comfortable cotton tee', price: 19.99, category: 'Clothing', stock: 50, image: 'https://images.unsplash.com/photo-1520975912970-2c8b0d6f0b61?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=1', rating:4.2, prime: true },
  { name: 'Blue Jeans', description: 'Stylish denim with classic fit', price: 49.99, category: 'Clothing', stock: 30, image: 'https://images.unsplash.com/photo-1585386959984-a415522f7e30?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=2', rating:4.5, prime: false },
  { name: 'Wireless Mouse', description: 'Ergonomic wireless mouse', price: 25.5, category: 'Electronics', stock: 20, image: 'https://images.unsplash.com/photo-1587825140708-6a0b6b5e0e3b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3', rating:4.1, prime: true },
  { name: 'Red T-Shirt', description: 'Comfortable cotton tee', price: 19.99, category: 'Clothing', stock: 50, image: 'https://picsum.photos/seed/tshirt/400/300' },
  { name: 'Blue Jeans', description: 'Stylish denim', price: 49.99, category: 'Clothing', stock: 30, image: 'https://picsum.photos/seed/jeans/400/300' },
  { name: 'Wireless Mouse', description: 'Ergonomic mouse with long battery life', price: 25.5, category: 'Electronics', stock: 20, image: 'https://picsum.photos/seed/mouse/400/300' },
  { name: 'Mechanical Keyboard', description: 'Tactile mechanical keyboard', price: 89.99, category: 'Electronics', stock: 15, image: 'https://picsum.photos/seed/keyboard/400/300' },
  { name: 'Running Shoes', description: 'Lightweight running shoes', price: 69.99, category: 'Footwear', stock: 40, image: 'https://picsum.photos/seed/shoes/400/300' },
  { name: 'Coffee Mug', description: 'Ceramic mug 350ml', price: 9.99, category: 'Home', stock: 120, image: 'https://picsum.photos/seed/mug/400/300' },
  { name: 'Bluetooth Speaker', description: 'Portable speaker with great sound', price: 39.99, category: 'Electronics', stock: 25, image: 'https://picsum.photos/seed/speaker/400/300' },
  { name: 'Backpack', description: 'Durable backpack for everyday use', price: 45.0, category: 'Accessories', stock: 60, image: 'https://picsum.photos/seed/backpack/400/300' },
  { name: 'Sunglasses', description: 'UV-protection sunglasses', price: 29.5, category: 'Accessories', stock: 80, image: 'https://picsum.photos/seed/sunglasses/400/300' },
  { name: 'Notebook', description: '100-page ruled notebook', price: 4.99, category: 'Stationery', stock: 200, image: 'https://picsum.photos/seed/notebook/400/300' }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Seeded products');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
