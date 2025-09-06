import React, { useContext } from 'react';
import { Context } from '../context/Context';

const Profile = () => {
  const { userdata } = useContext(Context);

  // Placeholder data for purchase and selling history
  const purchaseHistory = [
    { id: 1, item: 'Item 1', price: 10, date: '2025-09-01' },
    { id: 2, item: 'Item 2', price: 20, date: '2025-09-02' },
  ];

  const sellingHistory = [
    { id: 1, item: 'Item 3', price: 30, date: '2025-09-03' },
  ];

  return (
    <div className="container mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>

      {userdata && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">User Details</h2>
          <p><strong>Name:</strong> {userdata.name}</p>
          <p><strong>Email:</strong> {userdata.email}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Purchase History</h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            {purchaseHistory.length === 0 ? (
              <p>No purchases yet.</p>
            ) : (
              <ul>
                {purchaseHistory.map((purchase) => (
                  <li key={purchase.id} className="border-b py-2">
                    <p><strong>Item:</strong> {purchase.item}</p>
                    <p><strong>Price:</strong> ${purchase.price}</p>
                    <p><strong>Date:</strong> {purchase.date}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Selling History</h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            {sellingHistory.length === 0 ? (
              <p>No sales yet.</p>
            ) : (
              <ul>
                {sellingHistory.map((sale) => (
                  <li key={sale.id} className="border-b py-2">
                    <p><strong>Item:</strong> {sale.item}</p>
                    <p><strong>Price:</strong> ${sale.price}</p>
                    <p><strong>Date:</strong> {sale.date}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
