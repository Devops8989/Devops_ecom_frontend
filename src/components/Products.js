import React, { useEffect, useState } from "react";
import API from "../api";
import { useOutletContext } from "react-router-dom";

export default function Products(){
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useOutletContext();

  useEffect(()=> {
    API.get("/products").then(r=>setProducts(r.data)).catch(console.error);
  }, []);

  const add = p => setCart([...cart, p]);

  return (
    <div>
      <h2>Products</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)", gap:10}}>
      {products.map(p=>(
        <div key={p._id} style={{border:"1px solid #ddd", padding:10}}>
          <h3>{p.name}</h3>
          <div>₹{p.price}</div>
          <button onClick={()=>add(p)}>Add to cart</button>
        </div>
      ))}
      </div>
    </div>
  );
}
