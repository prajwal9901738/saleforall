import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { backendurl, setisloggedin, getuserdata } = useContext(Context);

  const [authMode, setAuthMode] = useState('signup'); // 'signup' or 'login'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (authMode === 'signup' && !name)) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      if (authMode === 'signup') {
        const { data } = await axios.post(
          `${backendurl}/api/auth/register`,
          { name, email, password },
          { withCredentials: true }
        );

        if (data.success) {
          toast.success(data.message);
          setisloggedin(true);
          await getuserdata(); // ✅ Await user data before navigating
          navigate('/');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          `${backendurl}/api/auth/login`,
          { email, password },
          { withCredentials: true }
        );

        if (data.success) {
          toast.success(data.message);
          setisloggedin(true);
          await getuserdata(); // ✅ Await user data before navigating
          navigate('/');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Something went wrong in login';
      toast.error(msg);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt='logo'
        className='absolute left-5 sm:left-20 top-5 w-25 sm:w-32 cursor-pointer'
      />
      <div className='bg-white bg-opacity-70 backdrop-blur-md rounded-lg shadow-lg p-8 sm:p-12 max-w-md w-full text-center font-size-md sm:text-lg'>
        <h2 className='mb-4 text-3xl font-bold'>
          {authMode === 'signup' ? 'Create Account' : 'Login Account'}
        </h2>
        <p className='mb-6 text-gray-700'>
          {authMode === 'signup'
            ? 'Create your account to get started'
            : 'Login to access your account'}
        </p>
        <form onSubmit={onSubmit}>
          <div>
            <img
              src={assets.person_icon}
              alt='person icon'
              className='w-6 h-6 inline-block mr-4'
            />
            {authMode === 'signup' && (
              <div className='mb-4 text-left'>
                <label htmlFor='username' className='block text-gray-700 mb-2'>
                  Username
                </label>
                <input
                  type='text'
                  id='username'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter your username'
                  autoFocus
                />
              </div>
            )}
            <div className='mb-4 text-left'>
              <label htmlFor='email' className='block text-gray-700 mb-2'>
                Email
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter your email'
              />
            </div>
            <div className='mb-6 text-left'>
              <label htmlFor='password' className='block text-gray-700 mb-2'>
                Password
              </label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter your password'
              />
            </div>
            <p
              onClick={() => navigate('/resetpassword')}
              className='mb-3 text-left cursor-pointer text-sm text-blue-600 underline'
            >
              Forgot password?
            </p>
            <button
              type='submit'
              className='w-full py-2 rounded-full bg-gradient-to-r from-indigo-200 to-indigo-300 text-white font-medium cursor-pointer'
            >
              {authMode === 'signup' ? 'Sign Up' : 'Login'}
            </button>
            <p className='text-gray-400 text-center text-xs mt-4'>
              {authMode === 'signup'
                ? 'Already have an account? '
                : "Don't have an account? "}
              <span
                onClick={() =>
                  setAuthMode(authMode === 'signup' ? 'login' : 'signup')
                }
                className='text-blue-600 cursor-pointer underline'
              >
                {authMode === 'signup' ? 'Login here' : 'Sign up'}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;