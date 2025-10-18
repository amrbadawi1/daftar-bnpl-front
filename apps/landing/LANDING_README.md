# Bilingual BNPL Landing Page

A modern, responsive Buy Now Pay Later landing page built with Next.js 14, TailwindCSS, and GSAP animations. Features bilingual support (English/Arabic) with RTL layout, dark mode, and smooth animations.

## 🚀 Features

- **Bilingual Support**: English and Arabic with proper RTL layout
- **Dark Mode**: Toggle between light and dark themes
- **GSAP Animations**: Scroll-triggered animations and dynamic marquee
- **Responsive Design**: Mobile-first approach with tablet/desktop breakpoints
- **Modern UI**: Gradients, shadows, hover effects, and smooth transitions
- **Accessibility**: Semantic HTML and proper ARIA labels

## 📁 Project Structure

```
apps/landing/src/app/landing/
├── en/
│   └── page.jsx                 # English landing page
├── ar/
│   └── page.jsx                 # Arabic landing page (RTL)
├── components/
│   ├── HeroSection.jsx          # Hero with gradient background
│   ├── HowItWorksSection.jsx    # 3-step process with GSAP animations
│   ├── TrustedByDynamicMarquee.jsx # Partner logos with mouse tracking
│   ├── CTASection.jsx           # Call-to-action section
│   ├── FAQSection.jsx           # Expandable FAQ items
│   ├── NewsletterSection.jsx    # Email subscription form
│   ├── FooterSection.jsx        # Footer with links
│   ├── DarkModeToggle.jsx       # Dark mode switcher
│   └── LanguageSwitcher.jsx     # Language switcher
├── locales/
│   ├── en.json                  # English translations
│   └── ar.json                   # Arabic translations
└── page.jsx                     # Redirect to /landing/en
```

## 🛠️ Technologies Used

- **Next.js 14** with App Router
- **React 19** with functional components
- **TailwindCSS** for styling
- **GSAP** for animations
- **Google Fonts** (Noto Sans Arabic for RTL support)

## 🎨 Sections

### 1. Hero Section
- Gradient background (purple/blue)
- Main title and subtitle
- CTA button with hover effects
- Floating animated elements

### 2. How It Works Section
- 3 cards with step numbers
- GSAP ScrollTrigger animations
- Icons for each step (Shop, Pay Later, Enjoy)
- Responsive grid layout

### 3. Trusted By Section
- Horizontal marquee with partner logos
- Mouse movement tracking for speed adjustment
- Grayscale to color transition on hover
- Seamless infinite loop

### 4. CTA Section
- Gradient background
- Title, subtitle, and button
- Hover scale and shadow effects

### 5. FAQ Section
- 3 expandable FAQ items
- Smooth accordion animations
- Accessible markup

### 6. Newsletter Section
- Email input with validation
- Subscribe button with feedback
- Responsive form layout

### 7. Footer Section
- Links (Privacy Policy, Terms, Contact)
- Social media icons
- Dark mode compatible

## 🌐 Language Support

- **English**: `/landing/en` - LTR layout
- **Arabic**: `/landing/ar` - RTL layout with Arabic font
- **Auto-redirect**: `/landing` → `/landing/en`

## 🎭 Dark Mode

- Toggle button in top-right corner
- Persists user preference in localStorage
- Respects system preference on first visit
- All components support both themes

## 🎬 Animations

- **GSAP ScrollTrigger**: How It Works cards fade in on scroll
- **GSAP Timeline**: Trusted By marquee with mouse speed control
- **CSS Transitions**: Hover effects, button animations, FAQ accordions
- **Tailwind Animations**: Pulse effects, scale transforms

## 📱 Responsive Design

- **Mobile**: Single column layout, stacked elements
- **Tablet**: 2-column grids where appropriate
- **Desktop**: 3-column grids, side-by-side layouts
- **RTL Support**: Proper Arabic text direction and spacing

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Visit the landing pages:
- English: `http://localhost:3000/landing/en`
- Arabic: `http://localhost:3000/landing/ar`
- Auto-redirect: `http://localhost:3000/landing`

## 🎯 Key Features Implementation

### GSAP Animations
- ScrollTrigger for scroll-based animations
- Timeline for complex animations
- Mouse tracking for interactive effects

### RTL Support
- `dir="rtl"` attribute on Arabic pages
- Arabic font family (Noto Sans Arabic)
- Proper text alignment and spacing

### Dark Mode
- CSS custom properties
- TailwindCSS dark mode classes
- localStorage persistence
- System preference detection

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Responsive typography
- Touch-friendly interactions

## 📝 Customization

### Colors
Edit `tailwind.config.js` to modify the color palette:
```javascript
colors: {
  primary: { /* Blue shades */ },
  secondary: { /* Purple shades */ }
}
```

### Content
Update translation files in `locales/`:
- `en.json` for English content
- `ar.json` for Arabic content

### Animations
Modify GSAP animations in component files:
- ScrollTrigger settings in `HowItWorksSection.jsx`
- Marquee animation in `TrustedByDynamicMarquee.jsx`

## 🔧 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is part of the daftar-bnpl-front monorepo.
