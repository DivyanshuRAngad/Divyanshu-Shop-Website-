import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { products } from '../data/products';

// Create purchase history with some of the new products
const previousPurchases = [
  { id: 1, name: 'Wireless Headphones', date: '2024-05-01', price: 3999, image: '/headphones.png', rating: 4.5 },
  { id: 4, name: 'Wireless Earphones', date: '2024-04-15', price: 1999, image: '/earphones.png', rating: 4.8 },
  { id: 5, name: 'Gaming Mouse', date: '2024-03-20', price: 1499, image: '/mouse.png', rating: 4.2 },
  { id: 6, name: 'Wired Earphones', date: '2024-02-15', price: 899, image: '/wired_earphones.png', rating: 4.6 },
  { id: 7, name: 'Mechanical Keyboard', date: '2024-01-20', price: 2999, image: '/keyboard.png', rating: 4.9 },
];

export default function BuyAgain() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-r from-pink-400 via-pink-200 to-pink-400 py-12 px-4 mt-20">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-pink-700 mb-2 transition-colors duration-300 hover:text-blue-700 cursor-pointer">Your Purchase History</h1>
            <p className="text-gray-700">Re-order your favorite products with one click</p>
          </div>

          {/* Purchase History List */}
          <div className="space-y-4">
            {previousPurchases.map((item, index) => (
              <div key={item.id} className="bg-white bg-opacity-90 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-pink-400">
                <div className="flex items-center p-6">
                  {/* Product Image */}
                  <div className="w-20 h-20 mr-6 flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-pink-100 via-blue-100 to-yellow-100 rounded-lg flex items-center justify-center">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-contain transition-transform duration-200 hover:scale-110" 
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-pink-700 transition-colors duration-200 hover:text-blue-700">{item.name}</h3>
                      <div className="flex items-center">
                        <span className="text-yellow-500 text-lg">★</span>
                        <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-blue-600">₹{item.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">Purchased on {item.date}</p>
                      </div>
                      
                      <Link 
                        href={`/product/${item.id}`}
                        className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center gap-2"
                      >
                        <span>🔄</span>
                        Buy Again
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {previousPurchases.length === 0 && (
            <div className="text-center py-16 bg-white bg-opacity-90 rounded-xl shadow-lg">
              <div className="text-8xl mb-6">📦</div>
              <h2 className="text-2xl font-bold text-pink-700 mb-3">No Purchase History</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                You haven't made any purchases yet. Start shopping to build your purchase history!
              </p>
              <Link 
                href="/"
                className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <span>🛍️</span>
                Start Shopping
              </Link>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-12 bg-white bg-opacity-90 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-pink-700 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link 
                href="/fresh-deals"
                className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-md"
              >
                <span>🔥</span>
                Fresh Deals
              </Link>
              <Link 
                href="/cart"
                className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-md"
              >
                <span>🛒</span>
                View Cart
              </Link>
              <Link 
                href="/account"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-md"
              >
                <span>👤</span>
                My Account
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 