import { useEffect, useState } from 'react';

export const Vehicles = () => {
  const [vehicles, setVehicles] = useState();

  useEffect(() => {
    const fetchMovieData = async () => {
      const httpResponse = await fetch('/api/vehicles');
      const response = await httpResponse.json();
      setVehicles(response);
    };
    fetchMovieData();
  }, []);

  console.log(vehicles);

  return (
    <div>
      {vehicles ? (
        <ul>
          {vehicles.map((vehicle) => {
            return (
              <li key={vehicle}>
                <img
                  className='w-24 h-36 object-contain'
                  src={`src/assets/vehicles/${
                    vehicle.url.split('/')[vehicle.url.split('/').length - 2]
                  }.jpg`}
                ></img>
                {vehicle.name}
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
