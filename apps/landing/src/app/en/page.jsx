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
import enTranslations from '../landing/locales/en.json';

export const metadata = {
  title: 'Buy Now, Pay Later - BNPL Platform',
  description: 'Split your purchases into 4 easy payments. No hidden fees. Shop now and pay later with our flexible payment solution.',
  keywords: 'buy now pay later, BNPL, flexible payments, installment payments',
  openGraph: {
    title: 'Buy Now, Pay Later - BNPL Platform',
    description: 'Split your purchases into 4 easy payments. No hidden fees.',
    type: 'website',
  },
};

export default function LandingPageEN() {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <HeroSection t={enTranslations} locale="en" />
      <FeaturesSection t={enTranslations} locale="en" />
      <ServicesSection t={enTranslations} locale="en" />
      <HowItWorksSection t={enTranslations} locale="en" />
      <ShopBrandsSection t={enTranslations} locale="en" />
      <TrustedByDynamicMarquee t={enTranslations} />
      <CTASection t={enTranslations} />
      <FAQSection t={enTranslations} />
      <NewsletterSection t={enTranslations} />
      <FooterSection t={enTranslations} />
    </div>
  );
}
