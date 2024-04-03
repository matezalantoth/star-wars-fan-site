import { useEffect, useState } from 'react';

export const Characters = () => {
  const [characters, setCharacters] = useState();

  useEffect(() => {
    const fetchMovieData = async () => {
      const httpResponse = await fetch('/api/characters');

      const response = await httpResponse.json();

      setCharacters(response);
    };
    fetchMovieData();
  }, []);

  return (
    <div>
      {characters ? (
        <ul>
          {characters.map((character) => {
            return (
              <li key={character}>
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
