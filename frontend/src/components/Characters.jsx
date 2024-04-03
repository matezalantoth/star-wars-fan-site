/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

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

  return (
    <div>
      {characters ? (
        <ul>
          {characters.map((character) => {
            return (
              <li key={character._id}>
                {' '}
                <img
                  className='w-24 h-36 object-contain'
                  src={`src/assets/people/${
                    character.url.split('/')[
                      character.url.split('/').length - 2
                    ]
                  }.jpg`}
                ></img>
                {character.name}
                {cookies.user ? (
                  cookies.user.favourites.characters.some(
                    (char) => char._id === character._id,
                  ) ? (
                    <button
                      onClick={() => {
                        handleRemoveCharacterToFavourites(character);
                      }}
                    >
                      Remove from favourites
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        cookies.user
                          ? handleAddCharacterToFavourites(character)
                          : navigate('/login');
                      }}
                    >
                      Add to favourites
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => {
                      cookies.user
                        ? handleAddCharacterToFavourites(character)
                        : navigate('/login');
                    }}
                  >
                    Add to favourites
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        'Loading...'
      )}
    </div>
  );
};
