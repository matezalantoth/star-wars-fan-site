import { useEffect, useState } from 'react';

export const Starships = () => {
  const [starships, setStarships] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      const httpResponse = await fetch('/api/starships');

      const response = await httpResponse.json();

      setStarships(response);
    };
    fetchMovieData();
  }, []);

  return (
    <div>
      {starships ? (
        <ul>
          {starships.map((starships) => {
            return (
              <li key={starships._id}>
                {' '}
                <img
                  className='w-24 h-36 object-contain'
                  src={`src/assets/starships/${
                    starships.url.split('/')[
                      starships.url.split('/').length - 2
                    ]
                  }.jpg`}
                ></img>
                {starships.name}
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
