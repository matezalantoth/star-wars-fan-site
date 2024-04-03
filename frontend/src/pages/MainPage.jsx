import { useEffect, useState } from 'react';

export const MainPage = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    const fetchMovieData = async () => {
      const httpResponse = await fetch('/api/films');

      const response = await httpResponse.json();

      setMovies(response.results);
    };
    fetchMovieData();
  }, []);

  console.log(movies);

  return (
    <div>
      {movies ? (
        <ul>
          {movies.map((movie) => {
            return <li key={movie}>{movie.title}</li>;
          })}
        </ul>
      ) : (
        'hi'
      )}
    </div>
  );
};
