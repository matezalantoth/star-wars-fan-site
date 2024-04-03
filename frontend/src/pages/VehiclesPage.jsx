/* eslint-disable react/prop-types */
import { Vehicles } from '../components/Vehicles';

export const VehiclesPage = (props) => {
  const { cookies, setUserLoginCookies } = props;
  return (
    <Vehicles cookies={cookies} setUserLoginCookies={setUserLoginCookies} />
  );
};
