/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import ReCAPTCHA from 'react-google-recaptcha';

export const SignupForm = (props) => {
  const { cookies, setUserLoginCookies } = props;
  const [newUserData, setNewUserData] = useState({});
  const [submittable, setSubmittable] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      newUserData.name &&
      newUserData.dob &&
      newUserData.email &&
      newUserData.password
    ) {
      setSubmittable(true);
    }
  }, [newUserData]);

  if (cookies.user) {
    navigate('/profile');
  }

  const handleSignup = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newUserData),
    });
    const data = await response.json();
    return data;
  };

  return (
    <form>
      <label>Name</label>
      <input
        onChange={(event) => {
          setNewUserData({ ...newUserData, name: event.target.value });
        }}
        type='text'
        required
      />
      <label>Date of Birth:</label>
      <input
        onChange={(event) => {
          setNewUserData({ ...newUserData, dob: event.target.value });
        }}
        type='date'
        required
      />
      <label>Email: </label>
      <input
        onChange={(event) => {
          setNewUserData({ ...newUserData, email: event.target.value });
        }}
        type='email'
        required
      />
      <label>Password: </label>
      <input
        onChange={(event) => {
          setNewUserData({ ...newUserData, password: event.target.value });
        }}
        type='password'
        required
      />
      <button
        onClick={(event) => {
          handleSignup(event).then((data) => {
            if (data.message) {
              alert(data.message);
            } else {
              console.log(data);
              setUserLoginCookies(true);
              navigate('/profile');
              alert('signup successful');
            }
          });
        }}
        disabled={!submittable}
      >
        Sign up
      </button>
      {/* <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} /> */}
    </form>
  );
};
