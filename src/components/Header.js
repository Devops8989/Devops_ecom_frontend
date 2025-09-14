import React from "react";
import { Link } from "react-router-dom";

export default function Header({ cartCount }) {
  return (
    <header style={{ display:"flex", gap:20, marginBottom:20 }}>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart ({cartCount})</Link>
      <Link to="/login">Login</Link>
    </header>
  );
}
