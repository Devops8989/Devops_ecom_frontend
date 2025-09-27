import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../api/api';

function Profile() {
  const [user, setUser] = useState({});
  const userId = 1; // demo

  useEffect(() => {
    getUserProfile(userId).then(res => setUser(res.data));
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default Profile;
