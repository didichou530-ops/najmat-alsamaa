import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Gift, Truck, ArrowRight, Sparkles, Award } from 'lucide-react';
import { useShop, FREE_SHIPPING_THRESHOLD_DZD, FREE_SHIPPING_THRESHOLD_USD } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { FREE_SAMPLES_LIST } from '../data/regions';
import { ProductVisual } from './ProductVisual';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotalDZD,
    subtotalUSD,
    isFreeShipping,
    shippingRemainingDZD,
    shippingRemainingUSD,
    shippingProgressPercent,
    selectedSamples,
    toggleSample,
    openCheckout,
    nourPoints,
    potentialPointsEarned,
    openAccount,
    products
  } = useShop();

  const { lang, currency, formatPrice, isRtl, t } = useLanguage();

  if (!isCartOpen) return null;

  const handleStartCheckout = () => {
    closeCart();
    openCheckout();
  };

  // المخزون الحالي من الكتالوج الحيّ (السلة تحتفظ بنسخة المنتج وقت إضافته)
  const liveStock = (productId: string) => {
    const live = products.find((p) => p.id === productId);
    return Math.max(0, live?.stockCount ?? 0);
  };

  // ⛔ تحذير المخزون: أي منتج نافد (صفر) في السلة يمنع إتمام الطلب
  const outOfStockItems = cart.filter((i) => liveStock(i.product.id) <= 0);
  const hasOutOfStock = outOfStockItems.length > 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity animate-fadeIn"
      />

      <div
        className={`absolute inset-y-0 ${
          isRtl ? 'left-0' : 'right-0'
        } max-w-full flex pl-10 sm:pl-16 w-screen max-w-md`}
      >
        <div className="w-full bg-[#FAF7F5] shadow-2xl flex flex-col border-l border-stone-200/80 animate-slideIn">
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-200/80 bg-white/80 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-[#C87D65]" />
              <h2 className="font-serif font-bold text-base tracking-wider text-stone-900 uppercase">
                {t('bagTitle')}
              </h2>
              <span className="text-xs font-mono text-stone-500">
                ({cart.reduce((a, b) => a + b.quantity, 0)})
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Dynamic Free Shipping & Gift Progress Bar */}
          <div className="px-6 py-3.5 bg-[#F6EEE9] border-b border-[#EBD5C8]">
            <div className="flex items-center gap-2 mb-2">
              {isFreeShipping ? (
                <Gift className="w-4 h-4 text-[#C87D65] animate-bounce" />
              ) : (
                <Truck className="w-4 h-4 text-stone-700" />
              )}
              <span className="text-xs font-medium text-stone-800 leading-tight">
                {isFreeShipping
                  ? t('freeShippingUnlocked')
                  : t('freeShippingProgress', {
                      amount: formatPrice(shippingRemainingDZD, shippingRemainingUSD)
                    })}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-stone-200/90 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D7A783] via-[#C87D65] to-[#7A2841] transition-all duration-500 rounded-full"
                style={{ width: `${shippingProgressPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-stone-500 mt-1 font-mono">
              <span>{shippingProgressPercent}% {lang === 'ar' ? 'مكتمل' : 'Unlocked'}</span>
              <span>
                {lang === 'ar' ? 'الحد المجاني:' : 'Goal:'} {formatPrice(FREE_SHIPPING_THRESHOLD_DZD, FREE_SHIPPING_THRESHOLD_USD)}
              </span>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                  <ShoppingBag className="w-7 h-7 stroke-1" />
                </div>
                <p className="text-sm text-stone-600 font-serif italic">{t('cartEmpty')}</p>
                <button
                  onClick={closeCart}
                  className="px-5 py-2 text-xs font-medium bg-[#1C1917] text-white rounded-xl hover:bg-[#332C28] transition-colors"
                >
                  {t('heroCtaShop')}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3.5 bg-white rounded-2xl border border-stone-200/80 shadow-xs relative group"
                >
                  {/* Miniature Visual */}
                  <div className="w-20 h-22 rounded-xl overflow-hidden shrink-0 border border-stone-100">
                    <ProductVisual
                      product={item.product}
                      selectedShade={item.selectedShade}
                      className="w-full h-full scale-90"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif font-bold text-xs text-stone-900 leading-snug truncate">
                          {lang === 'ar' ? (item.product.nameAr || item.product.name) : item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-300 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedShade && (
                        <div className="flex items-center gap-1.5 mt-1 text-[11px] text-stone-600">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: item.selectedShade.hex }}
                          />
                          <span className="truncate">{item.selectedShade.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                      {/* Stepper */}
                      <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-stone-200 text-stone-600 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-medium text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= Math.max(1, liveStock(item.product.id))}
                          title={
                            item.quantity >= Math.max(1, liveStock(item.product.id))
                              ? lang === 'ar'
                                ? `الحد الأقصى المتوفر (${liveStock(item.product.id)})`
                                : `Max available (${liveStock(item.product.id)})`
                              : undefined
                          }
                          className="p-1 hover:bg-stone-200 text-stone-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-xs font-semibold font-mono text-stone-900">
                        {formatPrice(
                          item.product.priceDZD * item.quantity,
                          item.product.priceUSD * item.quantity
                        )}
                      </span>
                    </div>

                    {/* نافد المخزون: تنبيه داخل الصنف */}
                    {liveStock(item.product.id) <= 0 && (
                      <p className="mt-2 text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-2.5 py-1.5">
                        {lang === 'ar'
                          ? 'نفدت الكمية — أزل هذا المنتج لإتمام الطلب'
                          : 'Out of stock — remove this item to checkout'}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}

            {/* SEPHORA STYLE FREE SAMPLE SELECTOR (Pick up to 2) */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-stone-200/90 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C87D65]" />
                    <h4 className="text-xs font-serif font-bold text-stone-900 uppercase tracking-wide">
                      {t('pickSamplesTitle')}
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-stone-500">
                    {selectedSamples.length}/2
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {FREE_SAMPLES_LIST.map((sample) => {
                    const isSelected = selectedSamples.includes(sample.id);
                    return (
                      <button
                        key={sample.id}
                        type="button"
                        onClick={() => toggleSample(sample.id)}
                        className={`text-left p-2.5 rounded-xl border text-xs transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#C87D65] bg-white ring-1 ring-[#C87D65] shadow-xs'
                            : 'border-stone-200 bg-white/60 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: sample.colorHex }}
                          />
                          <span
                            className={`text-[9px] font-semibold uppercase px-1 py-0.2 rounded ${
                              isSelected
                                ? 'bg-[#FAF0E6] text-[#A6624B]'
                                : 'text-stone-400 bg-stone-100'
                            }`}
                          >
                            {isSelected ? t('sampleSelected') : 'Free'}
                          </span>
                        </div>
                        <span className="font-serif font-medium text-stone-900 line-clamp-1 text-[11px]">
                          {lang === 'ar' ? sample.nameAr : sample.name}
                        </span>
                        <span className="text-[10px] text-stone-400 font-mono mt-0.5">
                          {sample.volume} · {sample.category}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer with Subtotal & Express Checkout Button */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-stone-200/80 shadow-lg space-y-4">
              {/* Gamified Nour Points Rewards Strip */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-[#FAF1EA] via-[#F5E6DA] to-[#FAF1EA] border border-[#E8D4C8] flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#C87D65] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold font-serif text-stone-900 leading-tight">
                        +{potentialPointsEarned} {lang === 'ar' ? 'نقطة نجمة' : 'Najmat Points'}
                      </span>
                      <span className="text-[9px] font-mono uppercase bg-white/80 px-1 py-0.2 rounded text-[#A6624B] font-semibold">
                        {lang === 'ar' ? 'تُكتسب مع هذا الطلب' : 'Earn on purchase'}
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-600 block truncate font-sans">
                      {lang === 'ar' ? 'رصيدك الحالي:' : 'Balance:'} <strong className="font-mono text-stone-900">{nourPoints} {lang === 'ar' ? 'نقطة' : 'pts'}</strong> {lang === 'ar' ? '· استبدليها بمكافآت فاخرة' : '· Redeem for luxury gifts'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    openAccount();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 hover:border-stone-400 text-stone-800 text-[10px] font-semibold whitespace-nowrap hover:bg-stone-50 transition-colors shrink-0 shadow-2xs cursor-pointer"
                >
                  {lang === 'ar' ? 'نادي النخبة' : 'VIP Club'}
                </button>
              </div>

              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>{t('subtotal')}</span>
                  <span className="font-mono font-semibold text-stone-900 text-sm">
                    {formatPrice(subtotalDZD, subtotalUSD)}
                  </span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>{t('estimatedDelivery')}</span>
                  <span className="font-mono">
                    {isFreeShipping ? (
                      <span className="text-emerald-700 font-medium uppercase text-[11px]">
                        {lang === 'ar' ? 'مجاني (0 دج)' : 'Gratuit / Free'}
                      </span>
                    ) : (
                      lang === 'ar' ? 'تُحسب عند تأكيد الطلب' : 'Calculated at checkout'
                    )}
                  </span>
                </div>
              </div>

              {/* ⛔ تحذير: منتج نافد المخزون — لا يمكن إتمام الطلب */}
              {hasOutOfStock && (
                <div className="rounded-xl bg-rose-50 border border-rose-200 px-3.5 py-3 space-y-1.5">
                  <p className="text-[11px] font-bold text-rose-800">
                    {lang === 'ar'
                      ? `نفدت الكمية من ${outOfStockItems.length === 1 ? 'منتج' : `${outOfStockItems.length} منتجات`} في سلتك`
                      : `${outOfStockItems.length === 1 ? 'One item is' : `${outOfStockItems.length} items are`} out of stock in your bag`}
                  </p>
                  <ul className="space-y-1">
                    {outOfStockItems.map((it) => (
                      <li key={it.id} className="flex items-center justify-between gap-2 text-[11px] text-rose-700">
                        <span className="truncate">{it.product.name}</span>
                        <button
                          onClick={() => removeFromCart(it.id)}
                          className="shrink-0 underline underline-offset-2 font-semibold hover:text-rose-900 cursor-pointer"
                        >
                          {lang === 'ar' ? 'إزالة' : 'Remove'}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={handleStartCheckout}
                disabled={hasOutOfStock}
                className={`w-full py-4 px-6 rounded-2xl text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                  hasOutOfStock
                    ? 'bg-stone-300 cursor-not-allowed shadow-none'
                    : 'bg-[#1C1917] hover:bg-[#2C2623] shadow-xl hover:shadow-2xl cursor-pointer'
                }`}
              >
                <span>{t('checkoutBtn')}</span>
                <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </button>

              <div className="text-center">
                <span className="text-[10px] text-stone-600 font-sans">
                  {lang === 'ar'
                    ? 'الدفع نقداً عند الاستلام متاح لكافة الولايات الـ 58'
                    : 'Paiement à la Livraison (COD) disponible sur 58 Wilayas'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
