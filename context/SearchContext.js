'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Sample products data for search functionality
  const allProducts = [
    { id: 1, name: 'Wireless Headphones', price: 4999, discountedPrice: 3999, image: '/headphones.png', category: 'Headphones' },
    { id: 2, name: 'Smart Watch', price: 3999, discountedPrice: 2999, image: '/smartwatch.png', category: 'Smart Watches' },
    { id: 3, name: 'Bluetooth Speaker', price: 3599, discountedPrice: 2499, image: '/speaker.png', category: 'Speakers' },
    { id: 4, name: 'Earphones', price: 3599, discountedPrice: 2499, image: '/earphones.png', category: 'Headphones' },
    { id: 5, name: 'Laptop', price: 49999, discountedPrice: 39999, image: '/Laptop.png', category: 'Computers' },
    { id: 6, name: 'Desktop', price: 59999, discountedPrice: 49999, image: '/desktop.png', category: 'Computers' },
    { id: 7, name: 'Accessories', price: 999, discountedPrice: 599, image: '/Accessories.png', category: 'Accessories' },
  ];

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay
    const timeoutId = setTimeout(() => {
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  return (
    <SearchContext.Provider value={{ 
      searchQuery, 
      setSearchQuery, 
      searchResults, 
      isSearching, 
      clearSearch,
      allProducts 
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);