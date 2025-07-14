'use client';
import { useState, useEffect } from 'react';

export default function CartPopup({ isVisible, product, onClose }) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getProductTypeColor = (type) => {
    switch (type) {
      case 'gift-card':
        return 'bg-gradient-to-r from-pink-500 to-purple-500';
      case 'electronics':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'accessories':
        return 'bg-gradient-to-r from-green-500 to-emerald-500';
      default:
        return 'bg-gradient-to-r from-pink-500 to-blue-500';
    }
  };

  const getProductIcon = (type) => {
    switch (type) {
      case 'gift-card':
        return '🎁';
      case 'electronics':
        return '📱';
      case 'accessories':
        return '🎧';
      default:
        return '🛍️';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50">
      <div 
        className={`${getProductTypeColor(product?.type || 'default')} text-white rounded-lg shadow-2xl p-4 max-w-sm transform transition-all duration-300 ${
          isAnimating ? 'translate-x-0 scale-100 opacity-100' : 'translate-x-full scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl">
            {getProductIcon(product?.type || 'default')}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">
              {product?.name || 'Product'} Added!
            </h4>
            <p className="text-xs opacity-90">
              ₹{product?.discountedPrice || product?.price || '0'} • Added to cart
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors duration-200"
          >
            ✕
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="mt-3 bg-white bg-opacity-20 rounded-full h-1">
          <div 
            className="bg-white h-1 rounded-full transition-all duration-3000 ease-linear"
            style={{ width: isAnimating ? '0%' : '100%' }}
          ></div>
        </div>
      </div>
    </div>
  );
} 