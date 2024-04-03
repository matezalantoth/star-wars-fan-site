/* eslint-disable react/prop-types */
import { Planets } from '../components/Planets';

export const PlanetsPage = (props) => {
  const { cookies, setUserLoginCookies } = props;
  return (
    <Planets cookies={cookies} setUserLoginCookies={setUserLoginCookies} />
  );
};
