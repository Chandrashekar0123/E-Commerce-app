import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }){
  const [count, setCount] = useState(0);

  const fetchCount = async () => {
    try{
      const res = await fetch('/api/cart');
      const items = await res.json();
      const totalQty = items.reduce((s,i)=>s + (i.quantity||0),0);
      setCount(totalQty);
    }catch(e){ setCount(0); }
  };

  useEffect(()=>{ fetchCount(); }, []);

  return (
    <CartContext.Provider value={{ count, refresh: fetchCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
