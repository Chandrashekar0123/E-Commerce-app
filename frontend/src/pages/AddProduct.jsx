import React, { useState } from 'react';

export default function AddProduct() {
  const [form, setForm] = useState({
    name:'', description:'', price:'', category:'', stock:'', image:''
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const body = { ...form, price: Number(form.price), stock: Number(form.stock) };
      await fetch('/api/products', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      setMessage('Product added successfully');
      setForm({ name:'', description:'', price:'', category:'', stock:'', image:'' });
    } catch (err) {
      setMessage('Error adding product');
    }
  };

  return (
    <div className="add-product">
      <h2>Add Product</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="add-form">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
