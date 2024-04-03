/* eslint-disable react/prop-types */
import { Starships } from '../components/Starships';

export const StarshipsPage = (props) => {
  const { cookies, setUserLoginCookies } = props;
  return (
    <Starships cookies={cookies} setUserLoginCookies={setUserLoginCookies} />
  );
};
