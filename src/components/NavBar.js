import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ marginBottom: '20px' }}>
      <Link to="/">Home</Link> | 
      <Link to="/cart">Cart</Link> | 
      <Link to="/profile">Profile</Link> | 
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Navbar;
