'use client';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const cart = useCart();
  const cartItems = cart?.state?.cart || [];
  const { searchQuery, setSearchQuery, searchResults, isSearching, clearSearch } = useSearch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchFocus = () => {
    if (searchQuery.trim() !== '') {
      setShowSearchResults(true);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() !== '') {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleProductClick = () => {
    setShowSearchResults(false);
    clearSearch();
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white border-b border-pink-200 text-gray-900 shadow-md flex flex-col sm:flex-row items-center justify-between px-6 sm:px-8 ${isScrolled ? 'backdrop-blur-md' : ''}`}>
      {/* Left Section: Logo or title */}
      <div className="text-xl font-sans-serif font-bold my-2 sm:my-0 text-black-700">
        <Link href="/">🛍️ Divyanshu Shop</Link>
      </div>

      {/* Search bar */}
      <div className="my-2 sm:my-1 flex justify-center w-full sm:w-auto">
        <div className="relative group" ref={searchRef}>
        <input
          type="text"
          value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
          placeholder="Search your Favourite..."
            className="px-4 py-2 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 w-64 border border-gray-300 transition-all duration-300 group-hover:border-blue-400 group-hover:shadow-lg group-hover:scale-105"
        />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-pink-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
          
          {/* Search Results Dropdown */}
          {showSearchResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
              {isSearching ? (
                <div className="p-4 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2">Searching...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div>
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={handleProductClick}
                      className="flex items-center p-3 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                    >
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-contain mr-3" />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-500">{product.category}</p>
                        <p className="text-sm font-semibold text-blue-600">₹{product.discountedPrice}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : searchQuery.trim() !== '' ? (
                <div className="p-4 text-center text-gray-500">
                  <p>No products found for "{searchQuery}"</p>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {/* Right Section: Cart + Account */}
      <div className="flex items-center gap-4 text-sm mt-2 sm:mt-0">
        <Link href="/cart" className="relative inline-block">
          <span className="text-xl">🛒</span>
          {cartItems.length > 0 && (
            <sup className="absolute -top-2 -right-2 text-[10px] bg-blue-600 text-white px-1 py-0.5 rounded-full">
              {cartItems.length}
            </sup>
          )}
          <span className="hover:bg-blue-100 rounded ml-2 text-blue-700">Cart</span>
        </Link>

        {/* Account Section - Simplified */}
        <Link href="/account" className="flex items-center gap-1 hover:bg-blue-100 rounded text-blue-700 px-3 py-1 transition-all duration-200 hover:scale-105">
            👤 Your Account
        </Link>
      </div>
    </nav>
  );
}