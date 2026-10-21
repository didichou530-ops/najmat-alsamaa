/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ShopProvider, useShop } from './context/ShopContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductListing } from './components/ProductListing';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { ExpressCheckoutModal } from './components/ExpressCheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { SkinQuizModal } from './components/SkinQuizModal';
import { OrderTracker } from './components/OrderTracker';
import { AdminPortal } from './components/AdminPortal';
import { AccountModal } from './components/AccountModal';
import { Footer } from './components/Footer';
import { LUXURY_PRODUCTS } from './data/products';

const MainContent: React.FC = () => {
  const { route, params, navigate } = useRouter();
  const { products, setActiveProduct, openQuiz } = useShop();

  // Sync route params with direct product URLs (#/product/:id)
  useEffect(() => {
    if (route === '/product' && params.productId) {
      const match = products.find((p) => p.id === params.productId);
      if (match) {
        setActiveProduct(match);
      }
    }
  }, [route, params.productId, products, setActiveProduct]);

  // Sync route with direct quiz URL (#/quiz)
  useEffect(() => {
    if (route === '/quiz') {
      openQuiz();
    }
  }, [route, openQuiz]);

  // 1. DEDICATED SEPARATE ADMIN CONTROL CENTER ROUTE (#/admin)
  if (route === '/admin') {
    return (
      <>
        <AdminPortal />
        <CartDrawer />
        <OrderSuccessModal />
      </>
    );
  }

  // 2. STOREFRONT BOUTIQUE & CUSTOMER PAGES (#/, #/track, #/quiz, #/product)
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F5] text-[#1C1917]">
      <Navbar />

      <main className="flex-1">
        {route === '/track' ? (
          <OrderTracker />
        ) : (
          <>
            <HeroSection />
            <ProductListing />
          </>
        )}
      </main>

      <Footer />

      {/* Global Interactive Modals & Drawers */}
      <CartDrawer />
      <ProductDetailModal />
      <ExpressCheckoutModal />
      <OrderSuccessModal />
      <SkinQuizModal />
      <AccountModal />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <ShopProvider>
        <RouterProvider>
          <MainContent />
        </RouterProvider>
      </ShopProvider>
    </LanguageProvider>
  );
}
