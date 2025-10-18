'use client';

export default function ShopCTASection({ t, locale = 'en' }) {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-green-600 to-green-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`text-white ${locale === 'ar' ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {t.shop.cta.title}
            </h2>

            {/* QR Code and App Info */}
            <div className="inline-flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 mb-8">
              {/* QR Code Placeholder */}
              <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mr-4">
                <div className="w-16 h-16 bg-gray-900 rounded grid grid-cols-4 gap-1 p-1">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-sm ${
                        Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              {/* App Info */}
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {t.shop.cta.appTitle}
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      DP
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-2xl font-bold">{t.shop.cta.rating}</span>
                    <div className="flex text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-green-100 text-sm">
                  {t.shop.cta.ratingText}
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Person Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Person Silhouette */}
              <div className="w-80 h-96 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl flex items-end justify-center relative overflow-hidden">
                {/* Person Figure */}
                <div className="absolute bottom-0 w-full h-4/5">
                  {/* Head */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white rounded-full"></div>
                  
                  {/* Hair */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-12 bg-gray-800 rounded-full"></div>
                  
                  {/* Body */}
                  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-24 h-32 bg-white rounded-t-2xl"></div>
                  
                  {/* Arms */}
                  <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-white rounded-full"></div>
                  
                  {/* Phone in hands */}
                  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-gray-900 rounded-lg"></div>
                  
                  {/* Legs */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-24 bg-white rounded-t-2xl"></div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="absolute top-8 left-4 w-4 h-4 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-8 right-8 w-5 h-5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-white bg-opacity-30 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-white bg-opacity-30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
