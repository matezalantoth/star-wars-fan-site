/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

export const Characters = (props) => {
  const { cookies, setUserLoginCookies } = props;
  const [characters, setCharacters] = useState();
  const navigate = useNavigate();
  const showSuccessToast = (message) => toast.success(message);
  const showErrorToast = (message) => toast.error(message);

  useEffect(() => {
    const fetchMovieData = async () => {
      const httpResponse = await fetch('/api/characters');
      const response = await httpResponse.json();
      setCharacters(response);
    };
    fetchMovieData();
  }, []);

  const handleAddCharacterToFavourites = (character) => {
    fetch(`/api/user/${cookies.user._id}/favourites/characters`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(character),
    }).then((response) => {
      response.json().then((data) => {
        if (data.message) {
          showSuccessToast(data.message);
          setUserLoginCookies({
            ...cookies.user,
            characters: cookies.user.favourites.characters.push({
              _id: character._id,
            }),
          });
        } else if (data.errorMessage) {
          showErrorToast(data.errorMessage);
        }
      });
    });
  };

  const handleRemoveCharacterToFavourites = (character) => {
    fetch(`/api/user/${cookies.user._id}/favourites/characters`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(character),
    }).then((response) => {
      if (response.status === 204) {
        showSuccessToast('Successfully deleted');
        cookies.user.favourites.characters =
          cookies.user.favourites.characters.filter((char) => {
            return char._id !== character._id;
          });
        setUserLoginCookies(cookies.user);
      } else {
        showErrorToast('Something went wrong');
      }
    });
  };

  return characters ? (
    <div>
      <div className='relative md:ml-8 ml-16 left-3 mt-4 flex flex-wrap text-white  '>
        {characters.map((character) => {
          return (
            <div key={character._id}>
              <div className='relative h-70 items-center m-2 text-center text-white shadow-lg '>
                <div className='w-56 animate-border rounded-md bg-white bg-gradient-to-r from-blue-400 to-green-700 bg-[length:400%_400%] p-1'>
                  {' '}
                  <div className='rounded-md bg-slate-900 px-5 py-3 shadow-lg font-bold text-white text-nowrap text-center'>
                    <img
                      className=' w-48 h-60 object-contain'
                      src={`src/assets/people/${
                        character.url.split('/')[
                          character.url.split('/').length - 2
                        ]
                      }.jpg`}
                    ></img>
                    <span className='relative top-2'>{character.name}</span>
                    <br />
                    <button
                      className='relative top-2'
                      onClick={() => {
                        cookies.user
                          ? cookies.user.favourites.characters.some((char) => {
                              return char._id === character._id;
                            })
                            ? handleRemoveCharacterToFavourites(character)
                            : handleAddCharacterToFavourites(character)
                          : navigate('/login');
                      }}
                    >
                      {(
                        cookies.user
                          ? cookies.user.favourites.characters.some((char) => {
                              return char._id === character._id;
                            })
                          : false
                      ) ? (
                        <FontAwesomeIcon
                          icon={solidStar}
                          className=' text-yellow-400'
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={solidStar}
                          className='hover:text-yellow-400 text-gray-300'
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
