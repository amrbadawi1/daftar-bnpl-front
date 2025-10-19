'use client';

export default function CTASection({ t }) {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-700 dark:to-secondary-700">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-display-sm sm:text-display-md font-bold text-white mb-6">
          {t.cta.title}
        </h2>
        
        <p className="text-body-lg text-white/90 mb-8 max-w-2xl mx-auto">
          {t.cta.subtitle}
        </p>
        
        <button className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold text-body-lg rounded-full hover:bg-white/90 hover:scale-105 hover:shadow-2xl transition-all duration-300 transform">
          {t.cta.button}
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
