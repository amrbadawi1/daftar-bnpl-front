'use client';

import { useState, useEffect } from 'react';
import QRCodeComponent from '../../landing/components/QRCodeComponent';

export const metadata = {
  title: 'Download DaftarPay - Scan QR Code',
  description: 'Scan the QR code to download DaftarPay app on iOS or Android',
  openGraph: {
    title: 'Download DaftarPay',
    description: 'Scan to download our app',
  },
};

export default function DownloadPage({ params }) {
  const { locale } = params;
  const [platform, setPlatform] = useState('Web');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showQR, setShowQR] = useState(false);

  // Platform detection
  useEffect(() => {
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(ua)) {
      setPlatform('iOS');
    } else if (/Android/.test(ua)) {
      setPlatform('Android');
    } else {
      setPlatform('Web');
    }
    
    // Show QR code with delay for animation
    setTimeout(() => setShowQR(true), 500);
  }, []);

  // Handle redirect
  const handleRedirect = () => {
    setIsRedirecting(true);
    setTimeout(() => {
      window.location.href = '/api/download';
    }, 1500);
  };

  // Platform badge colors
  const getPlatformColor = () => {
    switch (platform) {
      case 'iOS': return 'bg-blue-500 text-white';
      case 'Android': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  // Platform icons
  const getPlatformIcon = () => {
    switch (platform) {
      case 'iOS':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"/>
          </svg>
        );
      case 'Android':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"/>
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"/>
          </svg>
        );
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex flex-col items-center justify-center px-4 py-8">
      {/* Logo */}
      <div className="mb-8 animate-fade-in">
        <div className="w-[150px] h-[40px] flex items-center">
          <svg width="150" height="40" viewBox="0 0 300 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
              </filter>
            </defs>
            <text 
              x="150" 
              y="42" 
              font-family="Poppins, Arial, sans-serif" 
              font-weight="800" 
              font-size="42" 
              fill="#FFFFFF" 
              filter="url(#logoShadow)"
              text-anchor="middle"
            >
              DaftarPay
            </text>
          </svg>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {locale === 'ar' ? 'امسح رمز QR لتحميل DaftarPay' : 'Scan QR to Download DaftarPay'}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          {locale === 'ar' 
            ? 'امسح رمز QR هذا بهاتفك المحمول لتحميل DaftarPay مباشرة من متجر التطبيقات.'
            : 'Scan this QR code with your mobile device to download DaftarPay directly from your app store.'
          }
        </p>
      </div>

      {/* QR Code Section */}
      <div className="relative animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <div className={`bg-white rounded-3xl shadow-2xl p-8 transition-all duration-500 hover:scale-105 ${showQR ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col items-center">
            {/* QR Code */}
            <QRCodeComponent
              value={`${typeof window !== 'undefined' ? window.location.origin : 'https://daftarpay.com'}/api/download`}
              size={200}
              showPulse={true}
              className="mx-auto"
            />

            {/* Platform Badge */}
            <div className={`mt-6 rounded-full px-6 py-3 text-sm font-semibold flex items-center space-x-2 ${getPlatformColor()}`}>
              {getPlatformIcon()}
              <span>
                {platform === 'iOS' ? 'iOS' : platform === 'Android' ? 'Android' : 'Web'} 
                {locale === 'ar' ? ' مكتشف' : ' Detected'}
              </span>
            </div>

            {/* Download Button */}
            <button
              onClick={handleRedirect}
              className="mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {locale === 'ar' ? 'تحميل الآن' : 'Download Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Redirecting Modal */}
      {isRedirecting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center animate-fade-in">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {locale === 'ar' ? 'جاري التوجيه...' : 'Redirecting...'}
            </h3>
            <p className="text-gray-600">
              {locale === 'ar' 
                ? 'سيتم توجيهك إلى متجر التطبيقات المناسب'
                : 'Taking you to the right app store'
              }
            </p>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </main>
  );
}
