import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { backendurl } = useContext(Context);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newpass, setNewPass] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendurl}/api/auth/send-reset-otp`, { email });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) setIsEmailSent(true);
    } catch (error) {
      console.error("Email submission error:", error);
      toast.error("Error in sending email");
    }
  };

  const onOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendurl}/api/auth/reset-password`, {
        email,
        otp,
        newpassword: newpass
      });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) {
        setIsOtpVerified(true);
        navigate('/');
      }
    } catch (error) {
      console.error("OTP verification error:", error.response?.data || error.message);
      toast.error("Error in verifying OTP");
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        className='absolute left-5 sm:left-20 top-5 w-25 sm:w-32 cursor-pointer'
      />

      {!isEmailSent && (
        <form onSubmit={onSubmitEmail} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>RESET PASSWORD</h1>
          <p className='text-white text-m text-center mb-6'>Please enter your registered email for password reset.</p>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 border border-gray-300 rounded-full bg-[#333A5C]'>
            <input
              type='email'
              placeholder='email id'
              className='bg-transparent outline-none text-white w-full'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <button type='submit' className='w-full py-2 px-1 mt-2 bg-gradient-to-r from-indigo-500 to-indigo-600 block text-white rounded-full'>
            Submit
          </button>
        </form>
      )}

      {isEmailSent && !isOtpVerified && (
        <form onSubmit={onOtpSubmit} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>RESET PASSWORD</h1>
          <label htmlFor='otp' className='block text-blue text-sm font-semibold text-center mb-2'>
            Enter OTP for password reset
          </label>
          <input
            onChange={(e) => setOtp(e.target.value)}
            value={otp}
            type='text'
            id='otp'
            className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter the 6-digit OTP'
            required
          />
          <input
            type='password'
            placeholder='New password'
            className='w-full px-3 py-2 mt-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            value={newpass}
            onChange={e => setNewPass(e.target.value)}
            required
          />
          <button
            type='submit'
            className='w-full py-2 px-1 mt-4 bg-gradient-to-r from-indigo-500 to-indigo-900 block text-white rounded-full'
          >
            RESET
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;