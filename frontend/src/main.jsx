import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import { MainPage } from '../pages/MainPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element=<MainPage /> />
      <Route path='/login' element=<LoginPage /> />
      <Route path='/signup' element=<SignupPage /> />
    </Routes>
  </BrowserRouter>
);
