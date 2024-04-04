/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const LoginForm = (props) => {
  const { cookies, setUserLoginCookies } = props;
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: null,
    password: null,
  });
  const showErrorToast = (message) => toast.error(message);
  const showSuccessToast = (message) => toast.success(message);

  if (cookies.user) {
    navigate('/profile');
  }

  const simplifyUserData = (data) => {
    data.favourites.characters = data.favourites.characters.map((char) => {
      return { _id: char._id };
    });
    data.favourites.films = data.favourites.films.map((char) => {
      return { _id: char._id };
    });
    data.favourites.spaceships = data.favourites.spaceships.map((char) => {
      return { _id: char._id };
    });
    data.favourites.vehicles = data.favourites.vehicles.map((char) => {
      return { _id: char._id };
    });
    data.favourites.planets = data.favourites.planets.map((char) => {
      return { _id: char._id };
    });
    return data;
  };

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
              showErrorToast(data.message);
            } else {
              const simplifiedData = simplifyUserData(data);
              setUserLoginCookies(simplifiedData);
              navigate('/profile');
              showSuccessToast('Successfully signed in!');
            }
          }}
        >
          Log-in
        </button>
      </form>
    </div>
  );
};
