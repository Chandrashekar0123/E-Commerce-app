import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAdd }) {
  const stars = Math.round((product.rating || 0) * 2) / 2;
  const starElements = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(stars)) starElements.push('★');
    else if (i - 0.5 === stars) starElements.push('☆');
    else starElements.push('☆');
  }

  return (
    <div className="product-card">
      <div className="product-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <img src={`https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name || 'No Image')}`} alt="placeholder" />
        )}
      </div>
      <div className="product-body">
        <h3><Link to={`/products/${product._id}`}>{product.name}</Link></h3>
        <p className="desc">{product.description}</p>
        <div className="meta">
          <div className="left-meta">
            <div className="price">${product.price.toFixed(2)}</div>
            <div className="rating">{starElements.join(' ')} <span className="rating-num">{product.rating?.toFixed(1)}</span></div>
          </div>
          <div className="right-meta">
            {product.prime && <span className="prime">Prime</span>}
            <button
              className="add-btn"
              onClick={() => onAdd(product._id)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
