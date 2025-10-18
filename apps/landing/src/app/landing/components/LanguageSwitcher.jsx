'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (lang) => {
    const newPath = pathname.replace(/\/en|\/ar/, `/${lang}`);
    router.push(newPath);
  };

  const currentLang = pathname.includes('/ar') ? 'ar' : 'en';

  return (
    <div className="fixed top-4 left-4 z-50 flex bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden">
      <button
        onClick={() => switchLanguage('en')}
        className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
          currentLang === 'en'
            ? 'bg-primary-500 text-white'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage('ar')}
        className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
          currentLang === 'ar'
            ? 'bg-primary-500 text-white'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        عربي
      </button>
    </div>
  );
}
