import { useState } from 'react';
import { Link } from 'react-router-dom';

export const LoginForm = () => {
  const [userDetails, setUserDetails] = useState({
    email: null,
    password: null,
  });

  const handleLogin = async () => {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    });
    const data = await response.json();
    return data;
  };

  return (
    <div>
      <form>
        <label>Email:</label>
        <input
          onChange={(event) => {
            setUserDetails({ ...userDetails, email: event.target.value });
          }}
          type='email'
        />
        <label>Password:</label>
        <input
          onChange={(event) => {
            setUserDetails({ ...userDetails, password: event.target.value });
          }}
          type='password'
        />
        <></>
        <p>if you do not have an account </p>
        <Link to='/signup'>create one!</Link>
        <button
          onClick={async (event) => {
            event.preventDefault();
            const data = await handleLogin();
            if (data.message) {
              alert(data.message);
            }
          }}
        >
          Log-in
        </button>
      </form>
    </div>
  );
};
