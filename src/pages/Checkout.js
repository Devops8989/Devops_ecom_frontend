import React, { useEffect, useState } from 'react';
import { getCart, placeOrder, makePayment } from '../api/api';

function Checkout() {
  const [cart, setCart] = useState([]);
  const userId = 1;

  useEffect(() => {
    getCart(userId).then(res => setCart(res.data));
  }, []);

  const handleCheckout = async () => {
    const order = await placeOrder({ userId, items: cart });
    const payment = await makePayment({ orderId: order.data.id, amount: cart.reduce((a,b)=>a+b.qty*100,0) });
    alert(`Payment ${payment.data.status} for order ${order.data.id}`);
  };

  return (
    <div>
      <h1>Checkout</h1>
      <ul>
        {cart.map((item, i) => <li key={i}>{item.name} x {item.qty}</li>)}
      </ul>
      <button onClick={handleCheckout}>Pay Now</button>
    </div>
  );
}

export default Checkout;
