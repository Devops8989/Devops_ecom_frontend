import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("password");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("user", JSON.stringify(res.data));
      setMsg("Login success");
      nav("/");
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <div><input value={email} onChange={e=>setEmail(e.target.value)} /></div>
      <div><input type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
      <button>Login</button>
      <div>{msg}</div>
    </form>
  );
}
