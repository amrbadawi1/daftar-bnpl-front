'use client';

import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

export default function QRCodeComponent({ 
  value, 
  size = 200, 
  className = "",
  showPulse = true 
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show QR code with a slight delay for animation
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`${showPulse ? 'animate-pulse' : ''} ${className} p-4 bg-white dark:bg-gray-100 rounded-3xl border-2 border-gray-200 dark:border-gray-300 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
        <QRCode
          value={value}
          size={size}
          style={{ 
            height: "auto", 
            maxWidth: "100%", 
            width: "100%",
            borderRadius: "8px"
          }}
          className="rounded-xl"
        />
      </div>
      
      {/* Enhanced overlay for visual effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 dark:from-gray-100/5 to-transparent pointer-events-none"></div>
    </div>
  );
}
