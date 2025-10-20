/**
 * Font utility functions for consistent typography across the app
 */

/**
 * Get the appropriate font class based on locale
 * @param {string} locale - The current locale ('en' or 'ar')
 * @returns {string} - The appropriate font class
 */
export const getFontClass = (locale) => {
  return locale === 'ar' ? 'font-ping' : 'font-poppins';
};

/**
 * Get the appropriate text alignment class based on locale
 * @param {string} locale - The current locale ('en' or 'ar')
 * @returns {string} - The appropriate text alignment class
 */
export const getTextAlignClass = (locale) => {
  return locale === 'ar' ? 'text-right' : 'text-left';
};

/**
 * Get the appropriate flex direction class based on locale
 * @param {string} locale - The current locale ('en' or 'ar')
 * @returns {string} - The appropriate flex direction class
 */
export const getFlexDirectionClass = (locale) => {
  return locale === 'ar' ? 'flex-row-reverse' : 'flex-row';
};

/**
 * Get the appropriate margin class for icons/arrows based on locale
 * @param {string} locale - The current locale ('en' or 'ar')
 * @returns {string} - The appropriate margin class
 */
export const getIconMarginClass = (locale) => {
  return locale === 'ar' ? 'mr-3' : 'ml-3';
};

/**
 * Get the appropriate SVG transform for RTL support
 * @param {string} locale - The current locale ('en' or 'ar')
 * @returns {object} - The appropriate transform style
 */
export const getSVGTransform = (locale) => {
  return {
    transform: locale === 'ar' ? 'scaleX(-1)' : 'scaleX(1)'
  };
};

/**
 * Get comprehensive typography classes for Arabic text
 * @param {string} locale - The current locale ('en' or 'ar')
 * @param {string} baseClasses - Base CSS classes
 * @returns {string} - Combined classes with Arabic typography
 */
export const getArabicTypographyClasses = (locale, baseClasses = '') => {
  if (locale !== 'ar') return baseClasses;
  
  return `${baseClasses} font-ping tracking-tight`.trim();
};

/**
 * Get the appropriate HTML attributes for RTL support
 * @param {string} locale - The current locale ('en' or 'ar')
 * @returns {object} - HTML attributes for RTL support
 */
export const getRTLAttributes = (locale) => {
  if (locale !== 'ar') return {};
  
  return {
    dir: 'rtl',
    lang: 'ar'
  };
};

/**
 * Check if the current locale is RTL
 * @param {string} locale - The current locale ('en' or 'ar')
 * @returns {boolean} - True if RTL, false otherwise
 */
export const isRTL = (locale) => {
  return locale === 'ar';
};
