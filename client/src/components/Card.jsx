import React from 'react';

function Card({ title, price, onBuy }) {
  return (
    <div className="border rounded-lg shadow-md p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">Price: ₹{price}</p>
      </div>
      <button 
        onClick={onBuy}
        className="mt-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
        Buy Now
      </button>
    </div>
  );
}

export default Card;
