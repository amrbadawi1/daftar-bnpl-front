'use client';

export default function AppFeaturesSection({ t, locale = 'en' }) {
  const features = t.shop.appFeatures.features;

  const getFeatureIcon = (index) => {
    const icons = [
      // Find where you can pay in 4
      <svg key="search-icon" className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>,
      // All the deals in one app
      <svg key="deals-icon" className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>,
      // Always get the best price
      <svg key="price-icon" className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ];
    return icons[index] || icons[0];
  };

  const getPhoneMockup = (index) => {
    const mockups = [
      // Find stores mockup
      <div key="stores-mockup" className="w-32 h-56 bg-gray-900 rounded-3xl p-2 mx-auto">
        <div className="w-full h-full bg-white rounded-2xl p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
            <div className="text-xs font-bold">All stores</div>
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="w-full h-8 bg-gray-200 rounded"></div>
            <div className="flex space-x-2">
              <div className="w-12 h-8 bg-green-200 rounded"></div>
              <div className="w-12 h-8 bg-blue-200 rounded"></div>
            </div>
            <div className="space-y-1">
              <div className="w-full h-4 bg-gray-200 rounded"></div>
              <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>,
      // Deals mockup
      <div key="deals-mockup" className="w-32 h-56 bg-gray-900 rounded-3xl p-2 mx-auto">
        <div className="w-full h-full bg-white rounded-2xl p-3">
          <div className="text-xs font-bold mb-3">Deals</div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg p-2">
              <div className="text-xs font-bold">Almosafer</div>
              <div className="text-xs text-green-600">Up to 15%</div>
            </div>
            <div className="w-full h-12 bg-gray-100 rounded-lg p-2">
              <div className="text-xs">Ounass</div>
              <div className="text-xs text-green-600">10%</div>
            </div>
            <div className="w-full h-12 bg-gray-100 rounded-lg p-2">
              <div className="text-xs">SHEIN</div>
              <div className="text-xs text-green-600">20%</div>
            </div>
          </div>
        </div>
      </div>,
      // Price comparison mockup
      <div key="price-mockup" className="w-32 h-56 bg-gray-900 rounded-3xl p-2 mx-auto">
        <div className="w-full h-full bg-white rounded-2xl p-3">
          <div className="text-xs font-bold mb-3">Compare</div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg p-2">
              <div className="text-xs">Laptop</div>
              <div className="text-xs font-bold">1,649.00</div>
              <div className="text-xs text-green-600">BEST PRICE</div>
            </div>
            <div className="w-full h-12 bg-gray-100 rounded-lg p-2">
              <div className="text-xs">Store R</div>
              <div className="text-xs">1,850.00</div>
            </div>
            <div className="w-full h-12 bg-gray-100 rounded-lg p-2">
              <div className="text-xs">Store E</div>
              <div className="text-xs">1,899.00</div>
            </div>
          </div>
        </div>
      </div>
    ];
    return mockups[index] || mockups[0];
  };

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t.shop.appFeatures.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            {t.shop.appFeatures.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              {/* Phone Mockup */}
              <div className="mb-8">
                {getPhoneMockup(index)}
              </div>

              {/* Feature Content */}
              <div className="space-y-4">
                <div className="flex justify-center">
                  {getFeatureIcon(index)}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
