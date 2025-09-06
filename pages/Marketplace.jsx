import React, { useContext, useState } from 'react';
import { Context } from '../context/Context';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Marketplace = () => {
  const { addToCart, cart, removeFromCart, clearCart, userdata, setisloggedin, setuserdata } = useContext(Context);
  const navigate = useNavigate();

  const [items, setItems] = useState([
    { id: 1, name: 'Car', price: 10000, image: assets.carsale, condition: 'resale', originalPrice: 12000 },
    { id: 2, name: 'Bike', price: 1000, image: assets.bike, condition: 'new' },
    { id: 3, name: 'Computer', price: 500, image: assets.comsale, condition: 'resale', originalPrice: 800 },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    condition: 'new',
    originalPrice: '',
  });
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price && newProduct.image) {
      setItems([...items, { ...newProduct, id: items.length + 1 }]);
      setNewProduct({ name: '', price: '', image: '', condition: 'new', originalPrice: '' });
      setShowAddProduct(false); // Close form after adding product
    }
  };

  const logout = () => {
    setisloggedin(false);
    setuserdata(null);
  };

  const totalPrice = cart.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-100 to-pink-100 px-4 py-10 mt-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">🛍️ Marketplace</h1>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setShowAddProduct(!showAddProduct)}
            className="bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
          >
            {showAddProduct ? 'Close Form' : 'Add Product'}
          </button>

          {/* User Icon with Dropdown */}
          <div className="relative group">
            <div
              className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold cursor-pointer"
              title={`Logged in as ${userdata?.name || 'Guest'}`}
            >
              {userdata?.name ? userdata.name.charAt(0).toUpperCase() : 'U'}
            </div>

            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 hidden group-hover:block z-50">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                👋 Hello, {userdata?.name || 'Guest'}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                🛒 Items in Cart: <strong>{cart.length}</strong>
              </p>
              <p className="text-sm text-gray-600 mb-3">
                💰 Total: ₹{totalPrice.toLocaleString()}
              </p>
              <button
                onClick={logout}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-2 rounded hover:scale-105 transition-transform"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Product Form */}
      {showAddProduct && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">📦 Add a New Product</h2>
          <form onSubmit={handleAddProduct} className="bg-white bg-opacity-90 backdrop-blur-md shadow-xl rounded-xl p-6 space-y-6">
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-600 mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                id="productName"
                value={newProduct.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label htmlFor="productPrice" className="block text-sm font-medium text-gray-600 mb-1">Price</label>
              <input
                type="number"
                name="price"
                id="productPrice"
                value={newProduct.price}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label htmlFor="productCondition" className="block text-sm font-medium text-gray-600 mb-1">Condition</label>
              <select
                name="condition"
                id="productCondition"
                value={newProduct.condition}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="new">New</option>
                <option value="resale">Resale</option>
              </select>
            </div>
            {newProduct.condition === 'resale' && (
              <div>
                <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-600 mb-1">Original Price</label>
                <input
                  type="number"
                  name="originalPrice"
                  id="originalPrice"
                  value={newProduct.originalPrice}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}
            <div>
              <label htmlFor="productImage" className="block text-sm font-medium text-gray-600 mb-1">Image URL</label>
              <input
                type="text"
                name="image"
                id="productImage"
                value={newProduct.image}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
            >
              Add Product
            </button>
          </form>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-24">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white bg-opacity-90 backdrop-blur-md border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 overflow-hidden relative"
          >
            <img
              src={typeof item.image === 'string' ? item.image : String(item.image)}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.condition === 'new' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                  {item.condition}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">₹{item.price.toLocaleString()}</p>
                {item.condition === 'resale' && (
                  <p className="text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</p>
                )}
              </div>
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold py-2 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => { addToCart(item); navigate('/cart'); }}
                  className="w-full bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-white font-bold py-2 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
                >
                  Buy Now
                </button>
              </div>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this product?')) {
                    setItems(prev => prev.filter(p => p.id !== item.id));
                  }
                }}
                className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold py-1 rounded-md hover:scale-105 transition-transform duration-200"
              >
                🗑️ Delete Product
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      {/* Cart Summary */}
      <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md shadow-lg p-4 border-t border-gray-200 z-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="text-lg font-bold">🧾 Cart Summary</h3>
              <p className="text-sm text-gray-600">{cart.length} items</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold">Total: ₹{totalPrice.toLocaleString()}</p>
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  Clear All
                </button>
              )}
              <button 
                onClick={() => navigate('/cart')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
              >
                View Cart & Checkout
              </button>
            </div>
          </div>

          {/* Interactive Cart Items */}
          <div className="max-h-48 overflow-y-10 mt-1 p-2 space-y-2">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-100 rounded-md px-4 py-2">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">{item.name}</span>
                  <span className="text-sm text-gray-600">₹{item.price.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 font-bold text-sm"
                  title="Remove"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
  </div>

  );
};

export default Marketplace;