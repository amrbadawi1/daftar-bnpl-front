'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ServicesSection({ t, locale = 'en' }) {
  const isRTL = locale === 'ar';
  const [activeStep, setActiveStep] = useState(0);
  const [imageLoading, setImageLoading] = useState({});
  const [imageError, setImageError] = useState({});
  const [isClient, setIsClient] = useState(false);
  const stepRefs = useRef([]);
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const imageContainerRef = useRef(null);

  const steps = t.services.steps;

  // Ensure client-side rendering with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClient(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Scroll-based step navigation
  useEffect(() => {
    if (!isClient || typeof window === 'undefined') return;
    
    let isScrolling = false;
    let scrollTimeout;

    const handleWheel = (e) => {
      if (isScrolling) return;
      
      e.preventDefault();
      isScrolling = true;
      
      const deltaY = e.deltaY;
      const currentStep = activeStep;
      let nextStep = currentStep;

      if (deltaY > 0 && currentStep < steps.length - 1) {
        // Scroll down - go to next step
        nextStep = currentStep + 1;
      } else if (deltaY < 0 && currentStep > 0) {
        // Scroll up - go to previous step
        nextStep = currentStep - 1;
      }

      if (nextStep !== currentStep) {
        setActiveStep(nextStep);
        if (stepRefs.current[nextStep]) {
          stepRefs.current[nextStep].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }

      // Reset scrolling flag after delay
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 1000);
    };

    // Add wheel event listener to the section
    const section = containerRef.current;
    if (section) {
      section.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (section) {
        section.removeEventListener('wheel', handleWheel);
      }
      clearTimeout(scrollTimeout);
    };
  }, [activeStep, steps.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        if (activeStep < steps.length - 1) {
          const nextStep = activeStep + 1;
          setActiveStep(nextStep);
          if (stepRefs.current[nextStep]) {
            stepRefs.current[nextStep].scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        if (activeStep > 0) {
          const prevStep = activeStep - 1;
          setActiveStep(prevStep);
          if (stepRefs.current[prevStep]) {
            stepRefs.current[prevStep].scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeStep, steps.length, isClient]);

  // Touch/swipe navigation for mobile
  useEffect(() => {
    if (!isClient || typeof window === 'undefined') return;
    
    let startY = 0;
    let startX = 0;

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      const endY = e.changedTouches[0].clientY;
      const endX = e.changedTouches[0].clientX;
      const deltaY = startY - endY;
      const deltaX = startX - endX;

      // Check if it's a vertical swipe (more vertical than horizontal movement)
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && activeStep < steps.length - 1) {
          // Swipe up - go to next step
          const nextStep = activeStep + 1;
          setActiveStep(nextStep);
          if (stepRefs.current[nextStep]) {
            stepRefs.current[nextStep].scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }
        } else if (deltaY < 0 && activeStep > 0) {
          // Swipe down - go to previous step
          const prevStep = activeStep - 1;
          setActiveStep(prevStep);
          if (stepRefs.current[prevStep]) {
            stepRefs.current[prevStep].scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }
        }
      }
    };

    const section = containerRef.current;
    if (section) {
      section.addEventListener('touchstart', handleTouchStart, { passive: true });
      section.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (section) {
        section.removeEventListener('touchstart', handleTouchStart);
        section.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [activeStep, steps.length, isClient]);

  // GSAP ScrollTrigger setup for smooth scroll with delay
  useGSAP(() => {
    if (!isClient || typeof window === 'undefined' || !containerRef.current) return;
    
    // Add a small delay to ensure refs are set and component is fully mounted
    const timeoutId = setTimeout(() => {
      if (!containerRef.current || !textContainerRef.current || !imageContainerRef.current) return;
       // Create ScrollTrigger for each step with collapse behavior
       stepRefs.current.forEach((ref, index) => {
         if (ref) {
           ScrollTrigger.create({
             trigger: ref,
             start: "top 90%", // Items start collapsing when they reach 90% of viewport
             end: "bottom 40%",
             scroller: containerRef.current,
             onEnter: () => {
               // Smooth transition to active step
               setActiveStep(index);
             },
             onEnterBack: () => {
               // Reset and activate step
               setActiveStep(index);
             },
             onLeave: () => {
               // No collapse animation to prevent heading cut-off
             },
             onLeaveBack: () => {
               // No collapse animation to prevent heading cut-off
             },
             markers: false
           });
         }
       });

      // Desktop: Enhanced pinning with parallax effects
      if (typeof window !== 'undefined' && window.innerWidth >= 1024 && textContainerRef.current && imageContainerRef.current) {
        ScrollTrigger.create({
          trigger: textContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: imageContainerRef.current,
          pinSpacing: false,
          scroller: containerRef.current,
          onUpdate: (self) => {
            // Parallax effect for image container
            const progress = self.progress;
            gsap.to(imageContainerRef.current, {
              y: progress * -30,
              rotationY: progress * 5,
              duration: 0.3,
              ease: "power2.out"
            });
          },
          markers: false
        });
      }
    }, 100);

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { scope: containerRef, dependencies: [isClient, steps] });

  const handleStepClick = (index) => {
    setActiveStep(index);
    if (stepRefs.current[index]) {
      stepRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleImageLoad = (index) => setImageLoading(prev => ({ ...prev, [index]: false }));
  const handleImageError = (index) => {
    setImageError(prev => ({ ...prev, [index]: true }));
    setImageLoading(prev => ({ ...prev, [index]: false }));
  };

  const SkeletonLoader = ({ className = "" }) => (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl ${className}`}>
      <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-2xl"></div>
    </div>
  );

  // Show loading state during hydration
  if (!isClient) {
    return (
      <section className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-white dark:bg-gray-900" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 animate-pulse"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mx-auto animate-pulse"></div>
          </div>
          <div className="hidden lg:flex gap-16 items-start">
            <div className="flex-1 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              ))}
            </div>
            <div className="flex-1 h-[500px] bg-gray-200 dark:bg-gray-700 rounded-3xl animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef}
      className="py-20 lg:py-32 relative"
    >
        {/* Modern Background */}
        <div className="absolute inset-0 bg-white dark:bg-gray-900" />
        
        {/* Modern Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/50 dark:bg-gray-700/50 z-50 backdrop-blur-sm">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 transition-all duration-500"
            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Modern Section Title */}
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
            <h2 className={`text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent mb-8 py-4 ${isRTL ? 'font-ping' : 'font-poppins'}`}>
              {t.services.title}
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium ${isRTL ? 'font-ping' : 'font-poppins'}`}
          >
            {t.services.subtitle}
          </motion.p>
        </motion.div>

        {/* Modern Desktop Layout */}
        <div className="hidden lg:flex gap-16 items-start relative z-10">
          {/* Enhanced Text Steps */}
          <div ref={textContainerRef} className={`flex-1 space-y-4 pt-32 pb-16 ${isRTL ? 'pl-4' : 'pr-4'}`}>
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                ref={el => stepRefs.current[index] = el}
                data-index={index}
                initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                className={`cursor-pointer group transition-all duration-500 py-4 ${activeStep===index ? 'opacity-100 scale-105':'opacity-60 hover:opacity-80 hover:scale-102'}`}
                onClick={() => handleStepClick(index)}
                role="button"
                tabIndex={0}
                aria-label={`Step ${index + 1}: ${step.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleStepClick(index);
                  }
                }}
              >
                <div className={`relative ${isRTL ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  
                  {/* Enhanced Typography */}
                  <motion.h3 
                    className={`font-bold transition-all duration-300 leading-relaxed py-2 ${
                      activeStep === index 
                        ? 'text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-4xl lg:text-5xl' 
                        : 'text-gray-500 dark:text-gray-400 text-3xl lg:text-4xl'
                    } ${isRTL ? 'font-ping':'font-poppins'}`}
                    whileHover={{ scale: 1.02 }}
                  >
                    {step.title}
                  </motion.h3>
                  
                  {step.subtitle && (
                    <motion.p 
                      className={`text-lg font-medium mt-2 transition-all duration-300 ${
                        activeStep === index 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-gray-400 dark:text-gray-500'
                      } ${isRTL ? 'font-ping':'font-poppins'}`}
                    >
                      {step.subtitle}
                    </motion.p>
                  )}
                  
                  <motion.p 
                    className={`text-base mt-2 leading-relaxed transition-all duration-300 ${
                      activeStep === index 
                        ? 'text-gray-700 dark:text-gray-300 opacity-100 max-h-96' 
                        : 'text-gray-500 dark:text-gray-400 opacity-0 max-h-0 overflow-hidden'
                    } ${isRTL ? 'font-ping':'font-poppins'}`}
                    animate={{
                      opacity: activeStep === index ? 1 : 0,
                      maxHeight: activeStep === index ? '24rem' : '0rem',
                      marginTop: activeStep === index ? '1rem' : '0rem'
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {step.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Modern Glassmorphism Image Container */}
          <div ref={imageContainerRef} className="flex-1 sticky top-4 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.8, y: 30, rotateY: -15, rotateX: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -30, rotateY: 15 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full h-[70vh] backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30 rounded-3xl shadow-2xl overflow-hidden"
              >
                {/* Glassmorphism Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-gray-800/20" />
                
                {isClient && imageLoading[activeStep] && <SkeletonLoader className="h-full" />}
                {isClient && imageError[activeStep] ? (
                  <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 font-medium">Image unavailable</p>
                    </div>
                  </div>
                ) : isClient && (
                  <Image
                    src={steps[activeStep].image}
                    alt={steps[activeStep].title}
                    fill
                    className="object-contain"
                    style={{ objectPosition: 'center' }}
                    priority={activeStep <= 1}
                    loading={activeStep <= 1 ? "eager" : "lazy"}
                    onLoad={() => handleImageLoad(activeStep)}
                    onError={() => handleImageError(activeStep)}
                  />
                )}
                
                {/* Modern Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        {/* Spacer to ensure last item is visible */}
        <div className="hidden lg:block h-32" />

        {/* Modern Mobile Layout */}
        <div className="lg:hidden space-y-8 relative z-10 pb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              ref={el => stepRefs.current[index] = el}
              data-index={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 ${
                activeStep === index 
                  ? 'ring-2 ring-blue-500/50 shadow-2xl shadow-blue-500/10' 
                  : 'hover:shadow-lg'
              }`}
              onClick={() => handleStepClick(index)}
              role="button"
              tabIndex={0}
              aria-label={`Step ${index + 1}: ${step.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleStepClick(index);
                }
              }}
            >

              {/* Mobile Image with Glassmorphism */}
              <div className="relative w-full h-[300px] mb-3 backdrop-blur-sm bg-white/5 dark:bg-gray-900/10 border border-white/10 dark:border-gray-700/20 rounded-2xl overflow-hidden">
                {imageLoading[index] && <SkeletonLoader className="h-full" />}
                {imageError[index] ? (
                  <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Image unavailable</p>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-contain object-top"
                    priority={index <= 1}
                    loading={index <= 1 ? 'eager' : 'lazy'}
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageError(index)}
                  />
                )}
              </div>

              {/* Mobile Content */}
              <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                <motion.h3 
                  className={`text-2xl sm:text-3xl font-bold mb-3 transition-all duration-300 ${
                    activeStep === index 
                      ? 'text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text' 
                      : 'text-gray-900 dark:text-white'
                  } ${isRTL ? 'font-ping' : 'font-poppins'}`}
                >
                  {step.title}
                </motion.h3>
                
                {step.subtitle && (
                  <motion.p 
                    className={`text-lg font-medium mb-3 transition-all duration-300 ${
                      activeStep === index 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-600 dark:text-gray-300'
                    } ${isRTL ? 'font-ping' : 'font-poppins'}`}
                  >
                    {step.subtitle}
                  </motion.p>
                )}
                
                <motion.p 
                  className={`text-base leading-relaxed transition-all duration-300 ${
                    activeStep === index 
                      ? 'text-gray-700 dark:text-gray-300 opacity-100 max-h-96' 
                      : 'text-gray-600 dark:text-gray-300 opacity-0 max-h-0 overflow-hidden'
                  } ${isRTL ? 'font-ping' : 'font-poppins'}`}
                  animate={{
                    opacity: activeStep === index ? 1 : 0,
                    maxHeight: activeStep === index ? '24rem' : '0rem',
                    marginTop: activeStep === index ? '1rem' : '0rem'
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {step.description}
                </motion.p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
