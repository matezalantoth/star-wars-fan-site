/* eslint-disable react/prop-types */

import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Navbar(props) {
  // eslint-disable-next-line react/prop-types
  const [menuOpen, setMenuOpen] = useState(false);

  const { cookies, setUserLoginCookies } = props;
  return (
    <>
      <nav className='bg-gray-800'>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
          <div className='relative flex h-16 items-center justify-between'>
            <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
              <button
                type='button'
                className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                aria-controls='mobile-menu'
                aria-expanded='false'
              >
                <span className='absolute -inset-0.5'></span>
                <span className='sr-only'>Open main menu</span>
              </button>
            </div>
            <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
              <div className='flex flex-shrink-0 items-center'>
                <img
                  className='h-8 w-auto'
                  src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                  alt='Your Company'
                />
              </div>
              <div className='hidden sm:ml-6 sm:block'>
                <div className='flex space-x-4'>
                  <ul className='listOne inline-flex'>
                    <li className=' text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
                      <Link to='/'>Main</Link>
                    </li>
                    <li className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
                      <Link to={cookies.user ? '/profile' : '/login'}>
                        login
                      </Link>
                    </li>
                    <li className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
                      <Link to={cookies.user ? '/profile' : '/signup'}>
                        signup
                      </Link>
                    </li>
                    <li className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
                      <Link to='/characters'>characters</Link>
                    </li>
                    <li className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
                      <Link to='/planets'>planets</Link>
                    </li>
                    <li className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
                      <Link to='/vehicles'>vehicles</Link>
                    </li>
                    <li className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
                      <Link to='/starships'>starships</Link>
                    </li>
                    <li>
                      <div
                        className='relative inline-block text-left'
                        onMouseEnter={() => {
                          setMenuOpen(true);
                        }}
                      >
                        <div>
                          <button
                            type='button'
                            className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                            id='menu-button'
                            aria-expanded='true'
                            aria-haspopup='true'
                          >
                            options
                            <svg
                              className='-mr-1 h-5 w-5 text-gray-400'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                              aria-hidden='true'
                            >
                              <path
                                fillRule='evenodd'
                                d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                                clipRule='evenodd'
                              />
                            </svg>
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
                          }}
                        >
                          <div className='py-1' role='none'>
                            <Link
                              to={cookies.user ? '/profile' : '/login'}
                              className='text-gray-700 block px-4 py-2 text-sm'
                              role='menuitem'
                              tabIndex='-1'
                              id='menu-item-0'
                            >
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
                                id='menu-item-3'
                              >
                                Sign out
                              </button>
                            ) : (
                              <button
                                className='text-gray-700 block w-full px-4 py-2 text-left text-sm'
                                role='menuitem'
                                tabIndex='-1'
                                id='menu-item-3'
                              >
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
