# Complete Typography System Guide

## 🎯 Overview

This guide documents the comprehensive typography system for the DaftarPay BNPL website, designed to match Tabby's premium fintech aesthetic with full RTL/LTR support.

## 📝 Font Specifications

### **English Fonts**
- **Primary**: DegularDisplay (Regular, Medium, Bold)
- **Fallback**: Inter, system-ui, sans-serif
- **Usage**: All English content, LTR layouts

### **Arabic Fonts**
- **Primary**: PingARLT (Thin, Regular, Medium, Bold, Heavy, Black)
- **Fallback**: Tajawal, sans-serif
- **Usage**: All Arabic content, RTL layouts

## 🎨 Font Weight Usage

| Element | Weight | Usage |
|---------|--------|-------|
| **H1 / Hero titles** | 700-900 | Main headlines, hero sections |
| **H2 / H3 / Section titles** | 500-700 | Section headers, subsections |
| **P / Body text** | 400 | Paragraphs, descriptions |
| **Buttons / CTA** | 500-700 | Call-to-action buttons |
| **Small text / Captions** | 400 | Metadata, captions, small text |

## 📱 Responsive Font Sizes

### **H1 - Hero Titles**
- **Mobile**: 36px (2.25rem) - Weight: 700
- **Tablet**: 48px (3rem) - Weight: 700
- **Desktop**: 60px (3.75rem) - Weight: 900

### **H2 - Section Titles**
- **Mobile**: 30px (1.875rem) - Weight: 600
- **Tablet**: 36px (2.25rem) - Weight: 700
- **Desktop**: 48px (3rem) - Weight: 700

### **H3 - Subsection Titles**
- **Mobile**: 24px (1.5rem) - Weight: 600
- **Tablet**: 30px (1.875rem) - Weight: 600
- **Desktop**: 36px (2.25rem) - Weight: 700

### **Body Text (Span)**
- **Mobile**: 16px (1rem) - Weight: 400
- **Tablet**: 18px (1.125rem) - Weight: 400
- **Desktop**: 20px (1.25rem) - Weight: 400

### **Small Text (Span with .text-small class)**
- **Mobile**: 14px (0.875rem) - Weight: 400
- **Tablet/Desktop**: 16px (1rem) - Weight: 400

## 📐 Letter Spacing & Line Height

### **Headings (H1, H2)**
- **Letter Spacing**: -0.02em (tight for modern look)
- **Line Height**: 1.2-1.3 (snug for impact)

### **Subheadings (H3)**
- **Letter Spacing**: 0 (normal)
- **Line Height**: 1.4 (balanced)

### **Body Text (Span)**
- **Letter Spacing**: 0 (normal)
- **Line Height**: 1.6 (relaxed for readability)

### **Small Text (Span with .text-small class)**
- **Letter Spacing**: 0 (normal)
- **Line Height**: 1.4 (compact)

## 🌍 RTL/LTR Support

### **Automatic Font Switching**
```css
/* English content */
[dir="ltr"] *, [lang="en"] * {
  font-family: 'DegularDisplay', 'Inter', system-ui, sans-serif;
}

/* Arabic content */
[dir="rtl"] *, [lang="ar"] * {
  font-family: 'PingARLT', 'Tajawal', sans-serif;
}
```

### **Text Alignment**
```css
[dir="rtl"] { text-align: right; direction: rtl; }
[dir="ltr"] { text-align: left; direction: ltr; }
```

### **Arabic Typography Adjustments**
- Slightly less tight letter spacing (-0.01em) for Arabic headings
- Optimized for Arabic script characteristics

## 🎨 Dark Mode Support

### **Color Palette**
```css
/* Light Mode (Default) */
h1, h2, h3, h4, h5, h6 { color: inherit; }
p { color: inherit; }
span { color: inherit; }
a { color: #0ea5e9; }

/* Dark Mode */
.dark h1, .dark h2, .dark h3, .dark h4, .dark h5, .dark h6 { color: #f9fafb; }
.dark p { color: #e5e7eb; }
.dark span { color: #e5e7eb; }
.dark span.text-small,
.dark span.text-caption { color: #d1d5db; }
.dark a { color: #38bdf8; }
```

## 🛠️ Utility Classes

### **Typography Classes**
```css
.text-hero     /* Hero headlines with responsive sizing */
.text-section  /* Section titles with responsive sizing */
.text-subsection /* Subsection titles */
.text-body     /* Body text with responsive sizing */
.text-caption  /* Small text and captions */
.btn-text      /* Button and CTA text */
```

### **Tailwind Classes**
```css
/* Responsive Font Sizes */
text-h1-mobile, text-h1-tablet, text-h1-desktop
text-h2-mobile, text-h2-tablet, text-h2-desktop
text-h3-mobile, text-h3-tablet, text-h3-desktop
text-body-sm, text-body-base, text-body-lg
text-caption, text-small
```

## 💻 Implementation Examples

### **English Content**
```html
<div dir="ltr" lang="en" class="font-sans">
  <h1>Shop Now, Pay Later with DaftarPay</h1>
  <span>Split your purchases into 4 interest-free payments.</span>
  <button class="btn-text">Get Started</button>
</div>
```

### **Arabic Content**
```html
<div dir="rtl" lang="ar" class="font-arabic">
  <h1>تسوق الآن، ادفع لاحقاً مع دفتر باي</h1>
  <span>قسّم مشترياتك إلى 4 دفعات بدون فوائد.</span>
  <button class="btn-text">ابدأ الآن</button>
</div>
```

### **Mixed Content (Auto-switching)**
```html
<!-- Automatically applies correct font based on content -->
<div>
  <h1>Welcome to DaftarPay</h1>
  <span>مرحباً بك في دفتر باي</span>
</div>
```

## 🔧 Font Rendering Enhancements

### **Optimized Rendering**
```css
html {
  font-feature-settings: 'liga' 1, 'kern' 1, 'calt' 1;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### **Performance Features**
- `font-display: swap` for faster loading
- Optimized font loading with fallbacks
- Reduced layout shift with proper font metrics

## 📊 Breakpoint System

### **Mobile First Approach**
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

### **Responsive Typography**
- All typography scales smoothly across breakpoints
- Maintains readability at all screen sizes
- Optimized for touch interfaces on mobile

## 🎯 Best Practices

### **Do's**
- ✅ Use semantic HTML elements (h1, h2, p, etc.)
- ✅ Apply appropriate font weights for hierarchy
- ✅ Test on multiple devices and screen sizes
- ✅ Verify RTL text rendering
- ✅ Use utility classes for consistency

### **Don'ts**
- ❌ Don't override global typography styles unnecessarily
- ❌ Don't mix font families within the same content
- ❌ Don't use too many different font weights
- ❌ Don't ignore accessibility guidelines

## 🧪 Testing Checklist

### **Responsive Testing**
- [ ] Mobile (320px-767px)
- [ ] Tablet (768px-1023px)
- [ ] Desktop (1024px+)

### **Language Testing**
- [ ] English content (LTR)
- [ ] Arabic content (RTL)
- [ ] Mixed content scenarios

### **Accessibility Testing**
- [ ] Screen reader compatibility
- [ ] High contrast mode
- [ ] Font size scaling
- [ ] Color contrast ratios

### **Performance Testing**
- [ ] Font loading speed
- [ ] Layout shift prevention
- [ ] Rendering performance

## 📚 Additional Resources

- [Tailwind CSS Typography Plugin](https://tailwindcss.com/docs/typography-plugin)
- [CSS Font Loading API](https://developer.mozilla.org/en-US/docs/Web/API/Font_Loading_API)
- [RTL Support Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Writing_Modes)
- [Web Font Performance](https://web.dev/font-best-practices/)

---

**Last Updated**: December 2024  
**Version**: 1.0  
**Maintainer**: Development Team
