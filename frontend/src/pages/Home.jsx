import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 6;
  const { refresh } = useCart();

  const fetchProducts = async (opts = {}) => {
    setLoading(true);
    const q = [];
    if (opts.search) q.push(`search=${encodeURIComponent(opts.search)}`);
    if (opts.category) q.push(`category=${encodeURIComponent(opts.category)}`);
    const url = `/api/products${q.length ? '?' + q.join('&') : ''}`;
    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

useEffect(() => {
    // parse query params
    const params = new URLSearchParams(location.search);
    const q = params.get('search') || '';
    const cat = params.get('category') || '';
    setSearch(q);
    setCategory(cat);
    fetchProducts({ search: q, category: cat });
  }, [location.search]);

  useEffect(() => {
    const cats = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
    setCategories(cats);
  }, [products]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    navigate(`/products?search=${encodeURIComponent(search)}${category ? `&category=${encodeURIComponent(category)}` : ''}`);
  };

  const handleAdd = async (productId) => {
    await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity: 1 })
    });
    await refresh();
    alert('Added to cart');
  };

  const filtered = products.filter(Boolean);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const visible = filtered.slice((page-1)*perPage, page*perPage);

  return (
    <div className="home-wrap">
      <div className="banner">
        <h2>Welcome to Our Store</h2>
      </div>

      <div className="top-controls">
        <form className="search" onSubmit={handleSearch}>
          <input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
          <button>Search</button>
        </form>
        <div className="categories">
          <button className={!category ? 'active' : ''} onClick={() => { navigate('/products'); setPage(1); }}>All</button>
          {categories.map(c => (
            <button key={c} className={category === c ? 'active' : ''} onClick={() => {
              const qs = search ? `?search=${encodeURIComponent(search)}&category=${encodeURIComponent(c)}` : `?category=${encodeURIComponent(c)}`;
              navigate(`/products${qs}`);
              setPage(1);
            }}>{c}</button>
          ))}
        </div>
      </div>

      <div className="main-content">
        {loading ? <p>Loading products...</p> : (
          visible.length === 0 ? <p>No Products Found</p> : (
            <div>
              <div className="grid">
                {visible.map(p => <ProductCard key={p._id} product={p} onAdd={handleAdd} />)}
              </div>
              <div className="pagination">
                <button disabled={page===1} onClick={()=>setPage(p=>p-1)}>Prev</button>
                <span>Page {page} / {totalPages}</span>
                <button disabled={page===totalPages} onClick={()=>setPage(p=>p+1)}>Next</button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
