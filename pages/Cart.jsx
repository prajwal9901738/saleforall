import React, { useContext } from 'react';
import { Context } from '../context/Context';

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateCartItemQuantity } = useContext(Context);

  const totalPrice = cart.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);

  return (
    <div className="container mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((item, index) => (
            <div key={index} className="border rounded-lg shadow-md overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-700 mb-2">${item.price}</p>
                {/* Optional: Add quantity or remove button here */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;