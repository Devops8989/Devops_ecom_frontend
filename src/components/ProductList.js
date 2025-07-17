import React, { useContext } from "react";
import { AppContext } from "../context";

const ProductList = ({ navigate }) => {
  const { products, cart, setCart } = useContext(AppContext);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div>
      <h2>Products</h2>
      {products.map((p) => (
        <div key={p.id}>
          {p.name} - ₹{p.price}
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}
      <button onClick={() => navigate("cart")}>Go to Cart</button>
    </div>
  );
};

export default ProductList;
