'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Smartphone, Store } from 'lucide-react';

export default function FeaturesSection({ t, locale = 'en' }) {
  const isRTL = locale === 'ar';
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [imageLoading, setImageLoading] = useState({});
  const [imageError, setImageError] = useState({});
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const carouselRef = useRef(null);
  
  const features = [
    {
      id: 'checkout',
      title: t.features.checkout.title,
      description: t.features.checkout.description,
      cta: t.features.checkout.cta,
      image: 'https://images.ctfassets.net/31h9ykss8g0q/1G3P0nw3oOzLxdqXk4bdim/6efb3f3f939d87a02132f9fc77479075/AtcheckoutAU.png?w=2000&q=80&fm=avif',
      alt: 'DaftarPay BNPL checkout experience - split payments into 4 installments',
      icon: ShoppingCart,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'from-pink-400/20 to-rose-400/20',
      iconColor: 'text-pink-600'
    },
    {
      id: 'app',
      title: t.features.app.title,
      description: t.features.app.description,
      cta: t.features.app.cta,
      image: 'https://images.ctfassets.net/31h9ykss8g0q/6m0vjb0jOM83Tbc5dJl3Ir/559bbdcd84a03e5c57ceaa987c4524c3/UK_Use_Klarna_everywhere_-_app?w=2000&q=80&fm=avif',
      alt: 'DaftarPay mobile app - discover stores and manage payments',
      icon: Smartphone,
      color: 'from-purple-500 to-violet-500',
      bgColor: 'from-purple-400/20 to-violet-400/20',
      iconColor: 'text-purple-600'
    },
    {
      id: 'instore',
      title: t.features.instore.title,
      description: t.features.instore.description,
      cta: t.features.instore.cta,
      image: 'https://images.ctfassets.net/31h9ykss8g0q/oSBkzm3Z1qk4sSQlAcQkD/2314438bee46ff39252ceb06f5d1e9a2/steps-otc_en-US.png?w=2000&q=80&fm=avif',
      alt: 'DaftarPay in-store payment - use virtual card at participating retailers',
      icon: Store,
      color: 'from-emerald-500 to-green-500',
      bgColor: 'from-emerald-400/20 to-green-400/20',
      iconColor: 'text-emerald-600'
    }
  ];

  // Touch gesture handlers for mobile carousel
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
    if (isRightSwipe && carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  // Image loading handlers
  const handleImageLoad = (index) => {
    setImageLoading(prev => ({ ...prev, [index]: false }));
  };

  const handleImageError = (index) => {
    setImageError(prev => ({ ...prev, [index]: true }));
    setImageLoading(prev => ({ ...prev, [index]: false }));
  };

  // Keyboard navigation
  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setHoveredIndex(hoveredIndex === index ? null : index);
    }
  };

  // Skeleton loader component
  const SkeletonLoader = ({ className = "" }) => (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl ${className}`}>
      <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-2xl"></div>
    </div>
  );

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-20 text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block"
          >
            <h2 className={`text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent mb-8 py-4 ${isRTL ? 'font-ping' : 'font-sans'}`}>
              {t.features.title}
            </h2>
          </motion.div>
        </motion.div>

        {/* Desktop Grid Layout */}
        <div className="hidden lg:flex lg:flex-row gap-8 lg:gap-10 justify-center">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer relative focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-2xl"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={0}
              role="button"
              aria-label={`${feature.title} - ${feature.description}`}
              animate={{
                width: hoveredIndex === index ? '450px' : hoveredIndex !== null ? '280px' : '350px',
                flexGrow: hoveredIndex === index ? 1.3 : hoveredIndex !== null ? 0.8 : 1
              }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: "easeOut",
                type: "spring", 
                stiffness: 300, 
                damping: 25
              }}
            >
              <div className="flex flex-col h-full">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                  {/* Loading skeleton */}
                  {imageLoading[index] && <SkeletonLoader className="h-96" />}
                  
                  {/* Error state */}
                  {imageError[index] ? (
                    <div className="h-96 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <feature.icon className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Image unavailable</p>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={feature.image}
                      alt={feature.alt}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 1200px) 400px, 500px"
                      onLoad={() => handleImageLoad(index)}
                      onError={() => handleImageError(index)}
                    />
                  )}
                </div>
                
                <div className={`mt-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.bgColor} flex items-center justify-center mr-4 ${isRTL ? 'ml-4 mr-0' : 'mr-4'}`}>
                      <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                    </div>
                    <h5 className={`text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white ${isRTL ? 'font-ping' : 'font-sans'}`}>
                      {feature.title}
                    </h5>
                  </div>
                  
                  <motion.span 
                    className={`text-body-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6 block ${isRTL ? 'font-ping' : 'font-sans'}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredIndex === index ? 1 : 0,
                      height: hoveredIndex === index ? 'auto' : 0
                    }}
                    transition={{ 
                      duration: 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    {feature.description}
                  </motion.span>
                  
                  <Link 
                    href={feature.id === 'app' ? '/api/download' : '#'}
                    className={`inline-flex items-center text-gray-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 font-semibold text-body-lg transition-colors duration-200 ${isRTL ? 'font-ping' : 'font-sans'}`}
                    aria-label={`${feature.cta} - ${feature.title}`}
                  >
                    {feature.cta}
                    <svg 
                      className={`w-6 h-6 sm:w-7 sm:h-7 ${isRTL ? 'mr-3' : 'ml-3'}`} 
                      aria-hidden="true" 
                      fill="currentColor" 
                      preserveAspectRatio="none" 
                      viewBox="0 0 24 24"
                      style={{ transform: isRTL ? 'scaleX(-1)' : 'scaleX(1)' }}
                    >
                      <path d="M20.3434 11.1507C19.1518 10.2916 18.0078 9.32333 16.9436 8.2716C15.7966 7.1393 14.7273 5.89346 13.7642 4.57001L12.0665 5.80632C13.0962 7.22133 14.2403 8.55358 15.4678 9.76572C15.8932 10.1861 16.358 10.5578 16.8058 10.9522H3.22998V13.0528H16.8055C16.3576 13.4472 15.8929 13.8189 15.4671 14.2393C14.2403 15.4514 13.0963 16.7837 12.0665 18.1987L13.7642 19.435C14.7273 18.1115 15.7967 16.8657 16.9429 15.7334C18.0078 14.6817 19.1518 13.7134 20.3435 12.8543C20.6174 12.6573 20.78 12.3402 20.78 12.0025C20.78 11.6649 20.6174 11.3477 20.3434 11.1507Z"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile/Tablet Carousel */}
        <div className="lg:hidden">
          {/* Carousel Container */}
          <div 
            ref={carouselRef}
            className={`flex gap-4 overflow-x-auto pb-4 scrollbar-hide ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
            style={{ 
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group cursor-pointer flex-shrink-0 w-72 relative focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-xl"
                style={{ scrollSnapAlign: 'start' }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                tabIndex={0}
                role="button"
                aria-label={`${feature.title} - ${feature.description}`}
                animate={{
                  scale: hoveredIndex === index ? 1.02 : 1,
                  y: hoveredIndex === index ? -2 : 0
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  ease: "easeOut",
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25
                }}
              >
                <div className="flex flex-col h-full">
                  <div className="relative h-48 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
                    {/* Loading skeleton */}
                    {imageLoading[index] && <SkeletonLoader className="h-48" />}
                    
                    {/* Error state */}
                    {imageError[index] ? (
                      <div className="h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-2 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <feature.icon className="w-6 h-6 text-gray-400" />
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Image unavailable</p>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={feature.image}
                        alt={feature.alt}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        priority={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                        sizes="288px"
                        onLoad={() => handleImageLoad(index)}
                        onError={() => handleImageError(index)}
                      />
                    )}
                  </div>
                  
                  <div className={`mt-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-center mb-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.bgColor} flex items-center justify-center mr-3 ${isRTL ? 'ml-3 mr-0' : 'mr-3'}`}>
                        <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
                      </div>
                      <h5 className={`text-lg font-bold text-gray-900 dark:text-white ${isRTL ? 'font-ping' : 'font-sans'}`}>
                        {feature.title}
                      </h5>
                    </div>
                    
                    <motion.span 
                      className={`text-body-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 block ${isRTL ? 'font-ping' : 'font-sans'}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: hoveredIndex === index ? 1 : 0,
                        height: hoveredIndex === index ? 'auto' : 0
                      }}
                      transition={{ 
                        duration: 0.3,
                        ease: "easeInOut"
                      }}
                    >
                      {feature.description}
                    </motion.span>
                    
                    <Link 
                      href={feature.id === 'app' ? '/api/download' : '#'}
                      className={`inline-flex items-center text-gray-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 font-semibold text-body-md transition-colors duration-200 ${isRTL ? 'font-ping' : 'font-sans'}`}
                      aria-label={`${feature.cta} - ${feature.title}`}
                    >
                      {feature.cta}
                      <svg 
                        className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'}`} 
                        aria-hidden="true" 
                        fill="currentColor" 
                        preserveAspectRatio="none" 
                        viewBox="0 0 24 24"
                        style={{ transform: isRTL ? 'scaleX(-1)' : 'scaleX(1)' }}
                      >
                        <path d="M20.3434 11.1507C19.1518 10.2916 18.0078 9.32333 16.9436 8.2716C15.7966 7.1393 14.7273 5.89346 13.7642 4.57001L12.0665 5.80632C13.0962 7.22133 14.2403 8.55358 15.4678 9.76572C15.8932 10.1861 16.358 10.5578 16.8058 10.9522H3.22998V13.0528H16.8055C16.3576 13.4472 15.8929 13.8189 15.4671 14.2393C14.2403 15.4514 13.0963 16.7837 12.0665 18.1987L13.7642 19.435C14.7273 18.1115 15.7967 16.8657 16.9429 15.7334C18.0078 14.6817 19.1518 13.7134 20.3435 12.8543C20.6174 12.6573 20.78 12.3402 20.78 12.0025C20.78 11.6649 20.6174 11.3477 20.3434 11.1507Z"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {features.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  hoveredIndex === index 
                    ? 'bg-pink-500 w-8' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
