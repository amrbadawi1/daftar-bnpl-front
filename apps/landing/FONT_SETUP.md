# GT America Arabic Font Setup

This document outlines the complete setup for GT America Arabic font across the entire application.

## 🎯 Font Configuration

### 1. Font Files Required
Place these files in `apps/landing/public/fonts/`:

**GT America Arabic:**
- `GT-America-Arabic-Regular.woff2`
- `GT-America-Arabic-Regular.woff`
- `GT-America-Arabic-Regular.ttf`
- `GT-America-Arabic-Medium.woff2`
- `GT-America-Arabic-Medium.woff`
- `GT-America-Arabic-Medium.ttf`
- `GT-America-Arabic-Bold.woff2`
- `GT-America-Arabic-Bold.woff`
- `GT-America-Arabic-Bold.ttf`

### 2. Tailwind Configuration
The font is configured in `tailwind.config.js`:

```javascript
fontFamily: {
  'sans': ['DegularDisplay', 'Inter', 'system-ui', 'sans-serif'],
  'arabic': ['GT America Arabic', 'Tajawal', 'Cairo', 'Noto Sans Arabic', 'Arial', 'sans-serif'],
  'gt-arabic': ['GT America Arabic', 'Tajawal', 'Cairo', 'Noto Sans Arabic', 'Arial', 'sans-serif'],
}
```

### 3. CSS Font Loading
Font faces are defined in `src/app/globals.css` with proper fallbacks and font features.

## 🚀 Usage

### Automatic Application
GT America Arabic is automatically applied to:

1. **All Arabic pages** (`/ar/*`) with `arabic-page` class
2. **All RTL content** with `dir="rtl"` attribute
3. **All Arabic text** with `lang="ar"` attribute
4. **Components** using `font-arabic` class

### Manual Application
Use these classes in your components:

```jsx
// For Arabic text
<div className="font-arabic">Arabic text here</div>

// For RTL layout
<div className="font-arabic" dir="rtl" lang="ar">
  Arabic content
</div>
```

### Utility Functions
Use the font utilities in `src/app/landing/utils/fontUtils.js`:

```javascript
import { getFontClass, getRTLAttributes } from '../utils/fontUtils';

// In your component
const fontClass = getFontClass(locale); // 'font-arabic' for Arabic
const rtlAttrs = getRTLAttributes(locale); // { dir: 'rtl', lang: 'ar' }
```

## 📱 Components Using GT America Arabic

### 1. Arabic Pages
- `/ar/page.jsx` - Main Arabic landing page
- `/ar/shop/page.jsx` - Arabic shop page

### 2. Components with Arabic Support
- `HeroSection.jsx` - Uses `font-arabic` for Arabic locale
- `FeaturesSection.jsx` - Uses `font-arabic` for Arabic locale
- `Navbar.jsx` - RTL support with Arabic fonts
- All other components with `locale="ar"` prop

## 🎨 Typography Features

### Font Features Enabled
- **Ligatures**: `liga` 1
- **Kerning**: `kern` 1
- **Contextual Alternates**: `calt` 1
- **Common Ligatures**: `common-ligatures`

### Typography Improvements
- **Line Height**: 1.6 for better Arabic readability
- **Letter Spacing**: 0.01em for proper character spacing
- **Word Spacing**: 0.1em for better word separation
- **Font Smoothing**: Antialiased for crisp rendering

## 🔧 CSS Classes Available

### Primary Classes
- `.font-arabic` - GT America Arabic with fallbacks
- `.font-gt-arabic` - Same as font-arabic
- `.arabic-page` - Full page Arabic styling
- `.arabic-text` - Force Arabic font
- `.rtl-text` - RTL text styling

### Automatic Application
- `[dir="rtl"]` - All RTL content
- `[lang="ar"]` - All Arabic language content
- `[dir="rtl"] *` - All children of RTL elements
- `[lang="ar"] *` - All children of Arabic elements

## 📋 Implementation Checklist

- [x] Font files placed in `public/fonts/`
- [x] Tailwind config updated
- [x] CSS font faces defined
- [x] Arabic pages updated with `arabic-page` class
- [x] Components use `font-arabic` class
- [x] RTL attributes added (`dir="rtl"`, `lang="ar"`)
- [x] Font utilities created
- [x] Typography features enabled
- [x] Fallback fonts configured

## 🎯 Result

GT America Arabic is now the primary font for all Arabic content across the entire application, with proper fallbacks and typography features for optimal Arabic text rendering.
