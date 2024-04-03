/* eslint-disable react/prop-types */
import { SignupForm } from '../components/SignupForm';

export const SignupPage = (props) => {
  const { cookies, setUserLoginCookies } = props;
  return (
    <SignupForm cookies={cookies} setUserLoginCookies={setUserLoginCookies} />
  );
};
