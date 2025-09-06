import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';
import axios from 'axios';
import { toast } from 'react-toastify';

const EmailVerify = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const { backendurl } = useContext(Context);

  const onsubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendurl}/api/auth/otp-verify`,
        { otp },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Verification failed. Please try again.");
      console.error("OTP verification error:", error);
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
      <form onSubmit={onsubmit} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>EMAIL VERIFICATION</h1>
        <label htmlFor='otp' className='block text-blue text-sm font-semibold text-center mb-2'>
          Enter OTP
        </label>
        <input
          onChange={(e) => setOtp(e.target.value)}
          value={otp}
          type='text'
          id='otp'
          className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Enter the 6-digit OTP'
        />
        <button
          type='submit'
          className='w-full py-2 px-1 mt-2 bg-gradient-to-r from-indigo-500 to-indigo-900 block text-white rounded-full'
        >
          VERIFY
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;