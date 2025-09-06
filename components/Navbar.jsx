import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const {
    userdata,
    isloggedin,
    backendurl,
    setisloggedin,
    setuserdata,
    cart,
  } = useContext(Context);

  const logout = async () => {
    try {
      await axios.get(`${backendurl}/api/auth/logout`, {
        withCredentials: true,
      });
      setisloggedin(false);
      setuserdata(null);
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <div className='w-full flex justify-between items-center py-4 px-10 bg-white border-b border-gray-300 fixed top-0 z-50'>
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        className='w-32 h-8 object-contain cursor-pointer'
      />

      {/* Right-side: Icons and Login Button */}
      <div className="flex items-center gap-4">
        {isloggedin && userdata?.name ? (
          <div className='relative group'>
            <div
              className='w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white text-lg font-bold cursor-pointer'
              title={`Logged in as ${userdata.name}`}
            >
              {userdata.name.trim().charAt(0).toUpperCase()}
            </div>

            {/* Dropdown */}
            <div className='absolute top-full mt-2 right-0 bg-white border border-gray-500 rounded-md shadow-md p-2 hidden group-hover:block z-50'>
              <ul className='list-none m-0 p-2 space-y-3 text-sm text-gray-800'>
                <li className='hover:bg-gray-200 text-xl cursor-pointer' onClick={() => navigate('/profile')}>Profile</li>
                <li className='hover:bg-gray-200 text-xl cursor-pointer' onClick={() => navigate('/cart')}>
                  Cart <span className="bg-red-500 text-white rounded-full px-2">{cart.length}</span>
                </li>
                <li
                  onClick={logout}
                  className='hover:bg-gray-200 text-xl cursor-pointer'
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-200 transition-all'
          >
            LOGIN
            <img
              src={assets.arrow_icon}
              alt="arrow"
              className='w-4 h-4 object-contain'
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;