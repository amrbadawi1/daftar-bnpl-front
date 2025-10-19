// const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');

// The above utility import will not work if you are using Next.js' --turbo.
// Instead you will have to manually add the dependent paths to be included.
// For example
// ../libs/buttons/**/*.{ts,tsx,js,jsx,html}',                 <--- Adding a shared lib
// !../libs/buttons/**/*.{stories,spec}.{ts,tsx,js,jsx,html}', <--- Skip adding spec/stories files from shared lib

// If you are **not** using `--turbo` you can uncomment both lines 1 & 19.
// A discussion of the issue can be found: https://github.com/nrwl/nx/issues/26510

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './{src,pages,components,app}/**/*.{ts,tsx,js,jsx,html}',
    '!./{src,pages,components,app}/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
//     ...createGlobPatternsForDependencies(__dirname)
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        }
      },
      fontFamily: {
        'sans': ['DegularDisplay', 'Inter', 'system-ui', 'sans-serif'],
        'arabic': ['PingARLT', 'Tajawal', 'sans-serif'],
        'ping': ['PingARLT', 'Tajawal', 'sans-serif'],
      },
      fontSize: {
        // Mobile-first responsive sizes
        'h1-mobile': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],  // 36px
        'h1-tablet': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],     // 48px
        'h1-desktop': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '900' }], // 60px
        
        'h2-mobile': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.02em', fontWeight: '600' }], // 30px
        'h2-tablet': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.02em', fontWeight: '700' }],  // 36px
        'h2-desktop': ['3rem', { lineHeight: '1.3', letterSpacing: '-0.02em', fontWeight: '700' }],    // 48px
        
        'h3-mobile': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],         // 24px
        'h3-tablet': ['1.875rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],       // 30px
        'h3-desktop': ['2.25rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '700' }],       // 36px
        
        'body-sm': ['1rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],             // 16px
        'body-base': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],       // 18px
        'body-lg': ['1.25rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],          // 20px
        
        'caption': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '400' }],         // 14px
        'small': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '400' }],           // 14px
        
        // Legacy display sizes (keep for compatibility)
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],  // 72px
        'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }], // 60px
        'display-md': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.025em' }],  // 48px
        'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }], // 36px
        'body-xl': ['1.25rem', { lineHeight: '1.6', letterSpacing: '0' }],         // 20px
        'body-md': ['1rem', { lineHeight: '1.5', letterSpacing: '0' }],            // 16px
      },
      letterSpacing: {
        'tighter': '-0.04em',
        'tight': '-0.02em',
        'normal': '0',
        'wide': '0.01em',
        'wider': '0.02em',
      },
      lineHeight: {
        'tight': '1.1',
        'snug': '1.2',
        'normal': '1.5',
        'relaxed': '1.6',
        'loose': '1.8',
      }
    },
  },
  plugins: [],
};
