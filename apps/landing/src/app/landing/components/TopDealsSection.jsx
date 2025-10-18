'use client';

import { useState } from 'react';

export default function TopDealsSection({ t, locale = 'en' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const deals = t.shop.topDeals.deals;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % deals.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + deals.length) % deals.length);
  };

  const getStoreLogo = (storeName) => {
    const logos = {
      'Amazon': '🛒',
      'H&M': '👕',
      'Level Shoes': '👟'
    };
    return logos[storeName] || '🏪';
  };

  const getDealColor = (index) => {
    const colors = ['bg-blue-50', 'bg-pink-50', 'bg-purple-50'];
    return colors[index % colors.length];
  };

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {t.shop.topDeals.title}
          </h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Deals Carousel */}
        <div className="relative">
          <div className="flex overflow-hidden">
            {deals.map((deal, index) => (
              <div
                key={index}
                className={`min-w-full flex-shrink-0 transition-transform duration-500 ${
                  index === currentIndex ? 'translate-x-0' : 'translate-x-full'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {deals.map((dealItem, dealIndex) => (
                    <div
                      key={dealIndex}
                      className={`${getDealColor(dealIndex)} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white text-xl">
                            {getStoreLogo(dealItem.store)}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                              {dealItem.store}
                            </h3>
                            <span className="text-sm text-pink-600 dark:text-pink-400 font-medium">
                              {dealItem.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        {dealItem.conditions && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {dealItem.conditions}
                          </p>
                        )}
                        <p className="text-4xl font-bold text-gray-900 dark:text-white">
                          {dealItem.discount}
                        </p>
                      </div>

                      <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2">
                        <span>Get deal</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <button className="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
            {t.shop.topDeals.viewAll}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
