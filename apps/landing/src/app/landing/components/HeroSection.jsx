'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import QRCodeComponent from './QRCodeComponent';

export default function HeroSection({ t, locale = 'en' }) {
  const isRTL = locale === 'ar';
  
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://scdn.tabby.ai/images/cbjxg0yl/v2/492023113329b40006241a553c1271aacac97c25-2880x960.png"
          alt="DaftarPay BNPL Buy Now Pay Later flexible payment solution background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Semi-transparent overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 dark:from-black/40 dark:via-black/30 dark:to-black/50" />
      </div>

      {/* Overlay Content */}
      <div className={`relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col items-center ${isRTL ? 'text-right' : 'text-center'} lg:${isRTL ? 'text-right' : 'text-center'}`}>
        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-display-sm sm:text-display-md lg:text-display-lg font-black mb-6 text-white dark:text-white drop-shadow-lg ${isRTL ? 'font-ping' : 'font-poppins'}`}
        >
          {t.hero.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`text-body-lg sm:text-body-xl mb-12 max-w-3xl text-white/90 dark:text-white/90 ${isRTL ? 'font-ping' : 'font-poppins'}`}
        >
          {t.hero.subtitle}
        </motion.p>

        {/* QR Code + App Info Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl p-8 shadow-2xl"
        >
          <div className={`flex flex-col sm:flex-row items-center gap-8 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            {/* QR Code */}
            <div className="flex-shrink-0">
              <QRCodeComponent
                value={`${typeof window !== 'undefined' ? window.location.origin : 'https://daftarpay.com'}/api/download`}
                size={140}
                showPulse={false}
                className="w-32 h-32"
              />
            </div>

            {/* App Info Content */}
            <div className={`text-white dark:text-white ${isRTL ? 'text-right' : 'text-left'} flex-1`}>
              <h3 className={`text-display-sm font-bold mb-3 ${isRTL ? 'font-ping' : 'font-poppins'}`}>
                {t.hero.appTitle}
              </h3>
              <p className="text-white/80 dark:text-white/80 text-body-sm mb-6">
                {t.hero.ratingText}: ⭐ 4.8
              </p>
              
              {/* CTA Button */}
              <Link 
                href="/api/download"
                className={`inline-flex items-center justify-center px-8 py-4 bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 border border-white/30 dark:border-white/20 rounded-xl font-semibold text-white dark:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm text-body-md ${isRTL ? 'font-ping' : 'font-poppins'}`}
              >
                {t.hero.cta}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
