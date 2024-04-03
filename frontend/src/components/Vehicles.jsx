import { useEffect, useState } from 'react';

export const Vehicles = () => {
  const [vehicles, setVehicles] = useState();

  useEffect(() => {
    const fetchMovieData = async () => {
      const httpResponse = await fetch('/api/vehicles');

      const response = await httpResponse.json();

      setVehicles(response.results);
    };
    fetchMovieData();
  }, []);

  console.log(vehicles);

  return (
    <div>
      {vehicles ? (
        <ul>
          {vehicles.map((vehicle) => {
            return <li key={vehicle}>{vehicle.name}</li>;
          })}
        </ul>
      ) : (
        'Loading...'
      )}
    </div>
  );
};
