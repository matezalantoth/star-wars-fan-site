/* eslint-disable react/prop-types */

import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/Star_Wars_Logo.svg.png';

export default function Navbar(props) {
  // eslint-disable-next-line react/prop-types
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { cookies, setUserLoginCookies } = props;
  return (
    <>
      <nav className='bg-black'>
        <div className='relative flex h-16 w-screen'>
          <div className='flex sm:items-stretch sm:justify-start'>
            <img
              className='h-8 ml-6 mt-6 w-auto'
              src={logo}
              alt='Your Company'
            />
            <div className='hidden sm:ml-6 sm:block'>
              <div className='flex space-x-4'>
                <ul className='inline-flex float-left'>
                  <li className='relative top-5 right-5 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
                    <Link to='/'>Films</Link>
                  </li>
                  <li className='relative top-5 right-5 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
                    <Link to='/characters'>Characters</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className='absolute right-7 top-5'>
              <button
                onClick={() => {
                  menuOpen ? setMenuOpen(false) : setMenuOpen(true);
                }}
                type='button'
                className='rounded-md bg-white text-sm w-9 h-9 text-gray-900 hover:bg-gray-200'
              >
                <FontAwesomeIcon icon={faUser} />
              </button>
            </div>
            <div
              className='absolute z-10 right-7 top-14 w-36 rounded-md bg-white'
              hidden={!menuOpen}
            >
              <div className='py-1' role='none'>
                <Link
                  to={cookies.user ? '/profile' : '/login'}
                  className='text-gray-700 block px-4 py-2 text-sm'
                >
                  Profile
                </Link>
                <hr />
                {cookies.user ? (
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setUserLoginCookies(null);
                      navigate('/login');
                    }}
                    className='text-gray-700 block w-full px-4 py-2 text-left text-sm'
                  >
                    Sign out
                  </button>
                ) : (
                  <button className='text-gray-700 block w-full px-4 py-2 text-left text-sm'>
                    <Link to='/login'>Login</Link>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
