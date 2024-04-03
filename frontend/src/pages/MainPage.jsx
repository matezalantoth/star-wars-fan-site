/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const MainPage = (props) => {
  const [movies, setMovies] = useState();
  const { cookies, setUserLoginCookies } = props;
  const navigate = useNavigate();
  const showSuccessToast = (message) => toast.success(message);
  const showErrorToast = (message) => toast.error(message);

  useEffect(() => {
    const fetchMovieData = async () => {
      const httpResponse = await fetch('/api/films');
      const response = await httpResponse.json();

      setMovies(response);
    };
    fetchMovieData();
  }, []);

  const handleAddFilmToFavourites = (film) => {
    fetch(`/api/user/${cookies.user._id}/favourites/films`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(film),
    }).then((response) => {
      response.json().then((data) => {
        if (data.message) {
          showSuccessToast(data.message);
          setUserLoginCookies({
            ...cookies.user,
            films: cookies.user.favourites.films.push({
              _id: film._id,
            }),
          });
        } else if (data.errorMessage) {
          showErrorToast(data.errorMessage);
        }
      });
    });
  };

  const handleRemoveFilmToFavourites = (film) => {
    fetch(`/api/user/${cookies.user._id}/favourites/films`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(film),
    }).then((response) => {
      if (response.status === 204) {
        showSuccessToast('Successfully deleted');
        cookies.user.favourites.films = cookies.user.favourites.films.filter(
          (mov) => {
            return mov._id !== film._id;
          },
        );
        setUserLoginCookies(cookies.user);
      } else {
        showErrorToast('Something went wrong');
      }
    });
  };

  return (
    <div>
      {movies ? (
        <ul>
          {movies.map((movie) => {
            return (
              <li key={movie._id}>
                {movie.title}
                {cookies.user ? (
                  cookies.user.favourites.films.some(
                    (film) => film._id === movie._id,
                  ) ? (
                    <button
                      onClick={() => {
                        handleRemoveFilmToFavourites(movie);
                      }}
                    >
                      Remove from favourites
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        cookies.user
                          ? handleAddFilmToFavourites(movie)
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
                        ? handleAddFilmToFavourites(movie)
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
        'hi'
      )}
    </div>
  );
};
