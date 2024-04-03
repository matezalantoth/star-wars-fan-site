import { useEffect, useState } from 'react';

export const SignupForm = () => {
  const [newUserData, setNewUserData] = useState({});
  const [submittable, setSubmittable] = useState(false);
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
              alert('signup successful');
            }
          });
        }}
        disabled={!submittable}
      >
        Sign up
      </button>
    </form>
  );
};
