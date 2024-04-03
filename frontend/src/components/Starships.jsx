/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const Starships = (props) => {
  const [starships, setStarships] = useState(null);
  const { cookies, setUserLoginCookies } = props;
  const navigate = useNavigate();
  const showSuccessToast = (message) => toast.success(message);
  const showErrorToast = (message) => toast.error(message);

  useEffect(() => {
    const fetchMovieData = async () => {
      const httpResponse = await fetch('/api/starships');

      const response = await httpResponse.json();

      setStarships(response);
    };
    fetchMovieData();
  }, []);

  const handleAddSpaceshipToFavourites = (spaceship) => {
    fetch(`/api/user/${cookies.user._id}/favourites/spaceships`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(spaceship),
    }).then((response) => {
      response.json().then((data) => {
        if (data.message) {
          showSuccessToast(data.message);
          setUserLoginCookies({
            ...cookies.user,
            characters: cookies.user.favourites.spaceships.push({
              _id: spaceship._id,
            }),
          });
        } else if (data.errorMessage) {
          showErrorToast(data.errorMessage);
        }
      });
    });
  };

  const handleRemoveSpaceshipToFavourites = (spaceship) => {
    fetch(`/api/user/${cookies.user._id}/favourites/spaceships`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(spaceship),
    }).then((response) => {
      if (response.status === 204) {
        showSuccessToast('Successfully deleted');
        cookies.user.favourites.spaceships =
          cookies.user.favourites.spaceships.filter((spa) => {
            return spa._id !== spaceship._id;
          });
        setUserLoginCookies(cookies.user);
      } else {
        showErrorToast('Something went wrong');
      }
    });
  };

  return (
    <div>
      {starships ? (
        <ul>
          {starships.map((starship) => {
            return (
              <li key={starship._id}>
                {' '}
                <img
                  className='w-24 h-36 object-contain'
                  src={`src/assets/starships/${
                    starship.url.split('/')[starship.url.split('/').length - 2]
                  }.jpg`}
                ></img>
                {starship.name}
                {cookies.user ? (
                  cookies.user.favourites.spaceships.some(
                    (spa) => spa._id === starship._id,
                  ) ? (
                    <button
                      onClick={() => {
                        handleRemoveSpaceshipToFavourites(starship);
                      }}
                    >
                      Remove from favourites
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        cookies.user
                          ? handleAddSpaceshipToFavourites(starship)
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
                        ? handleAddSpaceshipToFavourites(starship)
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
