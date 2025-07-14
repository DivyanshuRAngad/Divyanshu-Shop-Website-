'use client';
import React from 'react';
import ProductCard from './ProductCard';
import { useSearch } from '../context/SearchContext';

export default function ProductList({ products = [] }) {
  const { searchQuery } = useSearch();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 section-pink p-6 pt-28">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}