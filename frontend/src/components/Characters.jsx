import { useEffect, useState } from 'react';

export const Characters = () => {
  const [characters, setCharacters] = useState();

  useEffect(() => {
    const fetchMovieData = async () => {
      const httpResponse = await fetch('/api/characters');

      const response = await httpResponse.json();

      setCharacters(response.results);
    };
    fetchMovieData();
  }, []);

  console.log(characters);

  return (
    <div>
      {characters ? (
        <ul>
          {characters.map((character) => {
            return <li key={character}>{character.name}</li>;
          })}
        </ul>
      ) : (
        'Loading...'
      )}
    </div>
  );
};
