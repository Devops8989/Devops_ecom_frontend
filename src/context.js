import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products] = useState([
    { id: 1, name: "T-Shirt", price: 20 },
    { id: 2, name: "Jeans", price: 40 },
    { id: 3, name: "Shoes", price: 60 },
  ]);

  return (
    <AppContext.Provider value={{ user, setUser, cart, setCart, products }}>
      {children}
    </AppContext.Provider>
  );
};
