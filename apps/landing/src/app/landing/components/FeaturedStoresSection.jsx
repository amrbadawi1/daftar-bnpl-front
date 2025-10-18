'use client';

export default function FeaturedStoresSection({ t, locale = 'en' }) {
  const stores = t.shop.featuredStores.stores;

  const getStoreLogo = (storeName) => {
    const logos = {
      'SHEIN': '👗',
      'noon': '🌙',
      'Amazon': '🛒',
      'Temu': '🛍️',
      'Wego': '✈️',
      'Almosafer': '🧳',
      'Trendyol': '🛒',
      'Namshi': '👟'
    };
    return logos[storeName] || '🏪';
  };

  const getStoreColor = (index) => {
    const colors = [
      'bg-black',
      'bg-yellow-500',
      'bg-orange-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-red-500',
      'bg-pink-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.shop.featuredStores.title}
          </h2>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stores.map((store, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="text-center">
                {/* Store Logo */}
                <div className={`w-16 h-16 ${getStoreColor(index)} rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4`}>
                  {getStoreLogo(store.name)}
                </div>

                {/* Store Name */}
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                  {store.name}
                </h3>

                {/* Store Type Badge */}
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  store.type === 'Online only' 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {store.type}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
            {t.shop.featuredStores.viewAll}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
