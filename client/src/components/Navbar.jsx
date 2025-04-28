import React from 'react';

function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">PayNow</h1>
      <div className="space-x-6">
        <a href="#" className="text-gray-600 hover:text-blue-500">Home</a>
        <a href="#cards" className="text-gray-600 hover:text-blue-500">Products</a>
        <a href="#footer" className="text-gray-600 hover:text-blue-500">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;
