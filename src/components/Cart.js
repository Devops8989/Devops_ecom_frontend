import React, { useContext } from "react";
import { AppContext } from "../context";

const Cart = ({ navigate }) => {
  const { cart } = useContext(AppContext);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Empty cart</p>
      ) : (
        cart.map((item, index) => (
          <div key={index}>
            {item.name} - ₹{item.price}
          </div>
        ))
      )}
      <button onClick={() => navigate("payment")}>Proceed to Payment</button>
    </div>
  );
};

export default Cart;
