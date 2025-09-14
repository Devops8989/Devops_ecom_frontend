import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./app";
import Login from "./components/Login";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Payment from "./components/Payment";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Products />} />
        
        <Route path="login" element={<Login />} />
        <Route path="cart" element={<Cart />} />
        <Route path="payment" element={<Payment />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
