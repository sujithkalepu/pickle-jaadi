import { StoreProvider } from './context/StoreContext';
import UtilityBar from './components/UtilityBar';
import Header from './components/Header';
import MobileNavDrawer from './components/MobileNavDrawer';
import HeroCarousel from './components/HeroCarousel';
import ProductSection from './components/ProductSection';
import HeritageLegacy from './components/HeritageLegacy';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import InfoDrawer from './components/InfoDrawer';
import AccountModal, { CartDrawer, WishlistDrawer } from './components/AccountModal';
import SearchStatusBar from './components/SearchStatusBar';
import { CLOUD_PICKLES_DB, CLOUD_PODIS_DB, CLOUD_FRYUMS_DB } from './data/products';

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <UtilityBar />
      <Header />
      <SearchStatusBar />
      <MobileNavDrawer />
      <HeroCarousel />
      <main className="flex-grow">
        <ProductSection
          id="pickles"
          title="Andhra Pickles (Pachadi)"
          subtitle="Garlic Option: With & Without Garlic (వెల్లుల్లి లేకుండా)"
          products={CLOUD_PICKLES_DB}
          unitLabel="KG"
        />
        <ProductSection id="powders" title="Traditional Spice Blends (Podis)" products={CLOUD_PODIS_DB} unitLabel="200g" />
        <ProductSection id="fryums" title="Sun-Dried Fryums & Papads (Vadiyalu)" products={CLOUD_FRYUMS_DB} unitLabel="200g" />
        <HeritageLegacy />
        <Testimonials />
      </main>
      <Footer />
      <InfoDrawer />
      <AccountModal />
      <CartDrawer />
      <WishlistDrawer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
