import Navbar from '../../landing/components/Navbar';
import ShopHeroSection from '../../landing/components/ShopHeroSection';
import TopDealsSection from '../../landing/components/TopDealsSection';
import FeaturedStoresSection from '../../landing/components/FeaturedStoresSection';
import AppFeaturesSection from '../../landing/components/AppFeaturesSection';
import ShopByCategorySection from '../../landing/components/ShopByCategorySection';
import ShopCTASection from '../../landing/components/ShopCTASection';
import FooterSection from '../../landing/components/FooterSection';
import enTranslations from '../../landing/locales/en.json';

export const metadata = {
  title: 'Shop Directory - Find Stores Where You Can Pay in 4',
  description: 'Discover where you can use DaftarPay to pay over time and get exclusive deals. Browse featured stores, top deals, and shop by category.',
  keywords: 'shop directory, stores, deals, categories, buy now pay later, BNPL',
  openGraph: {
    title: 'Shop Directory - Find Stores Where You Can Pay in 4',
    description: 'Discover where you can use DaftarPay to pay over time and get exclusive deals.',
    type: 'website',
  },
};

export default function ShopPageEN() {
  return (
    <div className="font-poppins antialiased">
      <Navbar />
      <ShopHeroSection t={enTranslations} locale="en" />
      <TopDealsSection t={enTranslations} locale="en" />
      <FeaturedStoresSection t={enTranslations} locale="en" />
      <AppFeaturesSection t={enTranslations} locale="en" />
      <ShopByCategorySection t={enTranslations} locale="en" />
      <ShopCTASection t={enTranslations} locale="en" />
      <FooterSection t={enTranslations} />
    </div>
  );
}
