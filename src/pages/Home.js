import React, { useEffect, useState } from 'react';
import { getProducts, addToCart } from '../api/api';

function Home() {
  const [products, setProducts] = useState([]);
  const userId = 1; // demo

  useEffect(() => {
    getProducts().then(res => setProducts(res.data));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(userId, { ...product, qty: 1 })
      .then(() => alert('Added to cart'))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - ${p.price}
            <button onClick={() => handleAddToCart(p)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
