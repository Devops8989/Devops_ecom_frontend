// App.js
import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <div>
      {/* Simple Navbar */}
      <nav
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Link to="/">Products</Link>
        <Link to="/cart">Cart ({cart.length})</Link>
        <Link to="/payment">Payment</Link>
        <Link to="/login">Login</Link>
      </nav>

      {/* Pass cart + setCart to child pages */}
      <Outlet context={{ cart, setCart }} />
    </div>
  );
}
