import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Header from '../components/Header.jsx';


const Home = () => {
  return (
    <div className='flex flex-col center items-center min-h-screen bg-[url("/bg_img.png")] br-cover  bg-center'>
        <Navbar/>
        <Header/>
    </div>
  );
}

export default Home;