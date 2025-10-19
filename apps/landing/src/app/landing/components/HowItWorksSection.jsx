'use client';

import { ShoppingBag, Calendar, CheckCircle, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function HowItWorksSection({ t, locale = 'en' }) {
  const isRTL = locale === 'ar';
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  const steps = [
    {
      icon: ShoppingBag,
      title: t?.howItWorks?.steps?.shop?.title || "Shop & Select",
      description: t?.howItWorks?.steps?.shop?.description || "Browse your favorite stores and add items to your cart. Choose DaftarPay at checkout.",
      color: "from-pink-500 to-rose-500",
      bgColor: "from-pink-400/20 to-rose-400/20",
      iconColor: "text-pink-600",
      borderColor: "border-pink-100 dark:border-pink-900/50"
    },
    {
      icon: Calendar,
      title: t?.howItWorks?.steps?.split?.title || "Split Your Payment",
      description: t?.howItWorks?.steps?.split?.description || "Automatically split your purchase into 4 equal payments over 6 weeks. No interest, no fees.",
      color: "from-purple-500 to-violet-500",
      bgColor: "from-purple-400/20 to-violet-400/20",
      iconColor: "text-purple-600",
      borderColor: "border-purple-100 dark:border-purple-900/50"
    },
    {
      icon: CheckCircle,
      title: t?.howItWorks?.steps?.enjoy?.title || "Enjoy Your Purchase",
      description: t?.howItWorks?.steps?.enjoy?.description || "Get your items immediately and pay over time. Manage everything in our easy-to-use app.",
      color: "from-emerald-500 to-green-500",
      bgColor: "from-emerald-400/20 to-green-400/20",
      iconColor: "text-emerald-600",
      borderColor: "border-emerald-100 dark:border-emerald-900/50"
    },
    {
      icon: Zap,
      title: t?.howItWorks?.steps?.noFees?.title || "No Hidden Fees",
      description: t?.howItWorks?.steps?.noFees?.description || "Pay monthly with complete transparency. No surprises, just simple payments.",
      color: "from-orange-500 to-amber-500",
      bgColor: "from-orange-400/20 to-amber-400/20",
      iconColor: "text-orange-600",
      borderColor: "border-orange-100 dark:border-orange-900/50"
    },
  ];

  useEffect(() => {
    // Set client-side flag
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Dynamically import GSAP only on client side
    const initAnimations = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);

      // ===========================================
      // TITLE ANIMATION
      // ===========================================
      // Animate section title with smooth fade-in
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
        });
      }

      // ===========================================
      // STEPS ANIMATION WITH TIMELINE
      // ===========================================
      // Get all step elements using gsap.utils.toArray
      const stepElements = gsap.utils.toArray('.step');
      
      // Animate each step with timeline for child elements
      stepElements.forEach((step, index) => {
        // Create timeline for this step
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play none none reverse",
          }
        });

        // Set initial state for all child elements
        gsap.set(step, { opacity: 0, y: 50 });
        gsap.set(step.querySelector('.step-number'), { opacity: 0, scale: 0.5, rotation: -180 });
        gsap.set(step.querySelector('h5'), { opacity: 0, y: 30 });
        gsap.set(step.querySelector('span'), { opacity: 0, y: 20 });
        gsap.set(step.querySelector('svg'), { opacity: 0, scale: 0.8 });

        // Animate step container first
        tl.to(step, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.2, // Stagger delay between steps
        })
        // Then animate step number with rotation and scale
        .to(step.querySelector('.step-number'), {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
        }, "-=0.6") // Start 0.6s before previous animation ends
        // Then animate title (h5) with smooth transition
        .to(step.querySelector('h5'), {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
        }, "-=0.4") // Start 0.4s before previous animation ends
        // Then animate description (span) with smooth transition
        .to(step.querySelector('span'), {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        }, "-=0.3") // Start 0.3s before previous animation ends
        // Finally animate icon (svg) with bounce effect
        .to(step.querySelector('svg'), {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        }, "-=0.2"); // Start 0.2s before previous animation ends
      });

      return () => {
        // Clean up ScrollTrigger instances on unmount
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    };

    initAnimations();
  }, [isClient, isRTL]);

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
          id="how-it-works" 
          className="py-12 sm:py-16 lg:py-20"
        >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className={`text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent mb-8 py-4 ${isRTL ? 'font-ping' : 'font-sans'}`}>
              {t?.howItWorks?.title || "How It Works"}
            </h2>
            <span className={`text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium ${isRTL ? 'font-ping' : 'font-sans'}`}>
              {t?.howItWorks?.subtitle || "Get started in four simple steps and enjoy flexible payments today"}
            </span>
          </div>

          {/* Steps Container - Static render */}
          <div className="w-full max-w-7xl mx-auto space-y-12 sm:space-y-16 lg:space-y-20">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              const layoutDirection = isRTL 
                ? (isEven ? "md:flex-row-reverse" : "md:flex-row")
                : (isEven ? "md:flex-row" : "md:flex-row-reverse");

              return (
                <div
                  key={index}
                  className={`step flex flex-col ${layoutDirection} items-center gap-12 md:gap-16 lg:gap-20`}
                >
                  {/* Content Side */}
                  <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {/* Step Number */}
                    <div className={`step-number inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${step.color} text-white text-xl sm:text-2xl font-black mb-6 shadow-lg`}>
                      {index + 1}
                    </div>
                    
                    {/* Title */}
                    <h5 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text ${isRTL ? 'font-ping' : 'font-sans'}`}
                        style={{ 
                          lineHeight: isRTL ? '1.4' : '1.3',
                          paddingBottom: isRTL ? '0.6rem' : '0.4rem',
                          paddingTop: isRTL ? '0.4rem' : '0.2rem',
                          overflow: 'visible',
                          minHeight: 'auto',
                          height: 'auto'
                        }}>
                      {step.title}
                    </h5>
                    
                    {/* Description */}
                    <span className={`text-base leading-relaxed text-gray-700 dark:text-gray-300 ${isRTL ? 'font-ping' : 'font-sans'}`}>
                      {step.description}
                    </span>
                  </div>

                  {/* Icon Side */}
                  <div className="flex-1 flex justify-center">
                    <div className="relative group">
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500`} />
                      
                      {/* Icon Container */}
                      <div className={`relative bg-white/10 dark:bg-gray-900/20 backdrop-blur-xl rounded-3xl p-10 sm:p-12 lg:p-14 shadow-2xl group-hover:shadow-2xl transition-all duration-300 border border-white/20 dark:border-gray-700/30`}>
                        <Icon className={`h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 ${step.iconColor} dark:${step.iconColor.replace('600', '400')}`} strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
      `}</style>
      <section 
        id="how-it-works" 
        ref={sectionRef} 
        className="py-12 sm:py-16 lg:py-20"
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className={`text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent mb-8 py-4 ${isRTL ? 'font-ping' : 'font-sans'}`}>
            {t?.howItWorks?.title || "How It Works"}
          </h2>
          <span className={`text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium ${isRTL ? 'font-ping' : 'font-sans'}`}>
            {t?.howItWorks?.subtitle || "Get started in four simple steps and enjoy flexible payments today"}
          </span>
        </div>

        {/* Steps Container */}
        <div className="w-full max-w-7xl mx-auto space-y-12 sm:space-y-16 lg:space-y-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            const layoutDirection = isRTL 
              ? (isEven ? "md:flex-row-reverse" : "md:flex-row")
              : (isEven ? "md:flex-row" : "md:flex-row-reverse");

            return (
              <div
                key={index}
                className={`step flex flex-col ${layoutDirection} items-center gap-12 md:gap-16 lg:gap-20`}
              >
                {/* Content Side */}
                <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {/* Step Number */}
                  <div className={`step-number inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${step.color} text-white text-xl sm:text-2xl font-black mb-6 shadow-lg`}>
                    {index + 1}
                  </div>
                  
                  {/* Title */}
                  <h5 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text ${isRTL ? 'font-ping' : 'font-sans'}`}
                      style={{ 
                        lineHeight: isRTL ? '1.4' : '1.3',
                        paddingBottom: isRTL ? '0.6rem' : '0.4rem',
                        paddingTop: isRTL ? '0.4rem' : '0.2rem',
                        overflow: 'visible',
                        minHeight: 'auto',
                        height: 'auto'
                      }}>
                    {step.title}
                  </h5>
                  
                  {/* Description */}
                  <span className={`text-base leading-relaxed text-gray-700 dark:text-gray-300 ${isRTL ? 'font-ping' : 'font-sans'}`}>
                    {step.description}
                  </span>
                </div>

                {/* Icon Side */}
                <div className="flex-1 flex justify-center">
                  <div className="relative group">
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500`} />
                    
                    {/* Icon Container */}
                    <div className={`relative bg-white/10 dark:bg-gray-900/20 backdrop-blur-xl rounded-3xl p-10 sm:p-12 lg:p-14 shadow-2xl group-hover:shadow-2xl transition-all duration-300 border border-white/20 dark:border-gray-700/30`}>
                      <Icon className={`h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 ${step.iconColor} dark:${step.iconColor.replace('600', '400')}`} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    </>
  );
}