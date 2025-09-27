import React, { useState } from 'react';
import { loginUser } from '../api/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    loginUser({ username, password })
      .then(res => alert(`Logged in! Token: ${res.data.token}`))
      .catch(err => alert('Login failed'));
  };

  return (
    <div>
      <h1>Login</h1>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
