import React, { useEffect, useState } from 'react';
import { getCart } from '../api/api';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState([]);
  const userId = 1; // demo
  const navigate = useNavigate();

  useEffect(() => {
    getCart(userId).then(res => setCart(res.data));
  }, []);

  const handleCheckout = () => navigate('/checkout');

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.name} x {item.qty}</li>
        ))}
      </ul>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default Cart;
