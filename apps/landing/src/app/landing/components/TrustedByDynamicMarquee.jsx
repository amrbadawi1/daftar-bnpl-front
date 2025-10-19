'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function TrustedByDynamicMarquee({ t }) {
  const marqueeRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const marquee = marqueeRef.current;
    
    if (!track || !marquee) return;

    // Get the width of the content
    const contentWidth = track.scrollWidth / 2; // Divide by 2 because we duplicate the content
    
    // Create the infinite scroll animation
    const animate = () => {
      gsap.fromTo(track, 
        { x: 0 },
        { 
          x: -contentWidth,
          duration: contentWidth / 50, // Adjust speed based on content width
          ease: "none",
          onComplete: () => {
            gsap.set(track, { x: 0 });
            animate();
          }
        }
      );
    };

    // Start the animation
    animate();

    // Mouse tracking for speed adjustment
    const handleMouseMove = (e) => {
      const rect = marquee.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const centerX = rect.width / 2;
      const speedMultiplier = 1 + (mouseX - centerX) / centerX * 0.5; // Range: 0.5 to 1.5
      
      gsap.globalTimeline.timeScale(speedMultiplier);
    };

    const handleMouseLeave = () => {
      gsap.globalTimeline.timeScale(1);
    };

    marquee.addEventListener('mousemove', handleMouseMove);
    marquee.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      marquee.removeEventListener('mousemove', handleMouseMove);
      marquee.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(track);
    };
  }, []);

  const partners = t.trustedBy.partners;

  return (
    <section className="py-16 bg-white dark:bg-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.trustedBy.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto"></div>
        </div>

        <div 
          ref={marqueeRef}
          className="relative overflow-hidden cursor-none"
        >
          <div 
            ref={trackRef}
            className="flex items-center space-x-16 lg:space-x-24"
            style={{ width: 'max-content' }}
          >
            {/* First set of logos */}
            {partners.map((partner, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-400 dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300 filter grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100">
                  {partner}
                </div>
              </div>
            ))}
            
            {/* Second set of logos (for seamless loop) */}
            {partners.map((partner, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-400 dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300 filter grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100">
                  {partner}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-gray-800 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-gray-800 to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
}
