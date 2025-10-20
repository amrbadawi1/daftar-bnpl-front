'use client';

import { ShoppingBag, Calendar, CheckCircle, CreditCard } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks({ t, locale = 'en' }) {
  const isRTL = locale === 'ar';
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  const steps = [
    {
      icon: ShoppingBag,
      title: t?.howItWorks?.steps?.[0]?.title || "Shop & Select",
      description: t?.howItWorks?.steps?.[0]?.description || "Browse your favorite stores and add items to your cart. Choose PayLater at checkout.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      darkBgColor: "from-blue-900/20 to-cyan-900/20",
    },
    {
      icon: Calendar,
      title: t?.howItWorks?.steps?.[1]?.title || "Split Your Payment",
      description: t?.howItWorks?.steps?.[1]?.description || "Automatically split your purchase into 4 equal payments over 6 weeks. No interest, no fees.",
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50",
      darkBgColor: "from-emerald-900/20 to-teal-900/20",
    },
    {
      icon: CheckCircle,
      title: t?.howItWorks?.steps?.[2]?.title || "Enjoy Your Purchase",
      description: t?.howItWorks?.steps?.[2]?.description || "Get your items immediately and pay over time. Manage everything in our easy-to-use app.",
      color: "from-violet-500 to-purple-500",
      bgColor: "from-violet-50 to-purple-50",
      darkBgColor: "from-violet-900/20 to-purple-900/20",
    },
    {
      icon: CreditCard,
      title: t?.howItWorks?.steps?.[3]?.title || "No Fees",
      description: t?.howItWorks?.steps?.[3]?.description || "Pay monthly with zero hidden charges.",
      color: "from-amber-500 to-orange-500",
      bgColor: "from-amber-50 to-orange-50",
      darkBgColor: "from-amber-900/20 to-orange-900/20",
    },
  ];

  useEffect(() => {
    const stepElements = stepsRef.current;
    const titleElement = titleRef.current;
    const subtitleElement = subtitleRef.current;

    // Title and subtitle animations
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

    // Enhanced step animations
    stepElements.forEach((step, index) => {
      if (step) {
        const stepContent = step.querySelector('.step-content');
        const stepIcon = step.querySelector('.step-icon');
        const stepNumber = step.querySelector('.step-number');

        // Main step animation
        gsap.from(step, {
          scrollTrigger: {
            trigger: step,
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
        });

        // Step number animation
        if (stepNumber) {
          gsap.from(stepNumber, {
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            scale: 0,
            rotation: 180,
            duration: 0.6,
            delay: 0.2,
            ease: "back.out(1.7)",
          });
        }

        // Step content animation
        if (stepContent) {
          gsap.from(stepContent, {
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            x: isRTL ? (index % 2 === 0 ? 50 : -50) : (index % 2 === 0 ? -50 : 50),
            duration: 0.8,
            delay: 0.3,
            ease: "power3.out",
          });
        }

        // Step icon animation
        if (stepIcon) {
          gsap.from(stepIcon, {
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            scale: 0.5,
            rotation: 45,
            duration: 0.8,
            delay: 0.4,
            ease: "power3.out",
          });
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isRTL]);

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
          h5 {
            line-height: 1.3 !important;
            padding-bottom: 0.4rem !important;
            padding-top: 0.2rem !important;
            margin-bottom: 0.5rem !important;
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
      `}</style>
      <section 
        id="how-it-works" 
        ref={sectionRef} 
        className={`py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 ${isRTL ? 'rtl' : 'ltr'}`}
        dir={isRTL ? 'rtl' : 'ltr'}
        style={isRTL ? { 
          lineHeight: '1.8',
          paddingBottom: '3rem',
          paddingTop: '2rem',
          overflow: 'visible'
        } : {}}
      >
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${isRTL ? 'rtl' : 'ltr'}`}>
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className={`text-center mb-20 sm:mb-24 lg:mb-32 relative z-10 ${isRTL ? 'font-ping' : 'font-poppins'} ${isRTL ? 'rtl' : 'ltr'}`}
          style={isRTL ? { 
            lineHeight: '2.0',
            paddingBottom: '2.5rem',
            paddingTop: '1.5rem',
            overflow: 'visible'
          } : {}}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block"
          >
            <h1 
              ref={titleRef}
              className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight ${isRTL ? 'leading-relaxed' : 'leading-tight'} bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent mb-8 ${isRTL ? 'py-8 pb-12' : 'py-6'} ${isRTL ? 'font-ping' : 'font-poppins'} ${isRTL ? 'text-right' : 'text-center'} ${isRTL ? 'px-4' : ''}`}
              style={isRTL ? { 
                lineHeight: '1.8',
                paddingBottom: '3rem',
                paddingTop: '1.5rem',
                minHeight: 'auto',
                height: 'auto',
                overflow: 'visible'
              } : {}}
            >
              {t?.howItWorks?.title || "How It Works"}
            </h1>
          </motion.div>
          <motion.p 
            ref={subtitleRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto ${isRTL ? 'leading-loose' : 'leading-relaxed'} font-medium ${isRTL ? 'font-ping' : 'font-poppins'} ${isRTL ? 'text-right' : 'text-center'} ${isRTL ? 'px-4 py-4' : ''}`}
            style={isRTL ? { 
              lineHeight: '2.2',
              paddingBottom: '2rem',
              paddingTop: '1rem',
              overflow: 'visible'
            } : {}}
          >
            {t?.howItWorks?.subtitle || "Get started in three simple steps and enjoy flexible payments today"}
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto space-y-20 sm:space-y-24 lg:space-y-28">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) stepsRef.current[index] = el;
                }}
                className={`flex flex-col ${
                  isRTL 
                    ? (index % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row")
                    : (index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse")
                } items-center gap-8 lg:gap-12 xl:gap-16`}
              >
                {/* Content Side */}
                <motion.div 
                  initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                  className={`flex-1 ${isRTL ? 'text-right' : 'text-center lg:text-left'} ${isRTL ? 'font-ping' : 'font-poppins'} ${isRTL ? 'pr-4 pl-2' : 'pl-4 pr-2'}`}
                  style={isRTL ? { 
                    lineHeight: '1.8',
                    paddingBottom: '2rem',
                    paddingTop: '1rem',
                    overflow: 'visible'
                  } : {}}
                >
                  <div className="step-content" style={{ 
                    paddingBottom: '1rem',
                    overflow: 'visible'
                  }}>
                    <motion.div 
                      initial={{ scale: 0, rotation: 180 }}
                      whileInView={{ scale: 1, rotation: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2, ease: "back.out(1.7)" }}
                      className={`step-number inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br ${step.color} text-white text-2xl sm:text-3xl font-bold mb-6 shadow-xl ring-4 ring-white/20 dark:ring-gray-800/20 ${isRTL ? 'ml-4 mr-2' : 'mr-4 ml-2'}`}
                    >
                      {index + 1}
                    </motion.div>
                    <motion.h5 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3, ease: "power3.out" }}
                      className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black mb-4 sm:mb-6 ${isRTL ? 'leading-relaxed' : 'leading-tight'} text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 ${isRTL ? 'text-right' : 'text-left'} ${isRTL ? 'px-2 py-4' : 'py-2'}`}
                      style={{ 
                        lineHeight: isRTL ? '1.4' : '1.3',
                        paddingBottom: isRTL ? '0.6rem' : '0.4rem',
                        paddingTop: isRTL ? '0.4rem' : '0.2rem',
                        overflow: 'visible',
                        minHeight: 'auto',
                        height: 'auto'
                      }}
                    >
                      {step.title}
                    </motion.h5>
                    <motion.span 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4, ease: "power3.out" }}
                      className={`text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 ${isRTL ? 'leading-loose' : 'leading-relaxed'} block max-w-lg font-medium ${isRTL ? 'text-right' : 'text-left'} ${isRTL ? 'px-2 py-2' : ''}`}
                      style={isRTL ? { 
                        lineHeight: '2.2',
                        paddingBottom: '1.5rem',
                        paddingTop: '0.5rem',
                        overflow: 'visible'
                      } : {}}
                    >
                      {step.description}
                    </motion.span>
                  </div>
                </motion.div>

                {/* Icon Side */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5, rotation: 45 }}
                  whileInView={{ opacity: 1, scale: 1, rotation: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "power3.out" }}
                  className="flex-1 flex justify-center"
                >
                  <div className={`step-icon relative w-full h-[400px] sm:h-[500px] lg:h-[600px] backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-105`}>
                    {/* Glassmorphism Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-gray-800/20" />
                    
                    {/* Icon Container */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`bg-gradient-to-br ${step.bgColor} dark:${step.darkBgColor} rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl ring-1 ring-white/10 dark:ring-gray-700/20`}>
                        <Icon className={`h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 bg-gradient-to-br ${step.color} bg-clip-text text-transparent`} 
                              style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} />
                      </div>
                    </div>
                    
                    {/* Modern Glow Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 sm:mt-20"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 ring-4 ring-white/20 dark:ring-gray-800/20 backdrop-blur-sm"
          >
            <span className="text-lg font-bold">Ready to get started?</span>
            <CheckCircle className="h-6 w-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
    </>
  );
}
