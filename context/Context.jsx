import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [isloggedin, setisloggedin] = useState(false);
  const [userdata, setuserdata] = useState(null); // Use null instead of false for clarity
  const [cart, setCart] = useState([]);

  const getuserdata = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/user/userinfo`, {
        withCredentials: true,
      });
      if (data.success) {
        setuserdata(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong in fetching user data");
    }
  };

  const authstatus = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/auth/is-verified`, {
        withCredentials: true,
      });
      if (data.success) {
        setisloggedin(true);
      } else {
        setisloggedin(false);
      }
    } catch (error) {
      toast.error("Something went wrong in authentication");
    }
  };

  useEffect(() => {
    authstatus();
  }, []);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const updateCartItemQuantity = (itemId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: Number(quantity) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    backendurl,
    isloggedin,
    setisloggedin,
    userdata,
    setuserdata,
    getuserdata,
    cart,
    setCart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};