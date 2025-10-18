import Navbar from '../../landing/components/Navbar';
import ShopHeroSection from '../../landing/components/ShopHeroSection';
import TopDealsSection from '../../landing/components/TopDealsSection';
import FeaturedStoresSection from '../../landing/components/FeaturedStoresSection';
import AppFeaturesSection from '../../landing/components/AppFeaturesSection';
import ShopByCategorySection from '../../landing/components/ShopByCategorySection';
import ShopCTASection from '../../landing/components/ShopCTASection';
import FooterSection from '../../landing/components/FooterSection';
import arTranslations from '../../landing/locales/ar.json';

export const metadata = {
  title: 'دليل المتاجر - اعثر على متاجر يمكنك الدفع فيها في 4',
  description: 'اكتشف أين يمكنك استخدام دفتر باي للدفع على مراحل والحصول على عروض حصرية. تصفح المتاجر المميزة وأفضل العروض والتسوق حسب الفئة.',
  keywords: 'دليل المتاجر، متاجر، عروض، فئات، اشتر الآن ادفع لاحقاً، الدفع الآجل',
  openGraph: {
    title: 'دليل المتاجر - اعثر على متاجر يمكنك الدفع فيها في 4',
    description: 'اكتشف أين يمكنك استخدام دفتر باي للدفع على مراحل والحصول على عروض حصرية.',
    type: 'website',
  },
};

export default function ShopPageAR() {
  return (
    <div className="arabic-page font-ping antialiased" dir="rtl" lang="ar">
      <Navbar />
      <ShopHeroSection t={arTranslations} locale="ar" />
      <TopDealsSection t={arTranslations} locale="ar" />
      <FeaturedStoresSection t={arTranslations} locale="ar" />
      <AppFeaturesSection t={arTranslations} locale="ar" />
      <ShopByCategorySection t={arTranslations} locale="ar" />
      <ShopCTASection t={arTranslations} locale="ar" />
      <FooterSection t={arTranslations} />
    </div>
  );
}
