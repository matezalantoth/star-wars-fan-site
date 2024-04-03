/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const Vehicles = (props) => {
  const [vehicles, setVehicles] = useState();
  const { cookies, setUserLoginCookies } = props;
  const navigate = useNavigate();
  const showSuccessToast = (message) => toast.success(message);
  const showErrorToast = (message) => toast.error(message);

  useEffect(() => {
    const fetchMovieData = async () => {
      const httpResponse = await fetch('/api/vehicles');
      const response = await httpResponse.json();
      setVehicles(response);
    };
    fetchMovieData();
  }, []);

  const handleAddVehicleToFavourites = (vehicle) => {
    fetch(`/api/user/${cookies.user._id}/favourites/vehicles`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(vehicle),
    }).then((response) => {
      response.json().then((data) => {
        if (data.message) {
          showSuccessToast(data.message);
          setUserLoginCookies({
            ...cookies.user,
            characters: cookies.user.favourites.vehicles.push({
              _id: vehicle._id,
            }),
          });
        } else if (data.errorMessage) {
          showErrorToast(data.errorMessage);
        }
      });
    });
  };

  const handleRemoveVehicleToFavourites = (vehicle) => {
    fetch(`/api/user/${cookies.user._id}/favourites/vehicles`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(vehicle),
    }).then((response) => {
      if (response.status === 204) {
        showSuccessToast('Successfully deleted');
        cookies.user.favourites.vehicles =
          cookies.user.favourites.vehicles.filter((veh) => {
            return veh._id !== vehicle._id;
          });
        setUserLoginCookies(cookies.user);
      } else {
        showErrorToast('Something went wrong');
      }
    });
  };

  return (
    <div>
      {vehicles ? (
        <ul>
          {vehicles.map((vehicle) => {
            return (
              <li key={vehicle._id}>
                <img
                  className='w-24 h-36 object-contain'
                  src={`src/assets/vehicles/${
                    vehicle.url.split('/')[vehicle.url.split('/').length - 2]
                  }.jpg`}
                ></img>
                {vehicle.name}
                {cookies.user ? (
                  cookies.user.favourites.vehicles.some(
                    (veh) => veh._id === vehicle._id,
                  ) ? (
                    <button
                      onClick={() => {
                        handleRemoveVehicleToFavourites(vehicle);
                      }}
                    >
                      Remove from favourites
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        cookies.user
                          ? handleAddVehicleToFavourites(vehicle)
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
                        ? handleAddVehicleToFavourites(vehicle)
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
