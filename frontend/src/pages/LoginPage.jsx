/* eslint-disable react/prop-types */
import { LoginForm } from '../Components/LoginForm';

export const LoginPage = (props) => {
  // eslint-disable-next-line react/prop-types
  const { cookies, setUserLoginCookies } = props;
  console.log(cookies.user);
  return (
    <LoginForm cookies={cookies} setUserLoginCookies={setUserLoginCookies} />
  );
};
