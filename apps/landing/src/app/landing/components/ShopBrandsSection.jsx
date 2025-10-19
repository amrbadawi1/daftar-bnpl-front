'use client';

import { useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion';

export default function ShopBrandsSection({ t, locale = 'en' }) {
  const isRTL = locale === 'ar';
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const cardsRef = useRef([]);

  const brands = [
    {
      name: 'Amazon',
      logo: '🛒',
      product: '📺',
      logoColor: 'bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg',
      productColor: 'text-9xl',
      logoTextColor: 'text-white',
      logoSize: 'w-20 h-20'
    },
    {
      name: 'Noon',
      logo: '🌙',
      product: '👟',
      logoColor: 'bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg',
      productColor: 'text-9xl',
      logoTextColor: 'text-white',
      logoSize: 'w-20 h-20'
    },
    {
      name: 'SHEIN',
      logo: '👗',
      product: '🕶️',
      logoColor: 'bg-gradient-to-br from-pink-400 to-pink-600 shadow-lg',
      productColor: 'text-9xl',
      logoTextColor: 'text-white',
      logoSize: 'w-20 h-20'
    },
    {
      name: 'IKEA',
      logo: '🏠',
      product: '🪑',
      logoColor: 'bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg',
      productColor: 'text-9xl',
      logoTextColor: 'text-white',
      logoSize: 'w-20 h-20'
    },
    {
      name: 'AliExpress',
      logo: '📦',
      product: '🧳',
      logoColor: 'bg-gradient-to-br from-red-400 to-red-600 shadow-lg',
      productColor: 'text-9xl',
      logoTextColor: 'text-white',
      logoSize: 'w-20 h-20'
    },
    {
      name: 'Namshi',
      logo: '🛍️',
      product: '🎧',
      logoColor: 'bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg',
      productColor: 'text-9xl',
      logoTextColor: 'text-white',
      logoSize: 'w-20 h-20'
    }
  ];

  // Handle browse brands action
  const handleBrowseBrands = () => {
    // Scroll to brands section or navigate to brands page
    window.scrollTo({
      top: sectionRef.current?.offsetTop || 0,
      behavior: 'smooth'
    });
  };

  // Client-side detection
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Dynamic GSAP import
    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        
        gsap.registerPlugin(ScrollTrigger);

        const titleElement = titleRef.current;
        const subtitleElement = subtitleRef.current;
        const buttonElement = buttonRef.current;
        const cardElements = cardsRef.current.filter(Boolean);

        // Title animation
        if (titleElement) {
          gsap.from(titleElement, {
            scrollTrigger: {
              trigger: titleElement,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power3.out",
          });
        }

        // Subtitle animation
        if (subtitleElement) {
          gsap.from(subtitleElement, {
            scrollTrigger: {
              trigger: subtitleElement,
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

        // Button animation
        if (buttonElement) {
          gsap.from(buttonElement, {
            scrollTrigger: {
              trigger: buttonElement,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 0.4,
            ease: "power3.out",
          });
        }

        // Cards animation with stagger effect
        if (cardElements.length > 0) {
          gsap.from(cardElements, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 100,
            scale: 0.8,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)",
          });
        }

        return () => {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
      } catch (error) {
        console.warn("GSAP not available, animations will be disabled");
      }
    };

    loadGSAP();
  }, [isClient, isRTL]);

  // Safety check for translations
  const title = t?.shopBrands?.title || "Shop your favorite stores and pay in up to 24 months";
  const subtitle = t?.shopBrands?.subtitle || "Stay up to date with the latest offers and new stores. Shop with ease using DaftarPay's flexible payment plans.";
  const buttonText = t?.shopBrands?.button || "Browse Brands";

  // Show loading state during hydration
  if (!isClient) {
    return (
      <section className={`py-24 sm:py-32 lg:py-40 bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 ${isRTL ? 'rtl' : 'ltr'} relative overflow-hidden`}>
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${isRTL ? 'rtl' : 'ltr'}`}>
          <div className={`${isRTL ? 'text-right' : 'text-center'} mb-16 sm:mb-20 ${isRTL ? 'font-ping' : 'font-sans'}`}>
            <h1 className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight ${isRTL ? 'leading-relaxed' : 'leading-tight'} bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 dark:from-white dark:via-purple-100 dark:to-indigo-100 bg-clip-text text-transparent mb-8 drop-shadow-sm`}>
              {title}
            </h1>
            <p className={`text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto ${isRTL ? 'leading-loose' : 'leading-relaxed'} font-medium`}>
              {subtitle}
            </p>
            <div className={`mt-8 ${isRTL ? 'text-right' : 'text-center'}`}>
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold text-lg rounded-full shadow-xl transition-all duration-300">
                {buttonText}
              </button>
            </div>
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
              {(isRTL ? [...brands].reverse() : brands).map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  className="w-full aspect-[3/4] bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden border-2 border-purple-200 dark:border-purple-700"
                >
                  <div className={`absolute top-8 z-10 ${isRTL ? 'right-8' : 'left-8'}`}>
                    <div className={`${brand.logoSize} ${brand.logoColor} rounded-full flex items-center justify-center`}>
                      <span className={`text-sm font-bold ${brand.logoTextColor}`}>
                        {brand.logo}
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`${brand.productColor}`}>
                      {brand.product}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {isRTL && (
        <style jsx>{`
          .rtl h1, .rtl h2, .rtl h3, .rtl h4, .rtl h5, .rtl h6 {
            line-height: 1.8 !important;
            padding-bottom: 2.5rem !important;
            padding-top: 1rem !important;
            margin-bottom: 2rem !important;
            overflow: visible !important;
            min-height: auto !important;
            height: auto !important;
          }
          .rtl p, .rtl span {
            line-height: 2.2 !important;
            padding-bottom: 1rem !important;
            padding-top: 0.5rem !important;
            overflow: visible !important;
            margin-bottom: 1rem !important;
          }
          .rtl * {
            overflow: visible !important;
            text-overflow: unset !important;
            white-space: normal !important;
          }
          .rtl {
            overflow: visible !important;
          }
        `}</style>
      )}
      <section 
        ref={sectionRef} 
        className={`py-24 sm:py-32 lg:py-40 bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 ${isRTL ? 'rtl' : 'ltr'} relative overflow-hidden`}
        dir={isRTL ? 'rtl' : 'ltr'}
        style={isRTL ? { 
          lineHeight: '1.8',
          paddingBottom: '3rem',
          paddingTop: '2rem',
          overflow: 'visible'
        } : {}}
      >
        {/* Modern Background Pattern */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-transparent to-indigo-100/30"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-indigo-400 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute bottom-20 left-1/4 w-1 h-1 bg-purple-300 rounded-full animate-ping opacity-50"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-indigo-300 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute bottom-1/3 right-10 w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce opacity-40"></div>
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${isRTL ? 'rtl' : 'ltr'}`}>
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`${isRTL ? 'text-right' : 'text-center'} mb-16 sm:mb-20 relative z-10 ${isRTL ? 'font-ping' : 'font-sans'} ${isRTL ? 'rtl' : 'ltr'}`}
            style={isRTL ? { 
              lineHeight: '2.0',
              paddingBottom: '2.5rem',
              paddingTop: '1.5rem',
              overflow: 'visible'
            } : {}}
          >
            <h1 
              ref={titleRef}
              className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight ${isRTL ? 'leading-relaxed' : 'leading-tight'} bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 dark:from-white dark:via-purple-100 dark:to-indigo-100 bg-clip-text text-transparent mb-8 ${isRTL ? 'py-8 pb-12' : 'py-6'} ${isRTL ? 'font-ping' : 'font-sans'} ${isRTL ? 'text-right' : 'text-center'} ${isRTL ? 'px-4' : ''} drop-shadow-sm`}
              style={isRTL ? { 
                lineHeight: '1.8',
                paddingBottom: '3rem',
                paddingTop: '1.5rem',
                minHeight: 'auto',
                height: 'auto',
                overflow: 'visible'
              } : {}}
            >
              {title}
            </h1>
            
            <motion.p 
              ref={subtitleRef}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto ${isRTL ? 'leading-loose' : 'leading-relaxed'} font-medium ${isRTL ? 'font-ping' : 'font-sans'} ${isRTL ? 'text-right' : 'text-center'} ${isRTL ? 'px-4 py-4' : ''}`}
              style={isRTL ? { 
                lineHeight: '2.2',
                paddingBottom: '2rem',
                paddingTop: '1rem',
                overflow: 'visible'
              } : {}}
            >
              {subtitle}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              ref={buttonRef}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className={`mt-8 ${isRTL ? 'text-right' : 'text-center'}`}
            >
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Browse all brands and stores"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleBrowseBrands()}
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-800 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 backdrop-blur-sm border border-purple-500/20 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50"
            >
              {buttonText}
            </motion.button>
            </motion.div>
          </motion.div>


          {/* Brand Cards */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
              {console.log('Brands array:', brands, 'Count:', brands.length)}
              {(isRTL ? [...brands].reverse() : brands).map((brand, index) => (
                <motion.div
                  key={`${brand.name}-${index}`}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  whileHover={{ scale: 1.05, y: -10, rotateY: 5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full aspect-[3/4] bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer relative overflow-hidden group border-2 border-purple-200 dark:border-purple-700"
                  role="button"
                  tabIndex={0}
                  aria-label={`Shop at ${brand.name} - ${brand.product}`}
                  onKeyDown={(e) => e.key === 'Enter' && handleBrowseBrands()}
                >
                  {/* Brand Logo */}
                  <div className={`absolute top-8 z-10 ${isRTL ? 'right-8' : 'left-8'}`}>
                    <div className={`${brand.logoSize} ${brand.logoColor} rounded-full flex items-center justify-center`}>
                      <span className={`text-sm font-bold ${brand.logoTextColor}`}>
                        {brand.logo}
                      </span>
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`${brand.productColor} group-hover:scale-110 transition-transform duration-500`}>
                      {brand.product}
                    </div>
                  </div>

                  {/* Modern Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Glassmorphism Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-gray-800/20 rounded-3xl" />

                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
