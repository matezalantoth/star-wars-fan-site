/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

export const MainPage = (props) => {
  const [movies, setMovies] = useState();
  const { cookies, setUserLoginCookies } = props;
  const navigate = useNavigate();
  const showSuccessToast = (message) => toast.success(message);
  const showErrorToast = (message) => toast.error(message);

  console.log(cookies);

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

  return movies ? (
    <div>
      <div className='ml-48 mt-4 flex flex-wrap text-white'>
        {movies.map((movie) => {
          return (
            <div key={movie._id}>
              <div className='relative items-center m-2 text-center text-white shadow-lg '>
                <div className='animate-border rounded-md bg-white bg-gradient-to-r from-blue-400 to-green-700 bg-[length:400%_400%] p-1'>
                  {' '}
                  <div className='rounded-md bg-slate-900 px-5 py-3 shadow-lg font-bold text-white text-nowrap text-center'>
                    <img
                      className='h-128 w-80 object-contain'
                      src={`src/assets/films/${movie.episode_id}.jpg`}
                    ></img>
                    <span className='relative top-2'>{movie.title}</span>
                    <br />
                    <button
                      className='relative top-2'
                      onClick={() => {
                        cookies.user.favourites
                          ? cookies.user.favourites.films.some((mov) => {
                              return mov._id === movie._id;
                            })
                            ? handleRemoveFilmToFavourites(movie)
                            : handleAddFilmToFavourites(movie)
                          : navigate('/login');
                      }}
                    >
                      {(
                        cookies.user.favourites
                          ? cookies.user.favourites.films.some((mov) => {
                              return mov._id === movie._id;
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
