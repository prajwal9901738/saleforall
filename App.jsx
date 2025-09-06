import React from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import EmailVerify from './pages/EmailVerify.jsx';
import Marketplace from './pages/Marketplace.jsx';
import Cart from './pages/Cart.jsx';
import Profile from './pages/Profile.jsx';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/emailverification' element={<EmailVerify />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/marketplace' element={<Marketplace />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;