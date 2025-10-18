'use client';

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faDownload, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import DaftarPayLogo from './DaftarPayLogo';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);

  // Get current language from pathname
  const locale = pathname.includes('/ar') ? 'ar' : 'en';

  // Dark mode functionality
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleLang = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    const newPath = pathname.replace(/\/en|\/ar/, `/${newLocale}`);
    router.push(newPath);
  };

  // GSAP setup for desktop panels with hover delay
  const [openPanel, setOpenPanel] = useState('none'); // 'none' | 'pay' | 'biz'
  const payPanelRef = useRef(null);
  const bizPanelRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  // Handle panel hover with delay
  const handlePanelEnter = (panelName) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setOpenPanel(panelName);
  };

  const handlePanelLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenPanel('none');
    }, 200);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (openPanel === 'pay') {
        gsap.fromTo(
          payPanelRef.current,
          { y: -8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.2, ease: 'power2.out' }
        );
        gsap.fromTo(
          payPanelRef.current?.querySelectorAll('.pay-item'),
          { y: -6, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.2, ease: 'power2.out' }
        );
      }
      if (openPanel === 'biz') {
        gsap.fromTo(
          bizPanelRef.current,
          { y: -8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.2, ease: 'power2.out' }
        );
        gsap.fromTo(
          bizPanelRef.current?.querySelectorAll('.biz-item'),
          { y: -6, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.2, ease: 'power2.out' }
        );
      }
    });
    return () => ctx.revert();
  }, [openPanel]);

  // Mobile menu animation
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState('none'); // 'none' | 'pay' | 'biz'
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (isMobileMenuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' }
      );
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll('.mobile-stagger'),
        { y: -8, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.04, duration: 0.2 }
      );
    }
  }, [isMobileMenuOpen]);

  // Submenu transition animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (activeMobileSubmenu !== 'none') {
      gsap.fromTo(
        mobileMenuRef.current.querySelector('.submenu-content'),
        { x: locale === 'ar' ? 50 : -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll('.mobile-stagger'),
        { y: -8, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.2, delay: 0.1 }
      );
    }
  }, [activeMobileSubmenu, locale]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className={`w-full bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-colors duration-300 ${locale === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        {/* Logo and Navigation */}
        <div className={`flex items-center ${locale === 'ar' ? 'space-x-reverse space-x-6' : 'space-x-6'}`}>
        <Link href={`/${locale}`}>
          <div className="flex items-center justify-center">
            <DaftarPayLogo className="text-gray-900 dark:text-white" />
          </div>
        </Link>

        <nav className={`hidden lg:flex items-center text-lg font-semibold leading-tight text-gray-800 dark:text-gray-200 ${locale === 'ar' ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
          <Link href={`/${locale}/shop`} className="text-lg font-semibold leading-tight text-gray-800 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-md p-1 transition-colors">
            {locale === "ar" ? "تسوّق" : "Shop"}
          </Link>
          {/* Ways to pay with GSAP panel */}
          <div className="relative"
               onMouseEnter={() => handlePanelEnter('pay')}
               onMouseLeave={handlePanelLeave}
               onFocus={() => setOpenPanel('pay')}>
            <button className="text-lg font-semibold leading-tight text-gray-800 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-md p-1 transition-colors">
              {locale === 'ar' ? 'طرق الدفع' : 'Ways to pay'}
            </button>
            {openPanel === 'pay' && (
              <div ref={payPanelRef} role="menu" className="absolute top-full start-0 mt-3 w-[min(720px,90vw)] rounded-xl shadow-xl border border-gray-200/70 dark:border-gray-700 bg-white dark:bg-gray-900 backdrop-blur p-8">
                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-8 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 pay-item">{locale === 'ar' ? 'للمشترين' : 'Shoppers'}</p>
                    <ul className="space-y-3 text-gray-800 dark:text-gray-200">
                      <li className="pay-item"><Link href="#" className="block hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-md p-2 transition-colors duration-300">{locale === 'ar' ? 'ادفع لاحقاً' : 'Pay later'}</Link></li>
                      <li className="pay-item"><Link href="#" className="block hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-md p-2 transition-colors duration-300">{locale === 'ar' ? 'مساعدة' : 'Help'}</Link></li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 pay-item">{locale === 'ar' ? 'المزيد' : 'More'}</p>
                    <ul className="space-y-3 text-gray-800 dark:text-gray-200">
                      <li className="pay-item"><Link href="#" className="block hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-md p-2 transition-colors duration-300">{locale === 'ar' ? 'حول DaftarPay' : 'About DaftarPay'}</Link></li>
                      <li className="pay-item"><Link href="#" className="block hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-md p-2 transition-colors duration-300">{locale === 'ar' ? 'الأمان' : 'Security'}</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* For business with GSAP panel */}
          <div className="relative"
               onMouseEnter={() => handlePanelEnter('biz')}
               onMouseLeave={handlePanelLeave}
               onFocus={() => setOpenPanel('biz')}>
            <button className="text-lg font-semibold leading-tight text-gray-800 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-md p-1 transition-colors">
              {locale === 'ar' ? 'للأعمال' : 'For business'}
            </button>
            {openPanel === 'biz' && (
              <div ref={bizPanelRef} role="menu" className="absolute top-full start-0 mt-3 w-[min(1100px,92vw)] rounded-xl shadow-xl border border-gray-200/70 dark:border-gray-700 bg-white dark:bg-gray-900 backdrop-blur p-8">
                <div className={`grid grid-cols-1 sm:grid-cols-3 gap-8 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 biz-item">{locale === 'ar' ? 'حلول الأعمال' : 'Business Solutions'}</p>
                    <ul className="space-y-3 text-gray-800 dark:text-gray-200">
                      <li className="biz-item"><Link href="#" className="block hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-md p-2 transition-colors duration-300">{locale === 'ar' ? 'نظرة عامة' : 'Overview'}</Link></li>
                      <li className="biz-item"><Link href="#" className="block hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-md p-2 transition-colors duration-300">{locale === 'ar' ? 'عبر الإنترنت' : 'Online'}</Link></li>
                      <li className="biz-item"><Link href="#" className="block hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-md p-2 transition-colors duration-300">{locale === 'ar' ? 'في المتجر' : 'In‑store'}</Link></li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 biz-item">{locale === 'ar' ? 'أدوات المشاريع' : 'SME Tools'}</p>
                    <ul className="space-y-3 text-gray-800 dark:text-gray-200">
                      <li className="biz-item"><Link href="#" className="block hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-md p-2 transition-colors duration-300">Analytics</Link></li>
                      <li className="biz-item"><Link href="#" className="block hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-md p-2 transition-colors duration-300">Integrations</Link></li>
                      <li className="biz-item"><Link href="#" className="block hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-md p-2 transition-colors duration-300">Docs</Link></li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 biz-item">{locale === 'ar' ? 'الدعم' : 'Support'}</p>
                    <ul className="space-y-3 text-gray-800 dark:text-gray-200">
                      <li className="biz-item"><Link href="#" className="block hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-md p-2 transition-colors duration-300">{locale === 'ar' ? 'مركز المساعدة' : 'Help Center'}</Link></li>
                      <li className="biz-item"><Link href="#" className="block hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-md p-2 transition-colors duration-300">{locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
        </div>

        {/* Actions */}
        <div className={`flex items-center ${locale === 'ar' ? 'space-x-reverse space-x-6' : 'space-x-6'}`}>
        <Link
          href="#"
          className={`hidden lg:flex items-center text-lg font-semibold leading-tight text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-md p-2 transition-colors ${locale === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'}`}
        >
          <FontAwesomeIcon icon={faMobileAlt} className="h-5 w-5" />
          {locale === "ar" ? "حمّل التطبيق" : "Get the app"}
        </Link>

        <Link href="#" className="hidden lg:block text-lg font-semibold leading-tight text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-md p-2 transition-colors">
          {locale === "ar" ? "دخول الأعمال" : "Business log in"}
        </Link>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>

        {/* Language Switcher */}
        <button
          onClick={toggleLang}
          className={`flex items-center border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 hover:border-teal-500 dark:hover:border-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-all bg-white dark:bg-gray-800 ${locale === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'}`}
        >
          <span className="text-base font-semibold leading-tight text-gray-700 dark:text-gray-300">
            {locale === "ar" ? "English" : "العربية"}
          </span>
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        </div>
      </div>
      {/* Mobile full-screen menu (GSAP) */}
      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="fixed inset-0 z-[60] bg-white dark:bg-gray-900 max-h-screen overflow-y-auto lg:hidden">
          {/* Main Menu View */}
          {activeMobileSubmenu === 'none' && (
            <>
              <div className="flex items-center justify-end px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center space-x-4">
                  {/* Theme Toggle */}
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 mobile-stagger transition-colors"
                    aria-label="Toggle dark mode"
                  >
                    {isDark ? (
                      <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    )}
                  </button>
                  
                  {/* Language Switcher */}
                  <button
                    onClick={toggleLang}
                    className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full px-3 py-1 hover:border-teal-500 dark:hover:border-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-all bg-white dark:bg-gray-800 mobile-stagger"
                  >
                    <span className="text-base font-semibold leading-tight text-gray-700 dark:text-gray-300">
                      {locale === "ar" ? "English" : "العربية"}
                    </span>
                  </button>
                  
                  {/* Close Button */}
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 mobile-stagger" aria-label="Close menu">
                    <svg className="w-6 h-6 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>
              </div>
              <div className={`px-6 py-8 flex flex-col ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                <Link href={`/${locale}/shop`} onClick={() => setIsMobileMenuOpen(false)} className="mobile-stagger block text-lg font-bold text-gray-900 dark:text-white py-4 border-b border-gray-200 dark:border-gray-700">{locale === 'ar' ? 'تسوّق' : 'Shop'}</Link>
                
                <button onClick={() => setActiveMobileSubmenu('pay')} className={`mobile-stagger block w-full text-lg font-bold text-gray-900 dark:text-white py-4 border-b border-gray-200 dark:border-gray-700 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                  {locale === 'ar' ? 'طرق الدفع' : 'Ways to pay'}
                </button>
                
                <button onClick={() => setActiveMobileSubmenu('biz')} className={`mobile-stagger block w-full text-lg font-bold text-gray-900 dark:text-white py-4 border-b border-gray-200 dark:border-gray-700 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                  {locale === 'ar' ? 'للأعمال' : 'For business'}
                </button>
                
                <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="mobile-stagger block text-lg font-bold text-gray-900 dark:text-white py-4 border-b border-gray-200 dark:border-gray-700">{locale === 'ar' ? 'دخول الأعمال' : 'Business log in'}</Link>
                
                <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className={`mobile-stagger flex items-center text-lg font-bold text-gray-900 dark:text-white py-4 ${locale === 'ar' ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                  <FontAwesomeIcon icon={faMobileAlt} className="h-5 w-5" />
                  {locale === 'ar' ? 'حمّل التطبيق' : 'Get the app'}
                </Link>
              </div>
            </>
          )}

          {/* Ways to Pay Submenu */}
          {activeMobileSubmenu === 'pay' && (
            <>
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                <button onClick={() => setActiveMobileSubmenu('none')} className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <FontAwesomeIcon icon={locale === 'ar' ? faChevronRight : faChevronLeft} className="h-5 w-5" />
                  <span className="text-base font-semibold leading-tight">{locale === 'ar' ? 'رجوع' : 'Back'}</span>
                </button>
                <div className="flex items-center space-x-4">
                  {/* Theme Toggle */}
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Toggle dark mode"
                  >
                    {isDark ? (
                      <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    )}
                  </button>
                  
                  {/* Language Switcher */}
                  <button
                    onClick={toggleLang}
                    className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full px-3 py-1 hover:border-teal-500 dark:hover:border-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-all bg-white dark:bg-gray-800"
                  >
                    <span className="text-base font-semibold leading-tight text-gray-700 dark:text-gray-300">
                      {locale === "ar" ? "English" : "العربية"}
                    </span>
                  </button>
                  
                  {/* Close Button */}
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Close menu">
                    <svg className="w-6 h-6 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>
              </div>
              <div className={`submenu-content px-6 py-8 flex flex-col ${locale === 'ar' ? 'text-right' : 'text-left'} space-y-6`}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mobile-stagger">
                  {locale === 'ar' ? 'التسوق مع Tabby' : 'Shopping with Tabby'}
                </h2>
                <div className="space-y-0 w-full">
                  <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="mobile-stagger block text-lg font-bold text-gray-900 dark:text-white py-4 border-b border-gray-200 dark:border-gray-700 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300">{locale === 'ar' ? 'ادفع لاحقاً' : 'Pay later'}</Link>
                  <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="mobile-stagger block text-lg font-bold text-gray-900 dark:text-white py-4 border-b border-gray-200 dark:border-gray-700 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300">{locale === 'ar' ? 'مساعدة' : 'Help'}</Link>
                  <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="mobile-stagger block text-lg font-bold text-gray-900 dark:text-white py-4 border-b border-gray-200 dark:border-gray-700 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300">{locale === 'ar' ? 'حول DaftarPay' : 'About DaftarPay'}</Link>
                  <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="mobile-stagger block text-lg font-bold text-gray-900 dark:text-white py-4 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300">{locale === 'ar' ? 'الأمان' : 'Security'}</Link>
                </div>
              </div>
            </>
          )}

          {/* For Business Submenu */}
          {activeMobileSubmenu === 'biz' && (
            <>
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                <button onClick={() => setActiveMobileSubmenu('none')} className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <FontAwesomeIcon icon={locale === 'ar' ? faChevronRight : faChevronLeft} className="h-5 w-5" />
                  <span className="text-base font-semibold leading-tight">{locale === 'ar' ? 'رجوع' : 'Back'}</span>
                </button>
                <div className="flex items-center space-x-4">
                  {/* Theme Toggle */}
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Toggle dark mode"
                  >
                    {isDark ? (
                      <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    )}
                  </button>
                  
                  {/* Language Switcher */}
                  <button
                    onClick={toggleLang}
                    className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full px-3 py-1 hover:border-teal-500 dark:hover:border-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-all bg-white dark:bg-gray-800"
                  >
                    <span className="text-base font-semibold leading-tight text-gray-700 dark:text-gray-300">
                      {locale === "ar" ? "English" : "العربية"}
                    </span>
                  </button>
                  
                  {/* Close Button */}
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Close menu">
                    <svg className="w-6 h-6 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>
              </div>
              <div className={`submenu-content px-6 py-8 flex flex-col ${locale === 'ar' ? 'text-right' : 'text-left'} space-y-6`}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mobile-stagger">
                  {locale === 'ar' ? 'حلول الأعمال' : 'Business Solutions'}
                </h2>
                <div className="space-y-0 w-full">
                  <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="mobile-stagger block text-lg font-bold text-gray-900 dark:text-white py-4 border-b border-gray-200 dark:border-gray-700 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300">{locale === 'ar' ? 'نظرة عامة' : 'Overview'}</Link>
                  <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="mobile-stagger block text-lg font-bold text-gray-900 dark:text-white py-4 border-b border-gray-200 dark:border-gray-700 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300">{locale === 'ar' ? 'عبر الإنترنت' : 'Online'}</Link>
                  <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="mobile-stagger block text-lg font-bold text-gray-900 dark:text-white py-4 border-b border-gray-200 dark:border-gray-700 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300">{locale === 'ar' ? 'في المتجر' : 'In‑store'}</Link>
                  <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="mobile-stagger block text-lg font-bold text-gray-900 dark:text-white py-4 border-b border-gray-200 dark:border-gray-700 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300">Analytics</Link>
                  <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="mobile-stagger block text-lg font-bold text-gray-900 dark:text-white py-4 border-b border-gray-200 dark:border-gray-700 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300">Integrations</Link>
                  <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="mobile-stagger block text-lg font-bold text-gray-900 dark:text-white py-4 border-b border-gray-200 dark:border-gray-700 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300">Docs</Link>
                  <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="mobile-stagger block text-lg font-bold text-gray-900 dark:text-white py-4 border-b border-gray-200 dark:border-gray-700 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300">{locale === 'ar' ? 'مركز المساعدة' : 'Help Center'}</Link>
                  <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="mobile-stagger block text-lg font-bold text-gray-900 dark:text-white py-4 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300">{locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}</Link>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}
