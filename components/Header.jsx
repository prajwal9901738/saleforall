import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center py-10 px-10 bg-gray-50 mt-20'>
      <img
        src={assets.header_img}
        alt="logo"
        className='w-36 h-36 rounded-full mb-6'
      />

      <h1 className='flex items-center text-4xl font-bold mb-2'>
        Welcome to Our Application for exchange of mutual interests
        <img
          className='w-8 aspect-square ml-2 animate-bounce'
          src={assets.hand_wave}
          alt='wave'
        />
      </h1>

      <p className='text-lg text-gray-600 mb-6'>
        Your gateway to seamless trade experiences
      </p>

      <Link to='/marketplace' className='border border-gray-300 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all'>
        Get Started
      </Link>
    </div>
  );
};

export default Header;