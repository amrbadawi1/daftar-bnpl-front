'use client';

import { useState } from 'react';

export default function ShopByCategorySection({ t, locale = 'en' }) {
  const categories = t.shop.categories.categories;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, categories.length - 4));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Fashion': '👔',
      'Beauty & Health': '💄',
      'Toys & Games': '🧸',
      'Electronics': '💻',
      'Home & Appliances': '🛋️',
      'Fitness & Outdoor': '🏋️',
      'Travel': '🧳',
      'الأزياء': '👔',
      'الجمال والصحة': '💄',
      'الألعاب والألعاب': '🧸',
      'الإلكترونيات': '💻',
      'المنزل والأجهزة': '🛋️',
      'اللياقة البدنية والهواء الطلق': '🏋️',
      'السفر': '🧳'
    };
    return icons[category] || '🛍️';
  };

  const getCategoryColor = (index) => {
    const colors = [
      'bg-blue-100',
      'bg-pink-100',
      'bg-yellow-100',
      'bg-green-100',
      'bg-purple-100',
      'bg-red-100',
      'bg-indigo-100'
    ];
    return colors[index % colors.length];
  };

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {t.shop.categories.title}
          </h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= categories.length - 4}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Categories Carousel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 25}%)` }}
          >
            {categories.map((category, index) => (
              <div
                key={index}
                className="min-w-[25%] px-3"
              >
                <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                  <div className="text-center">
                    {/* Category Icon */}
                    <div className={`w-20 h-20 ${getCategoryColor(index)} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      {getCategoryIcon(category)}
                    </div>

                    {/* Category Name */}
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                      {category}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <button className="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
            {t.shop.categories.viewAll}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
