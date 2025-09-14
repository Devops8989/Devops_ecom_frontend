import React from "react";
import { useOutletContext, Link } from "react-router-dom";

export default function Cart(){
  const { cart, setCart } = useOutletContext();
  const total = cart.reduce((s,p)=> s + (p.price||0), 0);
  const remove = idx => setCart(cart.filter((_,i)=>i!==idx));
  return (
    <div>
      <h2>Cart</h2>
      {cart.length===0 ? <div>No items</div> : (
        <div>
          {cart.map((c,i)=>(
            <div key={i} style={{display:"flex", justifyContent:"space-between"}}>
              <div>{c.name} - ₹{c.price}</div>
              <button onClick={()=>remove(i)}>Remove</button>
            </div>
          ))}
          <h3>Total: ₹{total}</h3>
          <Link to="/payment"><button>Proceed to Payment</button></Link>
        </div>
      )}
    </div>
  );
}
