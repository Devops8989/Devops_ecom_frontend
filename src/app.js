import React, { useState, useContext } from "react";
import { AppProvider, AppContext } from "./context";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Payment from "./components/Payment";

const AppRoutes = () => {
  const { user } = useContext(AppContext);
  const [page, setPage] = useState(user ? "products" : "login");

  const navigate = (pageName) => setPage(pageName);

  if (!user) return <Login navigate={navigate} />;
  if (page === "products") return <ProductList navigate={navigate} />;
  if (page === "cart") return <Cart navigate={navigate} />;
  if (page === "payment") return <Payment />;
};

const App = () => (
  <AppProvider>
    <AppRoutes />
  </AppProvider>
);

export default App;
