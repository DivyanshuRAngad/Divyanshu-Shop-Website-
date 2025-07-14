import Head from 'next/head';
import ProductList from '../components/ProductList';
import Footer from '../components/Footer';
import Link from 'next/link';
import { products } from '../data/products';

const categories = [
  { name: 'Smart Watches', image: '/smartwatch.png' },
  { name: 'Headphones', image: '/headphones.png' },
  { name: 'Speakers', image: '/speaker.png' },
  { name: 'Accessories', image: '/Accessories.png' },
];

// Ensure unique products in each section
const featuredProducts = products.slice(0, 3);
const bestSellers = products.slice(3, 6);
const newArrivals = products.slice(6, 8);
const limitedOffers = products.slice(8, 10);

const reviews = [
  { name: 'Amit', text: 'Great products and fast delivery!' },
  { name: 'Priya', text: 'Amazing quality and support.' },
  { name: 'Rakesh', text: 'Best in market and affordable too.' },
];
const partners = [
  '/dell-logo.png',
  '/boat-logo.png',
  '/noise-logo.png',
  '/jbl-logo.png',
  '/samsung-logo.png',
  '/asus-logo.png',
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Divyanshu Shop</title>
      </Head>

      {/* Horizontal Button List */}
      <div className="w-full flex justify-start bg-white py-8 shadow-sm pl-10 mt-6 border-b border-pink-200">
        <nav className="flex space-x-6">
          <Link href="/fresh-deals" className="px-4 py-2 rounded-md font-medium text-blue-700 hover:bg-blue-100 hover:text-blue-900 hover:scale-110 transition-all duration-200">Fresh Deals</Link>
          <Link href="/buy-again" className="px-4 py-2 rounded-md font-medium text-green-700 hover:bg-green-100 hover:text-green-900 hover:scale-110 transition-all duration-200">Buy again</Link>
          <Link href="/sell" className="px-4 py-2 rounded-md font-medium text-pink-700 hover:bg-pink-100 hover:text-pink-900 hover:scale-110 transition-all duration-200">Sell</Link>
          <Link href="/gift-cards" className="px-4 py-2 rounded-md font-medium text-yellow-700 hover:bg-yellow-100 hover:text-yellow-900 hover:scale-110 transition-all duration-200">Gift cards</Link>
        </nav>
      </div>

      {/* Hero Banner */}
      <section className="w-full bg-gradient-to-r from-pink-400 via-pink-200 to-pink-400 py-16 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold mb-4 text-gray-900 transition-colors duration-300 hover:text-blue-700 ">Unbeatable Deals on Latest Tech!</h1>
        <p className="text-lg mb-6 text-gray-800 transition-colors duration-300 hover:text-pink-700 ">Shop the best in smart wearables, audio, and more.</p>
        <Link href="/fresh-deals" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 hover:scale-105 hover:shadow-xl transition-all duration-200">Shop Now</Link>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-12 bg-gray-50">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 transition-colors duration-300 hover:text-pink-700 cursor-pointer">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredProducts.map((p, i) => (
            <div key={p.id} className={`bg-white rounded-lg shadow p-4 flex flex-col items-center border-t-4 hover:shadow-2xl hover:scale-105 transition-all duration-300 ${i%3===0?'border-pink-400':i%3===1?'border-blue-400':'border-green-400'} group`}>
              <div className="w-24 h-24 mb-2 relative overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-110 group-hover:brightness-110" />
              </div>
              <span className="font-semibold text-gray-800 transition-colors duration-200 group-hover:text-blue-700">{p.name}</span>
              <span className="text-blue-600 font-bold">₹{p.discountedPrice}</span>
              <Link href={`/product/${p.id}`} className="mt-4 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 hover:scale-105 hover:shadow transition-all duration-200">View Details</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-green-700 transition-colors duration-300 hover:text-blue-700 cursor-pointer">Best Sellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bestSellers.map((p, i) => (
            <div key={p.id} className={`bg-white rounded-lg shadow p-4 flex flex-col items-center border-t-4 hover:shadow-2xl hover:scale-105 transition-all duration-300 ${i%3===0?'border-pink-400':i%3===1?'border-blue-400':'border-green-400'} group relative overflow-hidden`}>
              <div className="w-24 h-24 mb-2 relative overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-110 group-hover:brightness-110" />
              </div>
              <span className="font-semibold text-gray-800 transition-colors duration-200 group-hover:text-green-700">{p.name}</span>
              <span className="text-blue-600 font-bold">₹{p.discountedPrice}</span>
              
              {/* View Details Button - Only visible on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link 
                  href={`/product/${p.id}`}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-6 py-12 bg-gray-50">
        <h2 className="text-2xl font-bold mb-6 text-yellow-700 transition-colors duration-300 hover:text-pink-700 cursor-pointer">New Arrivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newArrivals.map((p, i) => (
            <div key={p.id} className={`bg-white rounded-lg shadow p-4 flex flex-col items-center border-t-4 hover:shadow-2xl hover:scale-105 transition-all duration-300 ${i%3===0?'border-yellow-400':i%3===1?'border-pink-400':'border-blue-400'} group relative overflow-hidden`}>
              <div className="w-24 h-24 mb-2 relative overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-110 group-hover:brightness-110" />
              </div>
              <span className="font-semibold text-gray-800 transition-colors duration-200 group-hover:text-yellow-700">{p.name}</span>
              <span className="text-yellow-600 font-bold">₹{p.discountedPrice}</span>
              
              {/* View Details Button - Only visible on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link 
                  href={`/product/${p.id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Limited Time Offers */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-pink-700 transition-colors duration-300 hover:text-blue-700 cursor-pointer">Limited Time Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {limitedOffers.map((p, i) => (
            <div key={p.id} className={`bg-yellow-50 rounded-lg shadow p-4 flex flex-col items-center border-t-4 hover:shadow-2xl hover:scale-105 transition-all duration-300 ${i%3===0?'border-yellow-400':i%3===1?'border-pink-400':'border-blue-400'} group relative overflow-hidden`}>
              <div className="w-24 h-24 mb-2 relative overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-110 group-hover:brightness-110" />
              </div>
              <span className="font-semibold text-gray-800 transition-colors duration-200 group-hover:text-pink-700">{p.name}</span>
              <span className="text-yellow-700 font-bold">₹{p.discountedPrice}</span>
              <span className="text-xs text-yellow-600 mt-1">Hurry! Limited stock.</span>
              
              {/* View Details Button - Only visible on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link 
                  href={`/product/${p.id}`}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="max-w-7xl mx-auto px-5 py-10 bg-gray-50">
        <h2 className="text-2xl text-center font-bold mb-6 text-blue-700 transition-colors duration-300 hover:text-pink-700 cursor-pointer">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className={`bg-white rounded-lg shadow p-6 border-l-4 hover:shadow-2xl hover:scale-105 transition-all duration-300 ${i%2===0?'border-blue-400':'border-green-400'} group`}>
              <p className="text-gray-700 italic mb-2 transition-colors duration-200 group-hover:text-blue-700">"{r.text}"</p>
              <span className="font-semibold text-blue-600">- {r.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Partners */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-700 transition-colors duration-300 hover:text-blue-700 cursor-pointer">Our Partners</h2>
        <div className="flex flex-wrap gap-8 items-center justify-center">
          {partners.map((logo, i) => (
            <img key={i} src={logo} alt="Brand Partner" className="h-16 w-auto object-contain transition-transform duration-200 hover:scale-110 hover:brightness-110" />
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="max-w-2xl mx-auto px-6 py-12 bg-blue-50 rounded-lg my-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-700 transition-colors duration-300 hover:text-pink-700 cursor-pointer">Subscribe to Our Newsletter</h2>
        <form className="flex flex-col md:flex-row gap-4">
          <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 rounded border border-blue-300 focus:outline-none" />
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hover:scale-105 hover:shadow transition-all duration-200">Subscribe</button>
        </form>
      </section>

      {/* App Download Banner */}
      <section className="w-full bg-gradient-to-r from-blue-500 via-blue-100 to-blue-500 py-10 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-2 text-black-300 transition-colors duration-300 hover:text-pink-500 cursor-pointer">Get Our App</h2>
        <p className="text-pink-500 mb-4 transition-colors duration-300  cursor-pointer">Shop on the go with our mobile app!</p>
        <div className="flex gap-4">
          <a href="#" className="bg-white text-blue-600 px-6 py-2 rounded font-semibold shadow hover:bg-blue-50 hover:scale-105 hover:shadow-xl transition-all duration-200">Download for iOS</a>
          <a href="#" className="bg-white text-green-600 px-6 py-2 rounded font-semibold shadow hover:bg-green-50 hover:scale-105 hover:shadow-xl transition-all duration-200">Download for Android</a>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-pink-700 transition-colors duration-300 hover:text-blue-700 cursor-pointer">Why Shop With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center border-t-4 border-pink-400 hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <span className="text-3xl mb-2 transition-transform duration-200 hover:scale-125">🚚</span>
            <h3 className="font-semibold mb-1 text-pink-700 transition-colors duration-200 hover:text-blue-700 cursor-pointer">Free Shipping</h3>
            <p className="text-gray-700 text-center">On all orders above ₹500</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center border-t-4 border-blue-400 hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <span className="text-3xl mb-2 transition-transform duration-200 hover:scale-125">🔄</span>
            <h3 className="font-semibold mb-1 text-blue-700 transition-colors duration-200 hover:text-pink-700 cursor-pointer">Easy Returns</h3>
            <p className="text-gray-700 text-center">7-day hassle-free returns</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center border-t-4 border-green-400 hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <span className="text-3xl mb-2 transition-transform duration-200 hover:scale-125">🔒</span>
            <h3 className="font-semibold mb-1 text-green-700 transition-colors duration-200 hover:text-blue-700 cursor-pointer">Secure Payments</h3>
            <p className="text-gray-700 text-center">100% secure payment gateway</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
