import React from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Cart from './pages/Cart'
import ProductDetail from './pages/ProductDetail'
import AddProduct from './pages/AddProduct'
import { CartProvider, useCart } from './context/CartContext'

function Header(){
  const { count } = useCart();
  const [search, setSearch] = React.useState('');
  const navigate = useNavigate();

  const doSearch = e => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(search)}`);
  };

  return (
    <header className="site-header">
      <h1>Mini E-Commerce</h1>
      <form className="search-bar" onSubmit={doSearch}>
        <input
          placeholder="Search..."
          value={search}
          onChange={e=>setSearch(e.target.value)}
        />
      </form>
      <nav>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart <span className="cart-count">{count}</span></Link>
        <Link to="/add-product">Add Product</Link>
      </nav>
    </header>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Navigate replace to="/products" />} />
            <Route path="/products" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  )
}
