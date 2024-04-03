import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import Navbar from './components/Navbar.jsx';
import { CharactersPage } from './pages/CharactersPage.jsx';
import { PlanetsPage } from './pages/PlanetsPage.jsx';
import { VehiclesPage } from './pages/VehiclesPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route path='/' element=<MainPage /> />
        <Route path='/login' element=<LoginPage /> />
        <Route path='/signup' element=<SignupPage /> />
        <Route path='/characters' element=<CharactersPage /> />
        <Route path='/planets' element=<PlanetsPage /> />
        <Route path='/vehicles' element=<VehiclesPage /> />
      </Route>
    </Routes>
  </BrowserRouter>
);
