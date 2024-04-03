import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { MainPage } from '../pages/MainPage';
import { LoginPage } from '../pages/LoginPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element=<MainPage /> />
      <Route path='/login' element=<LoginPage /> />
    </Routes>
  </BrowserRouter>,
);
