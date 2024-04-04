/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from 'react';
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

  const user = cookies.user;

  const showSuccessToast = (message) => toast.success(message);
  const showErrorToast = (message) => toast.error(message);

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

  const handleRemoveFromFavourites = (fav) => {
    let url = selectedFavourites.array;
    if (selectedFavourites.array === 'people') {
      url = 'characters';
    }
    fetch(`/api/user/${cookies.user._id}/favourites/${url}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(fav),
    }).then((response) => {
      if (response.status === 204) {
        showSuccessToast('Successfully deleted');
        cookies.user.favourites[url] = cookies.user.favourites[url].filter(
          (char) => {
            return char._id !== fav._id;
          },
        );
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

  const characterElem = (fav) => {
    return (
      <>
        {fav.name}
        <br />
        <hr />
        <p className=' text-xs pt-1 pb-1'>
          {fav.gender.slice(0, 1).toUpperCase() + fav.gender.slice(1)}
          <br />
          {fav.height}cm tall
          <br /> Born on {fav.homeworld} in the year <br />
          {fav.birth_year}
          <br />
        </p>
        <hr />
        <span className=' text-xs pt-1 pb-1'>
          Appeared in:{' '}
          {fav.films.map((film, i) => {
            return <p key={i}>{film}</p>;
          })}
        </span>
        <hr />
      </>
    );
  };

  const filmElem = (fav) => {
    console.log(fav);
    return (
      <>
        {fav.title}
        <br />
        <hr />
        <p className=' text-xs pt-1 pb-1'>
          Director: {fav.director}
          <br />
          Producer: {fav.producer}
          <br />
          Released on {fav.release_date.split('-').join(' ')}
        </p>
        <hr />
        <span className={'flex flex-col  text-xs pt-1 pb-1 text-nowrap'}>
          {fav.opening_crawl.split('\n').map((line, index) => (
            <span key={index}>{line}</span>
          ))}
        </span>
        <hr />
      </>
    );
  };

  return (
    <div>
      {!editActive ? (
        <div className='mt-3 ml-6'>
          <h1>{user.name}</h1>
          <h1>{user.email.slice(0, 2) + '...@' + user.email.split('@')[1]}</h1>
          <button onClick={handleEditPrompt}>Edit details</button>
        </div>
      ) : (
        <form className='w-80 max-w-screen-lg sm:w-96 m-auto text-black'>
          <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Name:
          </label>
          <br />
          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
            onChange={(event) => {
              setUserChanges({ ...userChanges, name: event.target.value });
            }}
            type='text'
            placeholder={user.name}
            required
          />
          <br />
          <label className='block -mb-4 text-sm font-medium text-gray-900 dark:text-white'>
            Date Of Birth:{' '}
          </label>
          <br />
          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
            onChange={(event) => {
              setUserChanges({ ...userChanges, date: event.target.value });
            }}
            type='date'
            placeholder={user.dob}
            required
          />
          <br />
          <label className='block -mb-4 text-sm font-medium text-gray-900 dark:text-white'>
            Email:{' '}
          </label>
          <br />
          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
            onChange={(event) => {
              setUserChanges({ ...userChanges, email: event.target.value });
            }}
            type='email'
            placeholder={user.email}
            required
          />
          <br />
          <label className='block text-sm -mb-4 font-medium text-gray-900 dark:text-white'>
            Password:{' '}
          </label>
          <br />
          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
            onChange={(event) => {
              setUserChanges({ ...userChanges, password: event.target.value });
            }}
            type='password'
            required
          />
          <br />
          <button
            className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            onClick={async (event) => {
              event.preventDefault();
              const data = await updateUser();
              if (data.message) {
                showErrorToast(data.message);
              } else {
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className='ml-6'>
        Favourite{' '}
        <select
          onChange={handleSelect}
          name='favourites'
          defaultValue={'selectAFilter'}
          className='text-black rounded-md'
        >
          <option value='selectAFilter'>select an option</option>
          <option value='films'>film(s)</option>
          <option value='people'>character(s)</option>
        </select>
        <br />
        {selectedFavourites.selected ? (
          <div
            className={
              (selectedFavourites.array === 'people'
                ? 'ml-18 mt-4'
                : ' ml-36 mt-4') + ' flex flex-wrap'
            }
          >
            {selectedFavourites.data.map((fav) => {
              return (
                <div key={fav._id} className='group [perspective:1000px]'>
                  <div className='relative items-center m-2 text-center shadow-lg transition-all duration-1000 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]'>
                    <div className='animate-border rounded-md bg-white bg-gradient-to-r from-blue-400 to-green-700 bg-[length:400%_400%] p-1'>
                      {' '}
                      <div className='rounded-md bg-slate-900 px-5 py-3 shadow-lg font-bold text-white text-nowrap text-center'>
                        <img
                          className={
                            (selectedFavourites.array === 'people'
                              ? 'w-48 h-60'
                              : ' h-128 w-80') + ' object-contain'
                          }
                          src={`src/assets/${selectedFavourites.array}/${
                            fav.url
                              ? fav.url.split('/')[
                                  fav.url.split('/').length - 2
                                ]
                              : fav.episode_id
                          }.jpg`}
                        ></img>
                        <span className='relative top-2'>
                          {fav.name ? fav.name : fav.title}
                        </span>
                      </div>
                    </div>
                    <div className='absolute inset-0 h-full w-full rounded-xl shadow-lg bg-black text-center text-white [transform:rotateY(180deg)] [backface-visibility:hidden]'>
                      <div className='h-full w-full animate-border rounded-md bg-white bg-gradient-to-r from-blue-400 to-green-700 bg-[length:400%_400%] p-1'>
                        <div className='h-full w-full rounded-md shadow-lg bg-slate-900 px-5 py-3 font-bold text-white text-nowrap text-center'>
                          <span className='relative top-2'>
                            {selectedFavourites.array === 'people'
                              ? characterElem(fav)
                              : filmElem(fav)}
                            <button
                              className={
                                (selectedFavourites.array === 'people'
                                  ? 'fixed bottom-3 left-20 ml-7'
                                  : 'fixed bottom-5 left-36 ml-7') +
                                ' hover:bg-red-600 rounded-2xl w-7 h-7 ease-in duration-200'
                              }
                              onClick={(event) => {
                                handleRemoveFromFavourites(fav);
                                event.target.parentElement.parentElement.parentElement.parentElement.parentElement.hidden = true;
                              }}
                            >
                              -
                            </button>
                          </span>
                        </div>
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
