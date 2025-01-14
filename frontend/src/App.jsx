import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { CookiesProvider, useCookies } from 'react-cookie';
import { ProfilePage } from './pages/ProfilePage';
import { CharactersPage } from './pages/CharactersPage';
import { PlanetsPage } from './pages/PlanetsPage';
import { VehiclesPage } from './pages/VehiclesPage';
import Navbar from './components/Navbar';
import { StarshipsPage } from './pages/StarshipsPage';
import { Toaster } from 'react-hot-toast';

export const App = () => {
  const [cookies, setCookie] = useCookies(['user']);

  function setUserLoginCookies(user) {
    setCookie('user', user, { path: '/' });
  }

  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Navbar
                cookies={cookies}
                setUserLoginCookies={setUserLoginCookies}
              />
            }
          >
            <Route
              path='/'
              element=<MainPage
                cookies={cookies}
                setUserLoginCookies={setUserLoginCookies}
              />
            />
            <Route path='/' element=<MainPage cookies={cookies} /> />

            <Route
              path='/profile'
              element=<ProfilePage
                cookies={cookies}
                setUserLoginCookies={setUserLoginCookies}
              />
            />

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
            <Route
              path='/characters'
              element=<CharactersPage
                cookies={cookies}
                setUserLoginCookies={setUserLoginCookies}
              />
            />
            <Route
              path='/planets'
              element=<PlanetsPage
                cookies={cookies}
                setUserLoginCookies={setUserLoginCookies}
              />
            />
            <Route
              path='/vehicles'
              element=<VehiclesPage
                cookies={cookies}
                setUserLoginCookies={setUserLoginCookies}
              />
            />
            <Route
              path='/starships'
              element=<StarshipsPage
                cookies={cookies}
                setUserLoginCookies={setUserLoginCookies}
              />
            />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </CookiesProvider>
  );
};
