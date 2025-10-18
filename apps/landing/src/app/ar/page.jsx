import Navbar from '../landing/components/Navbar';
import HeroSection from '../landing/components/HeroSection';
import FeaturesSection from '../landing/components/FeaturesSection';
import ServicesSection from '../landing/components/ServicesSection';
import HowItWorksSection from '../landing/components/HowItWorksSection';
import ShopBrandsSection from '../landing/components/ShopBrandsSection';
import TrustedByDynamicMarquee from '../landing/components/TrustedByDynamicMarquee';
import CTASection from '../landing/components/CTASection';
import FAQSection from '../landing/components/FAQSection';
import NewsletterSection from '../landing/components/NewsletterSection';
import FooterSection from '../landing/components/FooterSection';
import arTranslations from '../landing/locales/ar.json';

export const metadata = {
  title: 'اشتر الآن، ادفع لاحقاً - منصة الدفع الآجل',
  description: 'قسّم مشترياتك إلى 4 دفعات سهلة. بدون رسوم مخفية. تسوق الآن وادفع لاحقاً مع حل الدفع المرن لدينا.',
  keywords: 'اشتر الآن ادفع لاحقاً، الدفع الآجل، دفعات مرنة، دفعات بالتقسيط',
  openGraph: {
    title: 'اشتر الآن، ادفع لاحقاً - منصة الدفع الآجل',
    description: 'قسّم مشترياتك إلى 4 دفعات سهلة. بدون رسوم مخفية.',
    type: 'website',
  },
};

export default function LandingPageAR() {
  return (
    <div className="arabic-page font-ping antialiased" dir="rtl" lang="ar">
      <Navbar />
      <HeroSection t={arTranslations} locale="ar" />
      <FeaturesSection t={arTranslations} locale="ar" />
      <ServicesSection t={arTranslations} locale="ar" />
      <HowItWorksSection t={arTranslations} locale="ar" />
      <ShopBrandsSection t={arTranslations} locale="ar" />
      <TrustedByDynamicMarquee t={arTranslations} />
      <CTASection t={arTranslations} />
      <FAQSection t={arTranslations} />
      <NewsletterSection t={arTranslations} />
      <FooterSection t={arTranslations} />
    </div>
  );
}
