'use client';

import { usePathname } from 'next/navigation';
import QRCodeComponent from './QRCodeComponent';

export default function FooterSection({ t }) {
  const pathname = usePathname();
  const locale = pathname.includes('/ar') ? 'ar' : 'en';
  const isRTL = locale === 'ar';

  return (
    <footer className="relative bg-gray-900 dark:bg-black text-white">
      {/* Fixed App Card - Always visible */}
      <div className={`fixed ${isRTL ? 'left-4' : 'right-4'} bottom-4 z-50`}>
        <div className="bg-white rounded-lg p-4 shadow-lg max-w-xs hover:shadow-xl transition-shadow duration-300">
          <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
            {/* QR Code */}
            <QRCodeComponent
              value={`${typeof window !== 'undefined' ? window.location.origin : 'https://daftarpay.com'}/api/download`}
              size={64}
              showPulse={false}
              className="w-16 h-16"
            />
            
            {/* App Info */}
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 text-body-sm mb-2">{t.footer.app.title}</h3>
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                {/* App Icon */}
                <div className="w-4 h-4 bg-teal-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">D</span>
                </div>
                {/* Rating */}
                <span className="text-gray-800 font-semibold text-body-sm">{t.footer.app.rating}</span>
                {/* Stars */}
                <div className={`flex ${isRTL ? 'space-x-reverse space-x-0.5' : 'space-x-0.5'}`}>
                  {[1, 2, 3, 4].map((star) => (
                    <svg key={star} className="w-3 h-3 text-black fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                  <svg className="w-3 h-3 text-gray-300 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
              </div>
              <p className="text-gray-500 text-body-sm mt-1">{t.footer.app.ratingText}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="lg:col-span-1">
            <h3 className="text-body-lg font-bold mb-4">{t.footer.company.name}</h3>
            <div className="text-gray-400 text-body-sm space-y-1 mb-6">
              <p>{t.footer.company.address.line1}</p>
              <p>{t.footer.company.address.line2}</p>
              <p>{t.footer.company.address.line3}</p>
              <p>{t.footer.company.address.city}</p>
              <p>{t.footer.company.address.country}</p>
            </div>
            
            <div className="text-gray-400 text-body-sm space-y-2 mb-6">
              <p>{t.footer.company.contact.help}</p>
              <p>{t.footer.company.contact.vat}</p>
              <p className="text-xs">{t.footer.company.contact.regulatory}</p>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold text-body-lg mb-4">{t.footer.company.followUs}</h4>
              <div className={`flex ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="Facebook">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="Instagram">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="LinkedIn">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="Twitter">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h4 className="text-body-lg font-semibold mb-4">{t.footer.about.title}</h4>
            <ul className="space-y-2">
              {t.footer.about.links.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-body-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Shoppers Section */}
          <div>
            <h4 className="text-body-lg font-semibold mb-4">{t.footer.shoppers.title}</h4>
            <ul className="space-y-2">
              {t.footer.shoppers.links.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-body-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Businesses Section */}
          <div>
            <h4 className="text-body-lg font-semibold mb-4">{t.footer.businesses.title}</h4>
            <ul className="space-y-2">
              {t.footer.businesses.links.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-body-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-body-sm">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
