/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

export const ProfilePage = (props) => {
  const { cookies, setUserLoginCookies } = props;
  const [editActive, setEditActive] = useState(false);
  const [userChanges, setUserChanges] = useState(cookies.user);
  const navigate = useNavigate();
  const showSuccessToast = (message) => toast.success(message);
  const showErrorToast = (message) => toast.error(message);

  if (!cookies.user) {
    navigate('/login');
  }

  console.log(cookies);
  const user = cookies.user;

  const handleEditPrompt = () => {
    const password = prompt(
      'please enter your password to edit your details...',
    );
    if (user.password === password) {
      setEditActive(true);
    } else {
      alert('Incorrect password please try again');
      handleEditPrompt();
    }
  };

  const updateUser = async () => {
    const response = await fetch(`/api/user/${user._id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userChanges),
    });
    const data = await response.json();
    return data;
  };

  return (
    <>
      {!editActive ? (
        <div>
          <h1>{user.name}</h1>
          <h1>{user.email.slice(0, 2) + '...@' + user.email.split('@')[1]}</h1>
          <button onClick={handleEditPrompt}>Edit details</button>
        </div>
      ) : (
        <form>
          <label>Name:</label>
          <input
            onChange={(event) => {
              setUserChanges({ ...userChanges, name: event.target.value });
            }}
            type='text'
            placeholder={user.name}
            required
          />
          <label>Date Of Birth: </label>
          <input
            onChange={(event) => {
              setUserChanges({ ...userChanges, date: event.target.value });
            }}
            type='date'
            placeholder={user.dob}
            required
          />
          <label>Email: </label>
          <input
            onChange={(event) => {
              setUserChanges({ ...userChanges, email: event.target.value });
            }}
            type='email'
            placeholder={user.email}
            required
          />
          <label>Password: </label>
          <input
            onChange={(event) => {
              setUserChanges({ ...userChanges, password: event.target.value });
            }}
            type='password'
            required
          />
          <button
            onClick={async (event) => {
              event.preventDefault();
              const data = await updateUser();
              if (data.message) {
                showErrorToast(data.message);
              } else {
                console.log('hi');
                showSuccessToast('Changes saved!');
                setEditActive(false);
                setUserLoginCookies(userChanges);
              }
            }}
          >
            Submit changes
          </button>
        </form>
      )}
      <Toaster />
    </>
  );
};
