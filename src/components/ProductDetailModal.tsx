import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Check,
  Heart,
  Share2,
  Package
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { Product, Shade, SkinType } from '../types';
import { ProductVisual, resolveMediaUrl } from './ProductVisual';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { LUXURY_PRODUCTS } from '../data/products';
import {
  productName,
  productTagline,
  activeName,
  activeBenefit,
  stepTitle,
  stepDesc,
  outOfStockLabel,
  inStockLabel,
  maxAvailable,
  maxStockHint,
  restockNotice
} from '../utils/localize';

export const ProductDetailModal: React.FC = () => {
  const { products, activeProduct, setActiveProduct, addToCart, openCheckout } = useShop();
  const { lang, formatPrice, isRtl, t } = useLanguage();

  // Hooks declared unconditionally at top level
  const [selectedShade, setSelectedShade] = useState<Shade | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'beforeAfter'>('details');
  const [isIngredientsOpen, setIsIngredientsOpen] = useState(true);
  const [isHowToUseOpen, setIsHowToUseOpen] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [reviewSkinFilter, setReviewSkinFilter] = useState<SkinType | 'all'>('all');
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Synchronize shade and state when active product changes
  useEffect(() => {
    if (activeProduct) {
      setSelectedShade(activeProduct.shades?.[0]);
      setQuantity(1);
      setActiveTab('details');
      setGalleryIndex(0);
    }
  }, [activeProduct]);

  if (!activeProduct) return null;

  const filteredReviews =
    reviewSkinFilter === 'all'
      ? activeProduct.reviews
      : activeProduct.reviews.filter((r) => r.skinType === reviewSkinFilter);

  // Cross-sell bundle items
  const routineBundleItems = (activeProduct.routineBundleIds || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  // حالة التوفّر: المخزون صفر ← لا يمكن إضافة المنتج للسلة
  const stockUnits = Math.max(0, activeProduct.stockCount || 0);
  const outOfStock = stockUnits <= 0;
  const atMaxStock = !outOfStock && quantity >= stockUnits;

  const handleClose = () => {
    setActiveProduct(null);
    if (window.location.hash.includes('/product')) {
      window.location.hash = '#/';
    }
  };

  const handleAddCurrentToBag = () => {
    addToCart(activeProduct, quantity, selectedShade);
  };

  const handleDirectCod = () => {
    openCheckout({
      product: activeProduct,
      shade: selectedShade
    });
  };

  const handleAddBundle = () => {
    addToCart(activeProduct, 1, selectedShade);
    routineBundleItems.forEach((b) => addToCart(b, 1));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#FAF7F5] rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden flex flex-col my-6 max-h-[94vh]">
        {/* Sticky top close bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-md border-b border-stone-200/80">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-serif">
            <span className="uppercase tracking-widest text-[#C87D65] font-sans font-semibold">
              {lang === 'ar' ? 'تشكيلة نجمة السماء الفاخرة' : lang === 'fr' ? 'Sélection Najmat Al Samaa' : 'Najmat Al Samaa Curation'}
            </span>
            <span>·</span>
            <span className="capitalize">{activeProduct.category}</span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-10">
          {/* Main PDP 2-Column Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Visual Gallery & Before/After Slider (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Gallery / Interactive Tabs */}
              {activeProduct.beforeAfter && (
                <div className="flex items-center gap-2 p-1 bg-stone-100/80 rounded-xl w-fit">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      activeTab === 'details'
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {lang === 'ar' ? 'المستحضر والدرجات' : lang === 'fr' ? 'Visuel Studio & Teinte' : 'Studio Visual & Shade'}
                  </button>
                  <button
                    onClick={() => setActiveTab('beforeAfter')}
                    className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                      activeTab === 'beforeAfter'
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C87D65]" />
                    <span>{lang === 'ar' ? 'مقارنة قبل وبعد' : lang === 'fr' ? 'Avant / Après' : 'Before / After Slider'}</span>
                  </button>
                </div>
              )}

              {activeTab === 'details' ? (
                <div className="space-y-4">
                  {/* Hero Visual Display with Dynamic Shade Preview */}
                  <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm">
                    <ProductVisual
                      product={activeProduct}
                      selectedShade={selectedShade}
                      className="w-full h-full"
                      imageUrl={
                        galleryIndex > 0
                          ? activeProduct.gallery?.[galleryIndex - 1]
                          : activeProduct.image
                      }
                    />

                    {/* Badge */}
                    {activeProduct.badge && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-xs border border-stone-200 text-[10px] font-bold uppercase tracking-wider text-stone-800">
                        {activeProduct.badge}
                      </div>
                    )}

                    {/* Origin label */}
                    {activeProduct.tag && (
                      <div
                        className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-xs border text-[10px] font-bold uppercase tracking-wider"
                        style={{
                          color: activeProduct.accentColor,
                          borderColor: `${activeProduct.accentColor}55`
                        }}
                      >
                        {lang === 'ar'
                          ? activeProduct.tag.ar
                          : lang === 'fr'
                            ? activeProduct.tag.fr
                            : activeProduct.tag.en}
                      </div>
                    )}
                  </div>

                  {/* Real product photos gallery */}
                  {activeProduct.image && (activeProduct.gallery?.length ?? 0) > 0 && (
                    <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                      {[activeProduct.image, ...(activeProduct.gallery || [])].map((src, i) => (
                        <button
                          key={`${src}-${i}`}
                          onClick={() => setGalleryIndex(i)}
                          className={`w-16 h-16 shrink-0 rounded-2xl overflow-hidden border transition-all ${
                            galleryIndex === i
                              ? 'border-stone-900 ring-1 ring-stone-900'
                              : 'border-stone-200 hover:border-stone-400'
                          }`}
                          style={{ backgroundColor: `${activeProduct.accentColor}14` }}
                          title={lang === 'ar' ? 'عرض الصورة' : lang === 'fr' ? 'Voir la photo' : 'View photo'}
                        >
                          <img
                            src={resolveMediaUrl(src)}
                            alt={`${activeProduct.name} ${i + 1}`}
                            loading="lazy"
                            onError={(e) => {
                              const el = e.currentTarget;
                              el.style.visibility = 'hidden';
                            }}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Volume / Batch Meta */}
                  <div className="flex items-center justify-between text-xs text-stone-500 font-mono px-2">
                    <span>Volume: {activeProduct.volume}</span>
                    <span>Batch: {activeProduct.batchNumber} · Exp: {activeProduct.expirationDate}</span>
                  </div>
                </div>
              ) : (
                /* Before / After Comparison Slider */
                <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-sm space-y-3">
                  <BeforeAfterSlider
                    beforeLabel={activeProduct.beforeAfter!.beforeLabel}
                    afterLabel={activeProduct.beforeAfter!.afterLabel}
                    beforeDesc={activeProduct.beforeAfter!.beforeDesc}
                    afterDesc={activeProduct.beforeAfter!.afterDesc}
                    durationWeeks={activeProduct.beforeAfter!.durationWeeks}
                  />
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Contiguous Purchase Module (5 cols) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-16">
              {/* Title & Ratings */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-bold text-stone-800">
                    {activeProduct.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-stone-400">
                    ({activeProduct.reviewCount} {lang === 'ar' ? 'تقييم موثق' : lang === 'fr' ? 'avis vérifiés' : 'verified reviews'})
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight">
                  {productName(activeProduct, lang)}
                </h1>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {productTagline(activeProduct, lang)}
                </p>

                {/* Price Display */}
                <div className="pt-2 flex items-baseline gap-3">
                  <span className="text-2xl font-mono font-bold text-stone-900">
                    {formatPrice(activeProduct.priceDZD, activeProduct.priceUSD)}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      outOfStock
                        ? 'bg-rose-50 text-rose-700 font-semibold'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {outOfStock ? outOfStockLabel(lang) : inStockLabel(lang, stockUnits)}
                  </span>
                </div>
              </div>

              {/* Interactive Shade Selector (Fenty-style Inclusive Palette) */}
              {activeProduct.shades && activeProduct.shades.length > 0 && (
                <div className="space-y-3 p-4 bg-white rounded-2xl border border-stone-200/80 shadow-xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-800 font-sans">
                      {t('selectShade')}:
                    </span>
                    <span className="font-serif italic text-stone-600 font-medium">
                      {selectedShade?.name}
                    </span>
                  </div>

                  {/* Swatches Grid */}
                  <div className="grid grid-cols-5 gap-2">
                    {activeProduct.shades.map((shade) => {
                      const isSelected = selectedShade?.id === shade.id;
                      return (
                        <button
                          key={shade.id}
                          onClick={() => setSelectedShade(shade)}
                          className={`group relative p-1 rounded-xl flex flex-col items-center gap-1 transition-all ${
                            isSelected
                              ? 'bg-stone-100 ring-2 ring-[#C87D65]'
                              : 'hover:bg-stone-50'
                          }`}
                        >
                          <div
                            className="w-8 h-8 rounded-full shadow-inner border border-black/15 transition-transform group-hover:scale-105"
                            style={{ backgroundColor: shade.hex }}
                          />
                          <span className="text-[9px] font-mono text-stone-700 truncate max-w-full">
                            {shade.name.split(' ')[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {selectedShade && (
                    <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-500 font-sans flex items-center justify-between">
                      <span>{selectedShade.description}</span>
                      <span className="uppercase text-[10px] font-mono bg-stone-100 px-1.5 py-0.5 rounded text-stone-600">
                        {selectedShade.undertone}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Purchase Actions (Quantity + Add to Bag + Fast COD) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div
                    className={`flex items-center border rounded-xl bg-white px-2 py-1 shadow-xs ${
                      outOfStock ? 'border-stone-200 opacity-50' : 'border-stone-300'
                    }`}
                  >
                    <button
                      disabled={outOfStock}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1.5 text-stone-500 hover:text-stone-900 transition-colors disabled:cursor-not-allowed"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-mono font-bold text-stone-900">
                      {quantity}
                    </span>
                    <button
                      disabled={outOfStock || atMaxStock}
                      onClick={() => setQuantity(Math.min(stockUnits, quantity + 1))}
                      title={atMaxStock ? maxAvailable(lang, stockUnits) : undefined}
                      className="p-1.5 text-stone-500 hover:text-stone-900 transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <button
                    onClick={handleAddCurrentToBag}
                    disabled={outOfStock}
                    className={`flex-1 py-3 px-5 rounded-xl text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      outOfStock
                        ? 'bg-stone-300 cursor-not-allowed shadow-none'
                        : 'bg-[#1C1917] hover:bg-[#2F2926] shadow-md hover:shadow-lg'
                    }`}
                  >
                    <span>
                      {outOfStock ? outOfStockLabel(lang) : t('addToBag')}
                    </span>
                  </button>
                </div>

                {/* حدّ الكمية المتوفرة */}
                {!outOfStock && atMaxStock && (
                  <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 font-medium">
                    {maxStockHint(lang, stockUnits)}
                  </p>
                )}

                {/* نافد المخزون: رسالة بديلة */}
                {outOfStock && (
                  <p className="text-[11px] text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-1.5 font-medium">
                    {restockNotice(lang)}
                  </p>
                )}

                {/* 1-Page Fast COD Button (Direct express order for this item) */}
                <button
                  onClick={handleDirectCod}
                  disabled={outOfStock}
                  className={`w-full py-3.5 px-5 rounded-xl text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    outOfStock
                      ? 'bg-stone-300 cursor-not-allowed shadow-none'
                      : 'bg-gradient-to-r from-[#C87D65] to-[#B56750] hover:from-[#B56750] hover:to-[#9F543E] shadow-lg hover:shadow-xl'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>{t('expressCodOrder')}</span>
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-stone-700" />
                    <span>{lang === 'ar' ? 'توصيل خلال 48 ساعة (58 ولاية)' : lang === 'fr' ? 'Livraison 48h (58 Wilayas)' : '48h Delivery (58 Wilayas)'}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                    <span>{lang === 'ar' ? 'الدفع عند الاستلام نقداً' : lang === 'fr' ? 'Paiement à la livraison' : 'Cash on Delivery'}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ACCORDION TABS: Active Ingredients, How to Use, Shipping Policy */}
          <div className="border-t border-stone-200/90 pt-8 space-y-4">
            {/* 1. Key Actives & Ingredients Accordion */}
            <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs">
              <button
                onClick={() => setIsIngredientsOpen(!isIngredientsOpen)}
                className="w-full px-6 py-4 flex items-center justify-between text-left rtl:text-right font-serif font-bold text-sm text-stone-900 hover:bg-stone-50/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C87D65]" />
                  <span>{lang === 'ar' ? `${t('keyIngredients')} والتركيبة التفصيلية` : lang === 'fr' ? `${t('keyIngredients')} & Formule Complète` : `${t('keyIngredients')} & Full Formula`}</span>
                </div>
                {isIngredientsOpen ? (
                  <ChevronUp className="w-4 h-4 text-stone-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-400" />
                )}
              </button>

              {isIngredientsOpen && (
                <div className="px-6 pb-6 pt-2 space-y-4 border-t border-stone-100">
                  {/* Spotlight cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {activeProduct.keyActives.map((active, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-[#FAF7F5] border border-stone-200/70 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-xs text-stone-900">
                            {activeName(active, lang)}
                          </span>
                          {active.concentration && (
                            <span className="text-[10px] font-mono font-bold text-[#C87D65]">
                              {active.concentration}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-600 leading-relaxed font-sans">
                          {activeBenefit(active, lang)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Full INCI Ingredients List */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-1">
                      {lang === 'ar' ? 'قائمة المكونات الكاملة والمعتمدة (INCI):' : lang === 'fr' ? 'Déclaration INCI Complète :' : 'Full INCI Declaration:'}
                    </span>
                    <p className="text-[11px] text-stone-500 font-mono leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-100">
                      {activeProduct.ingredients.join(', ')}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 2. How to Use Ritual Accordion */}
            <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs">
              <button
                onClick={() => setIsHowToUseOpen(!isHowToUseOpen)}
                className="w-full px-6 py-4 flex items-center justify-between text-left rtl:text-right font-serif font-bold text-sm text-stone-900 hover:bg-stone-50/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-stone-700" />
                  <span>{t('howToApply')}</span>
                </div>
                {isHowToUseOpen ? (
                  <ChevronUp className="w-4 h-4 text-stone-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-400" />
                )}
              </button>

              {isHowToUseOpen && (
                <div className="px-6 pb-6 pt-2 space-y-3 border-t border-stone-100">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {activeProduct.howToUse.map((step) => (
                      <div key={step.step} className="space-y-1.5 p-3 rounded-xl bg-stone-50/70">
                        <span className="text-xs font-mono font-bold text-[#C87D65]">
                          0{step.step}.
                        </span>
                        <h4 className="font-serif font-bold text-xs text-stone-900">
                          {stepTitle(step, lang)}
                        </h4>
                        <p className="text-[11px] text-stone-600 leading-relaxed font-sans">
                          {stepDesc(step, lang)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Shipping & Return Policy Accordion */}
            <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs">
              <button
                onClick={() => setIsShippingOpen(!isShippingOpen)}
                className="w-full px-6 py-4 flex items-center justify-between text-left rtl:text-right font-serif font-bold text-sm text-stone-900 hover:bg-stone-50/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-stone-700" />
                  <span>{lang === 'ar' ? 'معلومات التوصيل والشحن (الدفع عند الاستلام)'
                    : lang === 'fr' ? 'Livraison & Modalités Paiement (Cash on Delivery)'
                    : 'Shipping & Payment Policy (Cash on Delivery)'}</span>
                </div>
                {isShippingOpen ? (
                  <ChevronUp className="w-4 h-4 text-stone-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-400" />
                )}
              </button>

              {isShippingOpen && (
                <div className="px-6 pb-6 pt-2 text-xs text-stone-600 space-y-2 border-t border-stone-100 leading-relaxed font-sans">
                  {lang === 'ar' ? (
                    <>
                      <p>
                        • <strong>توصيل سريع وموثوق خلال 48 ساعة:</strong> شحن يومي معتمد عبر شريكنا الرسمي ياليدين إكسبريس (Yalidine Express) لكافة الولايات الـ 58 (لباب المنزل أو مكتب الاستلام Stop-Desk).
                      </p>
                      <p>
                        • <strong>الدفع نقداً عند الاستلام (COD):</strong> بدون أي دفع مسبق. عايني الطرد وتأكدي من سلامة التغليف ثم ادفعي للموزع مباشرة.
                      </p>
                      <p>
                        • <strong>شحن مجاني وهدايا فاخرة:</strong> توصيل مجاني لكافة الولايات للطلبيات التي تتجاوز 8,000 دج + عينتان فاخرتان مجاناً مع كل طلبية.
                      </p>
                    </>
                    ) : lang === 'fr' ? (
                    <>
                      <p>
                        • <strong>Livraison Express 48h :</strong> Expédition quotidienne par notre partenaire Yalidine Express sur 58 Wilayas (à domicile ou en agence Stop-Desk).
                      </p>
                      <p>
                        • <strong>Paiement à la Réception :</strong> Vous ne payez rien d'avance. Réglez le montant exact en espèces auprès du livreur à la remise du colis.
                      </p>
                      <p>
                        • <strong>Seuil Gratuité :</strong> Livraison offerte dès 8 000 DZD d'achats + 2 échantillons deluxe offerts dans chaque commande.
                      </p>
                    </>
) : (
                    <>
                      <p>
                        <strong>Express 48h Delivery:</strong> Daily shipping with our partner Yalidine Express to all 58 Wilayas (home delivery or Stop-Desk pickup).
                      </p>
                      <p>
                        <strong>Cash on Delivery:</strong> You pay nothing in advance. Hand the exact amount in cash to the courier when the parcel is delivered.
                      </p>
                      <p>
                        <strong>Free Shipping Threshold:</strong> Free delivery on orders from 8,000 DZD + 2 complimentary deluxe samples in every order.
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* CROSS-SELL: COMPLETE THE ROUTINE & SAVE 15% */}
          {routineBundleItems.length > 0 && (
            <div className="p-6 bg-gradient-to-r from-[#FAF0E6] via-[#F4E3D7] to-[#FAF0E6] rounded-3xl border border-[#E8D4C8] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#A6624B]">
                    Synergistic Ritual Duo
                  </span>
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    {t('completeRoutineTitle')}
                  </h3>
                </div>
                <button
                  onClick={handleAddBundle}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-medium tracking-wide flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t('addBundleToCart')}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {routineBundleItems.map((bundleProduct) => (
                  <div
                    key={bundleProduct.id}
                    className="p-3 bg-white/90 rounded-2xl border border-stone-200/80 flex items-center gap-3 shadow-xs"
                  >
                    <div className="w-14 h-16 rounded-xl overflow-hidden shrink-0 border border-stone-100">
                      <ProductVisual
                        product={bundleProduct}
                        className="w-full h-full scale-75"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-xs text-stone-900 truncate">
                        {bundleProduct.name}
                      </h4>
                      <p className="text-[10px] text-stone-500 truncate">{bundleProduct.tagline}</p>
                      <span className="text-xs font-mono font-bold text-[#C87D65] mt-1 block">
                        {formatPrice(bundleProduct.priceDZD, bundleProduct.priceUSD)}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(bundleProduct, 1)}
                      className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl transition-colors shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VERIFIED CUSTOMER REVIEWS WITH FILTER BY SKIN TYPE & AGE */}
          <div className="border-t border-stone-200/90 pt-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif font-bold text-xl text-stone-900">
                  {t('verifiedReviews')}
                </h3>
                <span className="text-xs text-stone-500">
                  Real experiences from verified purchasers across Algeria & Europe.
                </span>
              </div>

              {/* Skin Type Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {(['all', 'combination', 'dry', 'sensitive'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setReviewSkinFilter(filter)}
                    className={`px-3 py-1 text-xs rounded-full font-medium transition-colors whitespace-nowrap ${
                      reviewSkinFilter === filter
                        ? 'bg-[#1C1917] text-white shadow-xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {filter === 'all' ? t('allSkinTypes') : filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Reviews List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredReviews.length === 0 ? (
                <div className="col-span-2 py-8 text-center text-xs text-stone-500 italic">
                  No reviews matching this specific skin type filter yet.
                </div>
              ) : (
                filteredReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-xs text-stone-900">
                          {rev.author}
                        </span>
                        {rev.verifiedPurchase && (
                          <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                            <Check className="w-2.5 h-2.5" /> Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-stone-400 font-mono">
                      <span>Skin: {rev.skinType}</span>
                      <span>·</span>
                      <span>Age: {rev.ageGroup}</span>
                      {rev.shadeUsed && (
                        <>
                          <span>·</span>
                          <span>Shade: {rev.shadeUsed}</span>
                        </>
                      )}
                    </div>

                    <h5 className="font-serif font-bold text-xs text-stone-800">
                      "{rev.title}"
                    </h5>
                    <p className="text-xs text-stone-600 font-sans leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sticky Mobile Purchase Bar (< sm screens) */}
        <div className="sm:hidden p-3 bg-white border-t border-stone-200 flex items-center justify-between gap-3 shadow-lg">
          <div>
            <span className="text-[10px] text-stone-500 block">Total</span>
            <span className="font-mono font-bold text-sm text-stone-900">
              {formatPrice(activeProduct.priceDZD, activeProduct.priceUSD)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddCurrentToBag}
              className="px-4 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold uppercase tracking-wider"
            >
              Bag
            </button>
            <button
              onClick={handleDirectCod}
              className="px-4 py-2.5 bg-[#C87D65] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm"
            >
              COD 1-Clic
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
