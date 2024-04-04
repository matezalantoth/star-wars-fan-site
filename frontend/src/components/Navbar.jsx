/* eslint-disable react/prop-types */

import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/Star_Wars_Logo.svg.png';

export default function Navbar(props) {
  // eslint-disable-next-line react/prop-types
  const [menuOpen, setMenuOpen] = useState(false);

  const { cookies, setUserLoginCookies } = props;
  return (
    <>
      <nav className='bg-black'>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
          <div className='relative flex h-16 items-center justify-between'>
            <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
              <button
                type='button'
                className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                aria-controls='mobile-menu'
                aria-expanded='false'>
                <span className='absolute -inset-0.5'></span>
                <span className='sr-only'>Open main menu</span>
              </button>
            </div>
            <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
              <div className='flex flex-shrink-0 items-center'>
                <img className='h-8 w-auto' src={logo} alt='Your Company' />
              </div>
              <div className='hidden sm:ml-6 sm:block'>
                <div className='flex space-x-4'>
                  <ul className='listOne inline-flex'>
                    <li className=' text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
                      <Link to='/'>Main</Link>
                    </li>
                    <li className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
                      <Link to={cookies.user ? '/profile' : '/login'}>
                        Login
                      </Link>
                    </li>
                    <li className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
                      <Link to={cookies.user ? '/profile' : '/signup'}>
                        Sign Up
                      </Link>
                    </li>
                    <li className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
                      <Link to='/characters'>Characters</Link>
                    </li>

                    <li>
                      <div
                        className='relative inline-block text-left'
                        onMouseEnter={() => {
                          setMenuOpen(true);
                        }}>
                        <div className='float-right ml-96'>
                          <button
                            type='button'
                            className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                            id='menu-button'
                            aria-expanded='true'
                            aria-haspopup='true'>
                            <FontAwesomeIcon icon={faUser} />
                          </button>
                        </div>
                        <div
                          className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                          role='menu'
                          aria-orientation='vertical'
                          aria-labelledby='menu-button'
                          tabIndex='-1'
                          hidden={!menuOpen}
                          onMouseLeave={() => {
                            setMenuOpen(false);
                          }}>
                          <div className='py-1' role='none'>
                            <Link
                              to={cookies.user ? '/profile' : '/login'}
                              className='text-gray-700 block px-4 py-2 text-sm'
                              role='menuitem'
                              tabIndex='-1'
                              id='menu-item-0'>
                              Profile
                            </Link>
                            {cookies.user ? (
                              <button
                                onClick={() => {
                                  setUserLoginCookies(null);
                                }}
                                className='text-gray-700 block w-full px-4 py-2 text-left text-sm'
                                role='menuitem'
                                tabIndex='-1'
                                id='menu-item-3'>
                                Sign out
                              </button>
                            ) : (
                              <button
                                className='text-gray-700 block w-full px-4 py-2 text-left text-sm'
                                role='menuitem'
                                tabIndex='-1'
                                id='menu-item-3'>
                                <Link to='/login'>Login</Link>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
