import React, { useContext, useState } from "react";
import { AppContext } from "../context";

const Login = ({ navigate }) => {
  const { setUser } = useContext(AppContext);
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    if (email) {
      setUser({ email });
      navigate("products");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
