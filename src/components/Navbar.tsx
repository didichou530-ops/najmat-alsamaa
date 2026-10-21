import React, { useState } from 'react';
import { ShoppingBag, Search, Sparkles, Globe, ChevronDown, Menu, X, Award, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useShop } from '../context/ShopContext';
import { useRouter } from '../context/RouterContext';
import { SearchModal } from './SearchModal';

export const Navbar: React.FC = () => {
  const { lang, setLang, currency, setCurrency, t } = useLanguage();
  const { cartCount, openCart, openQuiz, nourPoints, openAccount } = useShop();
  const { route, navigate } = useRouter();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* 1. Slim Top Announcement Bar (≤ 40px) with Language & Currency Switcher */}
      <div className="bg-[#1C1917] text-[#FAF7F5] text-[11px] px-4 py-2 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="truncate font-sans font-medium">
            <span>{t('freeShippingPromo')}</span>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-[10px] font-mono">
            {/* Language Switcher */}
            <div className="flex items-center gap-1.5 border-r border-white/20 pr-3">
              <button
                onClick={() => setLang('en')}
                className={`transition-colors ${lang === 'en' ? 'text-[#C87D65] font-bold' : 'text-stone-300 hover:text-white'}`}
              >
                EN
              </button>
              <span className="text-stone-500">·</span>
              <button
                onClick={() => setLang('fr')}
                className={`transition-colors ${lang === 'fr' ? 'text-[#C87D65] font-bold' : 'text-stone-300 hover:text-white'}`}
              >
                FR
              </button>
              <span className="text-stone-500">·</span>
              <button
                onClick={() => setLang('ar')}
                className={`transition-colors font-sans ${lang === 'ar' ? 'text-[#C87D65] font-bold' : 'text-stone-300 hover:text-white'}`}
              >
                العربية
              </button>
            </div>

            {/* Currency Switcher */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrency('DZD')}
                className={`transition-colors ${currency === 'DZD' ? 'text-[#C87D65] font-bold' : 'text-stone-300 hover:text-white'}`}
              >
                DZD (دج)
              </button>
              <span className="text-stone-500">·</span>
              <button
                onClick={() => setCurrency('USD')}
                className={`transition-colors ${currency === 'USD' ? 'text-[#C87D65] font-bold' : 'text-stone-300 hover:text-white'}`}
              >
                USD ($)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-5 single-line nav links) — Zone 3 (1 primary action / Cart) */}
      <header className="sticky top-0 z-40 bg-[#FAF7F5]/90 backdrop-blur-md border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-[#C87D65]" />
            <span>{t('brandName')}</span>
          </button>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-stone-600">
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const el = document.getElementById('catalog-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 cursor-pointer"
            >
              {t('navSkincare')}
            </button>
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const el = document.getElementById('catalog-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 cursor-pointer"
            >
              {t('navMakeup')}
            </button>
            <button
              onClick={() => navigate('/quiz')}
              className={`hover:text-[#9F543E] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 hover:underline underline-offset-4 cursor-pointer ${
                route === '/quiz' ? 'text-stone-900 font-bold' : 'text-[#C87D65]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('navRoutineFinder')}</span>
            </button>
            <button
              onClick={() => navigate('/track')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 cursor-pointer ${
                route === '/track' ? 'text-stone-900 font-bold' : ''
              }`}
            >
              {t('navTrackOrder')}
            </button>
          </nav>

          {/* Zone 3: Loyalty points, Search affordance & Primary Bag Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* VIP Loyalty Nour Points Trigger */}
            <button
              onClick={openAccount}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200/90 hover:border-stone-400 bg-white/70 text-xs text-stone-800 hover:bg-white transition-all shadow-2xs"
              title="Najmat Al Samaa VIP Rewards & Points"
            >
              <Award className="w-3.5 h-3.5 text-[#C87D65]" />
              <span className="font-mono font-bold text-stone-900">{nourPoints}</span>
              <span className="hidden sm:inline font-sans text-stone-500 text-[11px]">pts</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-stone-600 hover:text-stone-900 rounded-full hover:bg-stone-200/60 transition-colors"
              aria-label="Search products"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Primary Action: Shopping Bag Button */}
            <button
              onClick={openCart}
              className="relative px-3.5 py-2 text-xs font-medium text-white bg-[#1C1917] rounded-xl hover:bg-[#2C2724] transition-all flex items-center gap-2 whitespace-nowrap shrink-0 shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('bagTitle')}</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#C87D65] text-white text-[10px] font-mono font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF7F5] border-t border-stone-200 px-6 py-4 space-y-3 animate-fadeIn">
            <button
              onClick={() => {
                openAccount();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-between w-full py-2 px-3 bg-stone-100 rounded-xl text-xs font-semibold text-stone-900"
            >
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#C87D65]" />
                <span>{lang === 'ar' ? 'نادي نجمة السماء VIP' : 'Najmat VIP Club'}</span>
              </span>
              <span className="font-mono text-[#C87D65]">{nourPoints} {lang === 'ar' ? 'نقطة' : 'Points'}</span>
            </button>

            <button
              onClick={() => {
                navigate('/');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left rtl:text-right py-2 text-xs font-semibold uppercase tracking-wider text-stone-800 cursor-pointer"
            >
              {t('allCategories')}
            </button>
            <button
              onClick={() => {
                navigate('/quiz');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left rtl:text-right py-2 text-xs font-semibold uppercase tracking-wider text-[#C87D65] flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('navRoutineFinder')}</span>
            </button>
            <button
              onClick={() => {
                navigate('/track');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left rtl:text-right py-2 text-xs font-semibold uppercase tracking-wider text-stone-800 cursor-pointer"
            >
              {t('navTrackOrder')}
            </button>
          </div>
        )}
      </header>

      {/* Instant Live Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
