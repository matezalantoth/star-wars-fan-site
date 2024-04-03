/* eslint-disable react/prop-types */
import { Characters } from '../components/Characters';

export const CharactersPage = (props) => {
  const { cookies, setUserLoginCookies } = props;
  return (
    <Characters cookies={cookies} setUserLoginCookies={setUserLoginCookies} />
  );
};
