import { useEffect, useState } from 'react';

export const Planets = () => {
  const [planets, setPlanets] = useState();

  useEffect(() => {
    const fetchMovieData = async () => {
      const httpResponse = await fetch('/api/planets');

      const response = await httpResponse.json();

      setPlanets(response);
    };
    fetchMovieData();
  }, []);

  console.log(planets);

  return (
    <div>
      {planets ? (
        <ul>
          {planets.map((planet) => {
            return <li key={planet}>{planet.name}</li>;
          })}
        </ul>
      ) : (
        'Loading...'
      )}
    </div>
  );
};
