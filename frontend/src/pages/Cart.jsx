import React, { useEffect, useState } from 'react';

export default function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    setLoading(true);
    const res = await fetch('/api/cart');
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchCart(); }, []);

  const updateQty = async (id, qty) => {
    if (qty < 1) return;
    await fetch(`/api/cart/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ quantity: qty }) });
    fetchCart();
  };

  const remove = async (id) => {
    await fetch(`/api/cart/${id}`, { method: 'DELETE' });
    fetchCart();
  };

  const placeOrder = () => {
    alert('Order placed (dummy)');
  };

  const total = items.reduce((s, it) => s + (it.totalPrice || 0), 0);

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {items.length === 0 ? <p>Cart is empty</p> : (
        <div>
          <ul className="cart-list">
            {items.map(it => (
              <li key={it._id} className="cart-item">
                <div className="cart-left">
                  {it.productId.image && <img src={it.productId.image} alt={it.productId.name} className="cart-img" />}
                  <div>
                    <strong>{it.productId.name}</strong>
                    <p>${(it.productId.price).toFixed(2)}</p>
                  </div>
                </div>
                <div className="cart-controls">
                  <button onClick={() => updateQty(it._id, it.quantity - 1)}>-</button>
                  <span>{it.quantity}</span>
                  <button onClick={() => updateQty(it._id, it.quantity + 1)}>+</button>
                </div>
                <div className="cart-right">
                  <p>${(it.totalPrice).toFixed(2)}</p>
                  <button className="remove" onClick={() => remove(it._id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-footer">
            <strong>Total: ${total.toFixed(2)}</strong>
            <button className="order" onClick={placeOrder}>Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
}
