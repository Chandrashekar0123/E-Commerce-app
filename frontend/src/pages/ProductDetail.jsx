import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(r => r.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const addToCart = async () => {
    await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: id, quantity: 1 })
    });
    alert('Added to cart');
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)}>← Back</button>
      <div className="detail-main">
        {product.image && <img className="detail-img" src={product.image} alt={product.name} />}
        <div className="detail-info">
          <h2>{product.name}</h2>
          {product.prime && <span className="prime">Prime</span>}
          <div className="rating">
            {'★'.repeat(Math.floor(product.rating||0))}{'☆'.repeat(5-Math.floor(product.rating||0))}
            <span className="rating-num">{(product.rating||0).toFixed(1)}</span>
          </div>
          <p>{product.description}</p>
          <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
          <p><strong>Category:</strong> {product.category || '—'}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <button className="add-btn" onClick={addToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
