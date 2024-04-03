import ReactDOM from 'react-dom/client';

import './index.css';

import { App } from './App';
import dotenv from 'dotenv';
dotenv.config();
const sitekey = process.env.REACT_APP_SITE_KEY;

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
