import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { CookiesProvider, useCookies } from 'react-cookie';
import { ProfilePage } from './pages/ProfilePage';

export const App = () => {
  const [cookies, setCookie] = useCookies(['user']);

  function setUserLoginCookies(user) {
    setCookie('user', user, { path: '/' });
  }

  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element=<MainPage cookies={cookies} /> />
          cookie.user ?{' '}
          <Route
            path='/profile'
            element=<ProfilePage cookies={cookies} />
          /> :{' '}
          <Route
            path='/login'
            element=<LoginPage
              cookies={cookies}
              setUserLoginCookies={setUserLoginCookies}
            />
          />
          <Route
            path='/signup'
            element=<SignupPage
              cookies={cookies}
              setUserLoginCookies={setUserLoginCookies}
            />
          />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
};
