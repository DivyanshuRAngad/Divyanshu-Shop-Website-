'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { cartItems = [], dispatch } = useCart(); // ✅ Safe default
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const isInCart = cartItems.some((item) => item.id === product.id);
    setAdded(isInCart);
  }, [cartItems, product.id]);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="card-pink hover:shadow-lg transition p-4 flex flex-col justify-between">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-contain mb-4"
      />
      <h3 className="text-lg text-pink-900 font-semibold mb-1">{product.name}</h3>
      <p className="text-pink-300 line-through">₹{product.price}</p>
      <p className="text-xl text-pink-600 font-bold mb-4">
        ₹{product.discountedPrice}
      </p>

      <div className="mt-auto space-y-2">
        <Link href={`/product/${product.id}`}>
          <button className="w-full button-pink px-4 py-2 rounded">
            View Details
          </button>
        </Link>
        <button
          onClick={handleAddToCart}
          disabled={added}
          className={`w-full ${
            added ? 'bg-pink-300' : 'button-pink'
          } px-4 py-2 rounded`}
        >
          {added ? '✔ Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
