/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// import ReCAPTCHA from 'react-google-recaptcha';

export const SignupForm = (props) => {
  const { cookies, setUserLoginCookies } = props;
  const [newUserData, setNewUserData] = useState({});
  const [submittable, setSubmittable] = useState(false);
  const navigate = useNavigate();
  const showSuccessToast = (data) => toast.success(data.message);
  const showErrorToast = (data) => toast.error(data.message);
  useEffect(() => {
    if (
      newUserData.name &&
      newUserData.dob &&
      newUserData.email &&
      newUserData.password
    ) {
      setSubmittable(true);
    }
  }, [newUserData]);

  if (cookies.user) {
    navigate('/profile');
  }

  const handleSignup = async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newUserData),
    });
    const data = await response.json();
    return data;
  };
  return (
    <div className='relative flex justify-center'>
      <div className='relative  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
        <form className='w-80 max-w-screen-lg sm:w-96 m-auto'>
          <h5 className='text-xl font-medium text-gray-900 dark:text-white'>
            Registration
          </h5>
          <br />
          <div className='flex flex-col gap-6'>
            <label className='block text-sm font-medium text-gray-900 dark:text-white -mb-4'>
              Your Name:
            </label>
            <input
              onChange={(event) => {
                setNewUserData({ ...newUserData, name: event.target.value });
              }}
              type='text'
              required
              placeholder='John Doe'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
            />
            <label className='block  text-sm font-medium text-gray-900 dark:text-white -mb-4'>
              Date of Birth:
            </label>
            <input
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
              onChange={(event) => {
                setNewUserData({ ...newUserData, dob: event.target.value });
              }}
              type='date'
              required
            />
            <label className='block  text-sm font-medium text-gray-900 dark:text-white -mb-4'>
              Your Email:
            </label>
            <input
              placeholder='name@mail.com'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
              onChange={(event) => {
                setNewUserData({ ...newUserData, email: event.target.value });
              }}
              type='email'
              required
            />
            <label className='block text-sm font-medium text-gray-900 dark:text-white -mb-4'>
              Password:
            </label>
            <input
              type='password'
              placeholder='********'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
              onChange={(event) => {
                setNewUserData({
                  ...newUserData,
                  password: event.target.value,
                });
              }}
              required
            />
          </div>
          <button
            onClick={(event) => {
              event.preventDefault();
              if (
                newUserData.password.match(/([a-z?'!0-9])/gi).join('') ===
                newUserData.password
              ) {
                handleSignup(event).then((data) => {
                  if (data.message) {
                    showErrorToast(data);
                  } else {
                    showSuccessToast({
                      message: 'Succesfully created account!',
                    });
                    setUserLoginCookies(data);
                    navigate('/profile');
                  }
                });
              } else {
                showErrorToast('Your password or email is invalid');
              }
            }}
            className='w-full mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-blue-800'
            disabled={!submittable}
          >
            Sign up
          </button>
          <div className='mt-2'>
            <span className='mt-4 text-center font-normal'>
              {' '}
              Already have an account?{' '}
            </span>
            <Link to='/login' className='font-medium text-blue-700'>
              Login!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
