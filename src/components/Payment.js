import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import API from "../api";

export default function Payment(){
  const { cart, setCart } = useOutletContext();
  const [msg, setMsg] = useState("");
  const pay = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")||"null");
      const res = await API.post("/orders", { items: cart, userId: user?._id });
      setMsg("Order placed: " + res.data._id);
      setCart([]);
    } catch (err) {
      setMsg(err.response?.data?.message || "Payment/order failed");
    }
  };
  return (
    <div>
      <h2>Payment (demo)</h2>
      <p>This is a demo — no real payment. Click to create an order in backend.</p>
      <button onClick={pay}>Pay & Place Order</button>
      <div>{msg}</div>
    </div>
  );
}
