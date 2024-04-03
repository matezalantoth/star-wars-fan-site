/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const Planets = (props) => {
  const [planets, setPlanets] = useState();
  const { cookies, setUserLoginCookies } = props;
  const navigate = useNavigate();
  const showSuccessToast = (message) => toast.success(message);
  const showErrorToast = (message) => toast.error(message);

  useEffect(() => {
    const fetchMovieData = async () => {
      const httpResponse = await fetch('/api/planets');

      const response = await httpResponse.json();

      setPlanets(response);
    };
    fetchMovieData();
  }, []);

  const handleAddPlanetToFavourites = (planet) => {
    fetch(`/api/user/${cookies.user._id}/favourites/planets`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(planet),
    }).then((response) => {
      response.json().then((data) => {
        if (data.message) {
          showSuccessToast(data.message);
          setUserLoginCookies({
            ...cookies.user,
            characters: cookies.user.favourites.planets.push({
              _id: planet._id,
            }),
          });
        } else if (data.errorMessage) {
          showErrorToast(data.errorMessage);
        }
      });
    });
  };

  const handleRemovePlanetToFavourites = (planet) => {
    fetch(`/api/user/${cookies.user._id}/favourites/planets`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(planet),
    }).then((response) => {
      if (response.status === 204) {
        showSuccessToast('Successfully deleted');
        cookies.user.favourites.planets =
          cookies.user.favourites.planets.filter((plan) => {
            return plan._id !== planet._id;
          });
        setUserLoginCookies(cookies.user);
      } else {
        showErrorToast('Something went wrong');
      }
    });
  };

  return (
    <div>
      {planets ? (
        <ul>
          {planets.map((planet) => {
            return (
              <li key={planet._id}>
                {planet.name}
                {cookies.user ? (
                  cookies.user.favourites.planets.some(
                    (plan) => plan._id === planet._id,
                  ) ? (
                    <button
                      onClick={() => {
                        handleRemovePlanetToFavourites(planet);
                      }}
                    >
                      Remove from favourites
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        cookies.user
                          ? handleAddPlanetToFavourites(planet)
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
                        ? handleAddPlanetToFavourites(planet)
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
