/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRef } from 'react';

// import ReCAPTCHA from 'react-google-recaptcha';

export const SignupForm = (props) => {
  const recaptcha = useRef();
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

  console.log(submittable);

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
    <div className='relative flex justify-center top-10'>
      <div className='relative  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8'>
        <form className='w-80 max-w-screen-lg sm:w-96 m-auto'>
          <h5 className='text-xl font-medium text-gray-900'>Registration</h5>
          <br />
          <div className='flex flex-col gap-6'>
            <label className='block text-sm font-medium text-gray-900  -mb-4'>
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
            <label className='block  text-sm font-medium text-gray-900  -mb-4'>
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
            <label className='block  text-sm font-medium text-gray-900  -mb-4'>
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
            <label className='block text-sm font-medium text-gray-900  -mb-4'>
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
          <ReCAPTCHA
            className='relative p-2 left-8 mt-1'
            ref={recaptcha}
            sitekey={import.meta.env.VITE_APP_SITE_KEY}
          />
          <button
            onClick={(event) => {
              event.preventDefault();
              if (recaptcha.current.getValue()) {
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
                  showErrorToast({
                    message: 'Your password or email is invalid',
                  });
                }
              } else {
                showErrorToast({ message: 'Please complete the captcha!' });
              }
            }}
            className='w-full bg-[#ffe81f] hover:bg-[#ffe91fdf] text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer'
            disabled={!submittable}
          >
            Sign up
          </button>
        </form>
        <div className='mt-2'>
          <span className='text-center text-slate-500 font-normal'>
            {' '}
            Already have an account?{' '}
          </span>
          <Link to='/login' className='font-medium text-blue-700'>
            Login!
          </Link>
        </div>
      </div>
    </div>
  );
};
