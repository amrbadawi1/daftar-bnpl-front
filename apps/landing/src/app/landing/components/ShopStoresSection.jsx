'use client';

import { useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion';

export default function ShopStoresSection({ t, locale = 'en' }) {
  const isRTL = locale === 'ar';
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const buttonRef = useRef(null);
  const cardsRef = useRef([]);

  const stores = [
    {
      name: 'Amazon',
      emoji: '🛒',
      color: 'from-orange-400 to-orange-600',
      category: 'Electronics'
    },
    {
      name: 'Noon',
      emoji: '🌙',
      color: 'from-yellow-400 to-yellow-600',
      category: 'Fashion'
    },
    {
      name: 'SHEIN',
      emoji: '👗',
      color: 'from-pink-400 to-pink-600',
      category: 'Fashion'
    },
    {
      name: 'IKEA',
      emoji: '🏠',
      color: 'from-blue-400 to-blue-600',
      category: 'Home'
    },
    {
      name: 'AliExpress',
      emoji: '📦',
      color: 'from-red-400 to-red-600',
      category: 'Everything'
    },
    {
      name: 'Namshi',
      emoji: '🛍️',
      color: 'from-purple-400 to-purple-600',
      category: 'Fashion'
    },
    {
      name: 'Carrefour',
      emoji: '🛒',
      color: 'from-green-400 to-green-600',
      category: 'Grocery'
    },
    {
      name: 'Lulu',
      emoji: '🏪',
      color: 'from-indigo-400 to-indigo-600',
      category: 'Shopping'
    },
    {
      name: 'Extra',
      emoji: '📱',
      color: 'from-teal-400 to-teal-600',
      category: 'Electronics'
    },
    {
      name: 'Jarir',
      emoji: '📚',
      color: 'from-amber-400 to-amber-600',
      category: 'Books'
    },
    {
      name: 'Danube',
      emoji: '🏠',
      color: 'from-emerald-400 to-emerald-600',
      category: 'Home'
    },
    {
      name: 'Centrepoint',
      emoji: '👕',
      color: 'from-rose-400 to-rose-600',
      category: 'Fashion'
    }
  ];

  // Handle browse stores action
  const handleBrowseStores = () => {
    // Navigate to shop page
    window.location.href = `/${locale}/shop`;
  };

  // Client-side detection
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Simplified GSAP animations to prevent hydration issues
  useEffect(() => {
    if (!isClient) return;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const initAnimations = async () => {
        try {
          const { gsap } = await import('gsap');
          const { ScrollTrigger } = await import('gsap/ScrollTrigger');
          
          gsap.registerPlugin(ScrollTrigger);

          // Simple fade-in animations only
          if (headlineRef.current) {
            gsap.from(headlineRef.current, {
              scrollTrigger: {
                trigger: headlineRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
              opacity: 0,
              y: 30,
              duration: 1,
              ease: "power3.out",
            });
          }

          if (buttonRef.current) {
            gsap.from(buttonRef.current, {
              scrollTrigger: {
                trigger: buttonRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
              opacity: 0,
              y: 20,
              duration: 0.8,
              delay: 0.2,
              ease: "power3.out",
            });
          }

          if (cardsRef.current[0]) {
            gsap.from(cardsRef.current[0], {
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
              opacity: 0,
              y: 30,
              duration: 0.8,
              delay: 0.3,
              ease: "power3.out",
            });
          }
        } catch (error) {
          console.warn("GSAP animations failed to load:", error);
        }
      };

      initAnimations();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, [isClient]);

  // Safety check for translations
  const headline = t?.shopStores?.headline || "These stores already use DaftarPay";
  const buttonText = t?.shopStores?.button || "Browse All Stores";

  // Prevent hydration mismatch by ensuring consistent initial render
  if (!isClient) {
    return (
      <>
        <style jsx global>{`
          h5 {
            line-height: 1.3 !important;
            padding-bottom: 0.4rem !important;
            padding-top: 0.2rem !important;
            margin-bottom: 0.5rem !important;
            overflow: visible !important;
            min-height: auto !important;
            height: auto !important;
          }
          .rtl h5 {
            line-height: 1.4 !important;
            padding-bottom: 0.6rem !important;
            padding-top: 0.4rem !important;
            margin-bottom: 0.6rem !important;
            overflow: visible !important;
            min-height: auto !important;
            height: auto !important;
          }
        `}</style>
        <section 
          id="shop-stores" 
          className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
        {/* Subtle floating elements without background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="floating-bg absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-indigo-400/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="floating-bg absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-pink-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-[48%_52%] gap-16 lg:gap-20 items-center">
            {/* Left side - Headline and Button */}
            <div className={`${isRTL ? 'text-right' : 'text-left'} ${isRTL ? 'font-ping' : 'font-poppins'}`}>
              <h5 
                className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text ${isRTL ? 'font-ping' : 'font-poppins'}`}
                style={{ 
                  lineHeight: isRTL ? '1.4' : '1.3',
                  paddingBottom: isRTL ? '0.6rem' : '0.4rem',
                  paddingTop: isRTL ? '0.4rem' : '0.2rem',
                  marginBottom: isRTL ? '1.5rem' : '1rem',
                  overflow: 'visible',
                  minHeight: 'auto',
                  height: 'auto'
                }}
              >
                {headline}
              </h5>
              
              {/* Subtitle */}
              <p className={`text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed font-medium ${isRTL ? 'font-ping' : 'font-poppins'}`}>
                {t?.shopStores?.subtitle || (isRTL ? 'اكتشف المتاجر الرائدة التي تثق في دفتر باي لتمكين عملائها من الدفع المرن' : 'Discover leading stores that trust DaftarPay to empower their customers with flexible payments')}
              </p>
              
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white font-bold text-lg rounded-2xl shadow-xl">
                {buttonText}
              </button>
            </div>

            {/* Right side - Enhanced Image Placeholder */}
            <div className="flex justify-center">
              <div className="relative group cursor-pointer animate-float">
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-xl animate-bounce border border-white/20 z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                    {t?.shopStores?.partnerBadge || (isRTL ? 'متاجر شريكة' : 'Partner Stores')}
                  </div>
                </div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4">
                  <div className="w-full max-w-md rounded-xl shadow-lg bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse">
                    <div className="aspect-[4/3] rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
    );
  }

  return (
    <>
      <style jsx global>{`
        h5 {
          line-height: 1.3 !important;
          padding-bottom: 0.4rem !important;
          padding-top: 0.2rem !important;
          margin-bottom: 0.5rem !important;
          overflow: visible !important;
          min-height: auto !important;
          height: auto !important;
        }
        .rtl h5 {
          line-height: 1.4 !important;
          padding-bottom: 0.6rem !important;
          padding-top: 0.4rem !important;
          margin-bottom: 0.6rem !important;
          overflow: visible !important;
          min-height: auto !important;
          height: auto !important;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .floating-bg {
          animation: float 6s ease-in-out infinite;
        }
        
        .shimmer-effect {
          position: relative;
          overflow: hidden;
        }
        
        .shimmer-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.5s;
        }
        
        .shimmer-effect:hover::before {
          left: 100%;
        }
      `}</style>
      <section 
        id="shop-stores" 
        ref={sectionRef} 
        className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
      {/* Subtle floating elements without background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="floating-bg absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-indigo-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0s'}}></div>
        <div className="floating-bg absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-pink-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="floating-bg absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-xl animate-bounce" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-[48%_52%] gap-16 lg:gap-20 items-center">
          {/* Left side - Headline and Button */}
          <div className={`${isRTL ? 'text-right' : 'text-left'} ${isRTL ? 'font-ping' : 'font-poppins'}`}>
            <h5 
              ref={headlineRef}
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text ${isRTL ? 'font-ping' : 'font-poppins'}`}
              style={{ 
                lineHeight: isRTL ? '1.4' : '1.3',
                paddingBottom: isRTL ? '0.6rem' : '0.4rem',
                paddingTop: isRTL ? '0.4rem' : '0.2rem',
                marginBottom: isRTL ? '1.5rem' : '1rem',
                overflow: 'visible',
                minHeight: 'auto',
                height: 'auto'
              }}
            >
              {headline}
            </h5>
            
            {/* Enhanced Subtitle */}
            <p className={`text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed font-medium ${isRTL ? 'font-ping' : 'font-poppins'}`}>
              {t?.shopStores?.subtitle || (isRTL ? 'اكتشف المتاجر الرائدة التي تثق في دفتر باي لتمكين عملائها من الدفع المرن' : 'Discover leading stores that trust DaftarPay to empower their customers with flexible payments')}
            </p>
            
            <button 
              ref={buttonRef}
              onClick={handleBrowseStores}
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl backdrop-blur-sm border border-purple-400/30 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50 transition-all duration-300 hover:scale-105 hover:border-purple-300/50"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Enhanced shimmer effects */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 flex items-center gap-2">
                {buttonText}
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M11 17l-5-5m0 0l5-5m-5 5h12" : "M13 7l5 5m0 0l-5 5m5-5H6"} />
                </svg>
              </span>
            </button>
          </div>

          {/* Right side - Animated Image Card */}
          <div className="flex justify-center">
            <div 
              ref={(el) => { if (el) cardsRef.current[0] = el; }}
              className="relative group cursor-pointer animate-float"
              aria-label="Partner stores showcase"
              role="img"
              style={{
                animation: 'float 6s ease-in-out infinite'
              }}
            >
              {/* Animated Container with Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
              
              {/* Enhanced Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-xl animate-bounce border border-white/20 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                  {t?.shopStores?.partnerBadge || (isRTL ? 'متاجر شريكة' : 'Partner Stores')}
                </div>

              </div>
              
              {/* Animated Image Card */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 group-hover:shadow-purple-500/25 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                <img 
                  src="https://viabill.com/dk/wp-content/uploads/2023/06/webshops2-568x428-1-480x362.png"
                  alt="Partner stores using DaftarPay - includes Amazon, Noon, SHEIN, IKEA, AliExpress, and more"
                  className="w-full max-w-md rounded-xl shadow-lg transition-all duration-500 group-hover:shadow-xl"
                  style={{
                    filter: 'drop-shadow(0 10px 25px rgba(147, 51, 234, 0.2))',
                    willChange: 'transform, opacity'
                  }}
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleBrowseStores()}
                />
                
                {/* Fallback Placeholder */}
                <div className="w-full max-w-md rounded-xl shadow-lg bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse hidden">
                  <div className="aspect-[4/3] rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

