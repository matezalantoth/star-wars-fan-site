/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
// import ReCAPTCHA from 'react-google-recaptcha';

export const SignupForm = (props) => {
  const { cookies, setUserLoginCookies } = props;
  const [newUserData, setNewUserData] = useState({});
  const [submittable, setSubmittable] = useState(false);
  const navigate = useNavigate();
  const showSuccessToast = (data) => toast.success(data.message);
  const showErrorToast = (data) => toast.error(data.message);
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
    <>
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
                showErrorToast(data);
              } else {
                showSuccessToast({ message: 'Succesfully created account!' });
                fetch('/api/users/login', {
                  method: 'POST',
                  headers: {
                    'Content-type': 'application/json',
                  },
                  body: JSON.stringify({
                    email: newUserData.email,
                    password: newUserData.password,
                  }),
                }).then((response) => {
                  response.json().then((data) => {
                    setUserLoginCookies(data);
                    navigate('/profile');
                  });
                });
              }
            });
          }}
          disabled={!submittable}
        >
          Sign up
        </button>
        {/* <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} /> */}
      </form>
    </>
  );
};
