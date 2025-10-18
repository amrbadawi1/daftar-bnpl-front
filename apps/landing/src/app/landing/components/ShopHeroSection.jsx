'use client';

import { useState } from 'react';

export default function ShopHeroSection({ t, locale = 'en' }) {
  const [searchQuery, setSearchQuery] = useState('');

  const brandLogos = [
    { name: 'SHEIN', color: 'bg-green-600' },
    { name: 'Adidas', color: 'bg-green-600' },
    { name: 'Namshi', color: 'bg-green-600' },
    { name: 'TEMU', color: 'bg-green-600' },
    { name: 'Extra', color: 'bg-green-600' },
    { name: 'Nike', color: 'bg-green-600' },
    { name: 'Level Shoes', color: 'bg-green-600' },
    { name: 'H&M', color: 'bg-green-600' },
    { name: 'Trendyol', color: 'bg-green-600' },
    { name: 'Bath & Body Works', color: 'bg-green-600' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <section className="relative bg-gradient-to-br from-green-600 to-green-800 py-20 px-4 overflow-hidden">
      {/* Animated Brand Logos Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-5 gap-8 opacity-20">
          {brandLogos.map((brand, index) => (
            <div
              key={brand.name}
              className={`w-16 h-16 ${brand.color} rounded-full flex items-center justify-center text-white font-bold text-xs animate-pulse`}
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: '3s'
              }}
            >
              {brand.name.length > 6 ? brand.name.substring(0, 6) : brand.name}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          {t.shop.hero.title}
        </h1>
        
        <p className="text-xl md:text-2xl text-green-100 mb-12 max-w-3xl mx-auto">
          {t.shop.hero.subtitle}
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.shop.hero.searchPlaceholder}
              className="w-full px-6 py-4 pr-16 text-lg rounded-full border-0 focus:ring-4 focus:ring-green-300 focus:outline-none text-gray-900 placeholder-gray-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* Additional Brand Logos for Visual Appeal */}
      <div className="absolute top-10 left-10 grid grid-cols-2 gap-4 opacity-30">
        {brandLogos.slice(0, 4).map((brand, index) => (
          <div
            key={`left-${brand.name}`}
            className={`w-12 h-12 ${brand.color} rounded-full flex items-center justify-center text-white font-bold text-xs animate-bounce`}
            style={{
              animationDelay: `${index * 0.5}s`,
              animationDuration: '4s'
            }}
          >
            {brand.name.length > 4 ? brand.name.substring(0, 4) : brand.name}
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 right-10 grid grid-cols-2 gap-4 opacity-30">
        {brandLogos.slice(4, 8).map((brand, index) => (
          <div
            key={`right-${brand.name}`}
            className={`w-12 h-12 ${brand.color} rounded-full flex items-center justify-center text-white font-bold text-xs animate-bounce`}
            style={{
              animationDelay: `${index * 0.5}s`,
              animationDuration: '4s'
            }}
          >
            {brand.name.length > 4 ? brand.name.substring(0, 4) : brand.name}
          </div>
        ))}
      </div>
    </section>
  );
}
