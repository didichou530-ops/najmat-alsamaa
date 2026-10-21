import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, ShoppingBag, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useShop } from '../context/ShopContext';
import { LUXURY_PRODUCTS } from '../data/products';
import { ProductVisual } from './ProductVisual';

export const HeroSection: React.FC = () => {
  const { lang, formatPrice, isRtl, t } = useLanguage();
  const { openQuiz, setActiveProduct, addToCart } = useShop();

  const [activeHotspot, setActiveHotspot] = useState<number | null>(0);

  const heroFoundation = LUXURY_PRODUCTS[0];
  const heroSerum = LUXURY_PRODUCTS[1];
  const heroCream = LUXURY_PRODUCTS[2];

  const hotspots = [
    {
      id: 0,
      x: '38%',
      y: '55%',
      product: heroFoundation,
      tag: 'Second-Skin Base'
    },
    {
      id: 1,
      x: '62%',
      y: '42%',
      product: heroSerum,
      tag: '24K Peptide Nectar'
    },
    {
      id: 2,
      x: '75%',
      y: '68%',
      product: heroCream,
      tag: 'Barrier Cream'
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F5] via-[#F4EBE4] to-[#FAF7F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* LEFT COLUMN: Editorial Headline & Actions (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Clean Unboxed Text Kicker (No Pill Enclosure) */}
            <div className="flex items-center gap-2 text-xs font-serif text-[#C87D65] tracking-widest uppercase">
              <span>{t('heroKicker')}</span>
              <span aria-hidden="true">·</span>
              <span className="font-sans text-stone-500 lowercase tracking-normal">paris & alger</span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1
              className="font-serif font-bold text-stone-900 tracking-tight leading-[1.12]"
              style={{
                fontSize: 'clamp(2.1rem, 3.8vw, 3.6rem)',
                textWrap: 'balance'
              }}
            >
              {t('heroHeadline')}
            </h1>

            {/* Body Prose */}
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl font-sans">
              {t('heroSubtext')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('catalog-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-3.5 px-7 rounded-2xl bg-[#1C1917] hover:bg-[#2C2622] text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                <span>{t('heroCtaShop')}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={openQuiz}
                className="py-3.5 px-6 rounded-2xl bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C87D65]" />
                <span>{t('heroCtaQuiz')}</span>
              </button>
            </div>

            {/* Editorial Quantitative Proof (Claim-to-Proof Adjacency) */}
            <div className="pt-6 border-t border-stone-200/90 grid grid-cols-3 gap-4 text-xs font-sans">
              <div>
                <span className="font-serif font-bold text-base text-stone-900 block">
                  {lang === 'ar' ? '10 درجات شاملة' : '10 Inclusive'}
                </span>
                <span className="text-stone-500 text-[11px]">
                  {lang === 'ar' ? 'مصممة لبشرتنا' : 'Mediterranean Shades'}
                </span>
              </div>
              <div>
                <span className="font-serif font-bold text-base text-stone-900 block">
                  {lang === 'ar' ? 'دفع عند الاستلام' : '100% COD'}
                </span>
                <span className="text-stone-500 text-[11px]">
                  {lang === 'ar' ? 'معاينة الطرد قبل الدفع' : 'Pay upon delivery'}
                </span>
              </div>
              <div>
                <span className="font-serif font-bold text-base text-stone-900 block">
                  {lang === 'ar' ? 'خلال 48 ساعة' : '48-Hour'}
                </span>
                <span className="text-stone-500 text-[11px]">
                  {lang === 'ar' ? 'لكافة الـ 58 ولاية' : '58 Wilayas Yalidine'}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive "Shop the Look" Editorial Still (6 cols) */}
          <div className="lg:col-span-6">
            <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden border border-stone-200 shadow-xl bg-gradient-to-br from-[#FAF2EC] via-[#EFE0D4] to-[#DFCCBE]">
              {/* Luxury Composition Setup */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="grid grid-cols-3 gap-4 items-end w-full max-w-md h-full pb-8">
                  {/* Item 1: Foundation */}
                  <div className="h-64 flex flex-col justify-end">
                    <ProductVisual
                      product={heroFoundation}
                      selectedShade={heroFoundation.shades?.[5]}
                      className="w-full h-full rounded-2xl shadow-md border border-white/40"
                    />
                  </div>

                  {/* Item 2: Peptide Serum Center Hero */}
                  <div className="h-72 flex flex-col justify-end">
                    <ProductVisual
                      product={heroSerum}
                      className="w-full h-full rounded-2xl shadow-xl border border-white/60"
                    />
                  </div>

                  {/* Item 3: Barrier Balm */}
                  <div className="h-56 flex flex-col justify-end">
                    <ProductVisual
                      product={heroCream}
                      className="w-full h-full rounded-2xl shadow-md border border-white/40"
                    />
                  </div>
                </div>
              </div>

              {/* Interactive Hotspot Pins */}
              {hotspots.map((hs) => {
                const isActive = activeHotspot === hs.id;
                return (
                  <div
                    key={hs.id}
                    className="absolute z-20"
                    style={{ left: hs.x, top: hs.y }}
                  >
                    <button
                      onClick={() => setActiveHotspot(isActive ? null : hs.id)}
                      className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-[#1C1917] text-white scale-110 shadow-lg'
                          : 'bg-white/95 text-stone-900 border border-black/15 shadow-md hover:scale-110'
                      }`}
                      aria-label={hs.tag}
                    >
                      <span className="text-[10px] font-bold font-mono">0{hs.id + 1}</span>
                      <span className="absolute -inset-1 rounded-full border border-stone-900/30 animate-ping pointer-events-none" />
                    </button>

                    {/* Popover Card */}
                    {isActive && (
                      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 w-56 p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200 shadow-xl z-30 animate-scaleUp">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-[#C87D65] block">
                          {hs.tag}
                        </span>
                        <h4 className="font-serif font-bold text-xs text-stone-900 truncate">
                          {hs.product.name}
                        </h4>
                        <div className="flex items-center justify-between mt-1 pt-1 border-t border-stone-100">
                          <span className="text-xs font-mono font-bold text-stone-900">
                            {formatPrice(hs.product.priceDZD, hs.product.priceUSD)}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => addToCart(hs.product, 1)}
                              className="p-1 bg-stone-900 hover:bg-[#C87D65] text-white rounded-lg transition-colors"
                              title="Add to bag"
                            >
                              <ShoppingBag className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => setActiveProduct(hs.product)}
                              className="p-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg transition-colors"
                              title="Quick view"
                            >
                              <Eye className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Bottom Hotspot Helper Badge */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-stone-700 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-200/80 shadow-xs">
                <span className="font-serif italic">{t('heroShopLookTitle')}</span>
                <span className="font-mono text-[10px] text-stone-500">3 Hotspots Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
