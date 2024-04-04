/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const ProfilePage = (props) => {
  const { cookies, setUserLoginCookies } = props;
  const [editActive, setEditActive] = useState(false);
  const [userChanges, setUserChanges] = useState(cookies.user);
  const [selectedFavourites, setSelectedFavourites] = useState({
    selected: false,
    array: null,
    data: null,
  });
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

  const handleSelect = (event) => {
    let selectedArr = event.target.value;
    if (selectedArr === 'people') {
      selectedArr = 'characters';
    }
    if (selectedArr !== 'selectAFilter') {
      fetch(`/api/user/${cookies.user._id}/favourites/${selectedArr}`).then(
        (response) => {
          response.json().then((data) => {
            setSelectedFavourites({
              selected: true,
              array: event.target.value,
              data: data,
            });
          });
        },
      );
    } else {
      setSelectedFavourites({
        selected: false,
        array: null,
        data: null,
      });
    }
  };

  const handleRemoveCharacterToFavourites = (fav) => {
    fetch(
      `/api/user/${cookies.user._id}/favourites/${selectedFavourites.array}`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(fav),
      },
    ).then((response) => {
      if (response.status === 204) {
        showSuccessToast('Successfully deleted');
        cookies.user.favourites[selectedFavourites.array] =
          cookies.user.favourites[selectedFavourites.array].filter((char) => {
            return char._id !== fav._id;
          });
        setUserLoginCookies(cookies.user);
      } else {
        showErrorToast('Something went wrong');
      }
    });
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
      <div>
        <hr />
        Favourite{' '}
        <select
          onChange={handleSelect}
          name='favourites'
          defaultValue={'selectAFilter'}
        >
          <option value='selectAFilter'>select an option</option>
          <option value='films'>film(s)</option>
          <option value='people'>character(s)</option>
          <option value='planets'>planet(s)</option>
          <option value='spaceships'>spaceship(s)</option>
          <option value='vehicles'>vehicle(s)</option>
        </select>
        {selectedFavourites.selected ? (
          <ul>
            {selectedFavourites.data.map((fav) => {
              return (
                <li key={fav._id} className=''>
                  {' '}
                  <img
                    className='w-24 h-36 object-contain'
                    src={`src/assets/${selectedFavourites.array}/${
                      fav.url
                        ? fav.url.split('/')[fav.url.split('/').length - 2]
                        : fav.episode_id
                    }.jpg`}
                  ></img>
                  {fav.name ? fav.name : fav.title}
                  {
                    <button
                      onClick={(event) => {
                        handleRemoveCharacterToFavourites(fav);
                        event.target.parentElement.hidden = true;
                      }}
                    >
                      Remove from favourites
                    </button>
                  }
                </li>
              );
            })}
          </ul>
        ) : (
          ''
        )}
      </div>
    </>
  );
};
