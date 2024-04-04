import { LoginForm } from '../components/LoginForm';
/* eslint-disable react/prop-types */
export const LoginPage = (props) => {
  // eslint-disable-next-line react/prop-types
  const { cookies, setUserLoginCookies } = props;
  return (
    <LoginForm cookies={cookies} setUserLoginCookies={setUserLoginCookies} />
  );
};
