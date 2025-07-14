import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartPopup from '../components/CartPopup';
import Link from 'next/link';
import { useState } from 'react';
import { products } from '../data/products';

// Use all products from the data file
const deals = products;

export default function FreshDeals() {
  const [showPopup, setShowPopup] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-r from-pink-400 via-pink-200 to-pink-400 py-12 px-4 flex flex-col items-center mt-20">
        <h1 className="text-4xl font-extrabold text-pink-700 mb-8 transition-colors duration-300 hover:text-blue-700 cursor-pointer">Fresh Deals</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {deals.map((deal, index) => (
            <div key={deal.id} className={`bg-white bg-opacity-90 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-all duration-300 border-t-4 ${index % 3 === 0 ? 'border-pink-400' : index % 3 === 1 ? 'border-blue-400' : 'border-green-400'} group`}>
              <div className="w-32 h-32 mb-4 relative overflow-hidden bg-gradient-to-br from-pink-100 via-blue-100 to-yellow-100 rounded-lg flex items-center justify-center">
                <img 
                  src={deal.image} 
                  alt={deal.name} 
                  className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-110 group-hover:brightness-110" 
                />
              </div>
              <h2 className="text-xl font-bold text-pink-600 mb-2 transition-colors duration-200 group-hover:text-blue-700">{deal.name}</h2>
              <div className="flex items-center gap-2 mb-4">
                <p className="text-lg font-semibold text-green-600">₹{deal.discountedPrice.toLocaleString()}</p>
                <p className="text-sm line-through text-gray-500">₹{deal.originalPrice.toLocaleString()}</p>
                <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-semibold">
                  {Math.round((deal.originalPrice - deal.discountedPrice) / deal.originalPrice * 100)}% OFF
                </span>
              </div>
              <Link 
                href={`/product/${deal.id}`}
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                Shop Now
              </Link>
            </div>
          ))}
        </div>
      </main>
      
      {/* Cart Popup */}
      <CartPopup 
        isVisible={showPopup}
        product={addedProduct}
        onClose={() => setShowPopup(false)}
      />
      
      <Footer />
    </>
  );
} 