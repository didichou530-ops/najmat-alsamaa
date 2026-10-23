import React, { useState } from 'react';
import { X, ShieldCheck, Truck, MapPin, Phone, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { WILAYAS_LIST } from '../data/regions';
import { productName, pickText } from '../utils/localize';
import { ProductVisual } from './ProductVisual';

export const ExpressCheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    closeCheckout,
    directCheckoutItem,
    cart,
    selectedSamples,
    subtotalDZD,
    subtotalUSD,
    isFreeShipping,
    createOrder
  } = useShop();

  const { lang, currency, formatPrice, isRtl, t } = useLanguage();

  const isDirectOrder = !!directCheckoutItem;
  const currentSubtotalDZD = isDirectOrder
    ? directCheckoutItem.product.priceDZD
    : subtotalDZD;
  const currentSubtotalUSD = isDirectOrder
    ? directCheckoutItem.product.priceUSD
    : subtotalUSD;

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedWilayaCode, setSelectedWilayaCode] = useState(WILAYAS_LIST[0].code);
  const selectedWilaya =
    WILAYAS_LIST.find((w) => w.code === selectedWilayaCode) || WILAYAS_LIST[0];
  const [commune, setCommune] = useState(selectedWilaya.communes[0] || '');
  const [address, setAddress] = useState('');
  const [deliveryType, setDeliveryType] = useState<'home' | 'desk'>('home');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [notes, setNotes] = useState('');

  // Validation
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  // Compute live delivery fee
  const orderQualifiesFreeShipping = currentSubtotalDZD >= 8000;
  const baseDeliveryFee =
    deliveryType === 'desk'
      ? selectedWilaya.deskDeliveryFee
      : selectedWilaya.homeDeliveryFee;
  const finalDeliveryFee = orderQualifiesFreeShipping ? 0 : baseDeliveryFee;
  const grandTotalDZD = currentSubtotalDZD + finalDeliveryFee;
  const grandTotalUSD = currentSubtotalUSD + (orderQualifiesFreeShipping ? 0 : 5);

  const handleWilayaChange = (code: string) => {
    setSelectedWilayaCode(code);
    const w = WILAYAS_LIST.find((item) => item.code === code);
    if (w && w.communes.length > 0) {
      setCommune(w.communes[0]);
    }
  };

  const validatePhone = (val: string) => {
    const clean = val.replace(/\s+/g, '');
    // Algeria mobile: 05, 06, or 07 followed by 8 digits, or +213 / 00213
    const regex = /^(0|\+213|00213)?[567][0-9]{8}$/;
    return regex.test(clean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim() || fullName.trim().length < 3) {
      setErrorMsg(
        lang === 'ar'
          ? 'يرجى كتابة الاسم واللقب الكامل'
          : 'Please enter your full name (minimum 3 characters).'
      );
      return;
    }

    if (!validatePhone(phone)) {
      setErrorMsg(
        lang === 'ar'
          ? 'رقم الهاتف غير صالح. يرجى إدخال رقم هاتف جزائري يبدأ بـ 05 أو 06 أو 07'
          : 'Invalid phone number. Please enter a valid Algerian mobile starting with 05, 06, or 07.'
      );
      return;
    }

    if (!address.trim() || address.trim().length < 5) {
      setErrorMsg(
        lang === 'ar'
          ? 'يرجى كتابة العنوان بالتفصيل (الحي، العمارة أو نقطة دالة للموزع)'
          : 'Please provide full street address or location landmark for delivery.'
      );
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      createOrder({
        customerName: fullName.trim(),
        phone: phone.trim(),
        wilayaCode: selectedWilaya.code,
        commune,
        address: address.trim(),
        deliveryType,
        paymentMethod,
        notes: notes.trim(),
        singleProductItem: isDirectOrder
          ? {
              product: directCheckoutItem.product,
              shade: directCheckoutItem.shade,
              quantity: 1
            }
          : undefined
      });
      setIsSubmitting(false);
      closeCheckout();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#FAF7F5] rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200/80 bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#C87D65]" />
            <div>
              <h2 className="font-serif font-bold text-sm sm:text-base text-stone-900">
                {t('checkoutHeading')}
              </h2>
              <span className="text-[11px] text-stone-500 block">
                {t('checkoutSubtitle')}
              </span>
            </div>
          </div>
          <button
            onClick={closeCheckout}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Column: Form Fields (7 cols) */}
            <div className="md:col-span-7 space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-xs text-red-800">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  {t('fullNameLabel')} <span className="text-[#C87D65]">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-stone-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={lang === 'ar' ? 'فاطمة الزهراء بوعلام' : 'e.g. Amina Benyahia'}
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#C87D65] focus:border-[#C87D65]"
                  />
                </div>
              </div>

              {/* Phone Number with validation note */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    {t('phoneLabel')} <span className="text-[#C87D65]">*</span>
                  </label>
                  <span className="text-[10px] text-stone-500 font-mono">05 / 06 / 07</span>
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-stone-400 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0550 12 34 56"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-stone-300 rounded-xl text-xs font-mono text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#C87D65] focus:border-[#C87D65]"
                  />
                </div>
              </div>

              {/* Wilaya & Commune */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    {t('wilayaLabel')} <span className="text-[#C87D65]">*</span>
                  </label>
                  <select
                    value={selectedWilayaCode}
                    onChange={(e) => handleWilayaChange(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
                  >
                    {WILAYAS_LIST.map((w) => (
                      <option key={w.code} value={w.code}>
                        {pickText(lang, w.name, w.name, w.nameAr)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    {t('communeLabel')} <span className="text-[#C87D65]">*</span>
                  </label>
                  <select
                    value={commune}
                    onChange={(e) => setCommune(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
                  >
                    {selectedWilaya.communes.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Delivery Type Option (Home vs Stop-Desk) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  {t('deliveryTypeLabel')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('home')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      deliveryType === 'home'
                        ? 'border-[#C87D65] bg-white ring-1 ring-[#C87D65] shadow-xs'
                        : 'border-stone-200 bg-white/50 text-stone-600'
                    }`}
                  >
                    <span className="block text-xs font-semibold text-stone-900">
                      {t('homeDelivery')}
                    </span>
                    <span className="block text-[10px] text-stone-500 font-mono mt-0.5">
                      {orderQualifiesFreeShipping ? '0 DZD (Free)' : `${selectedWilaya.homeDeliveryFee} DZD`}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('desk')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      deliveryType === 'desk'
                        ? 'border-[#C87D65] bg-white ring-1 ring-[#C87D65] shadow-xs'
                        : 'border-stone-200 bg-white/50 text-stone-600'
                    }`}
                  >
                    <span className="block text-xs font-semibold text-stone-900">
                      {t('deskDelivery')}
                    </span>
                    <span className="block text-[10px] text-stone-500 font-mono mt-0.5">
                      {orderQualifiesFreeShipping ? '0 DZD (Free)' : `${selectedWilaya.deskDeliveryFee} DZD`}
                    </span>
                  </button>
                </div>
              </div>

              {/* Street Address & Landmark */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  {t('addressLabel')} <span className="text-[#C87D65]">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-stone-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={
                      lang === 'ar'
                        ? 'الحي، رقم العمارة أو الشارع، وبجانب أي معلم معروف'
                        : 'e.g. Cité 100 Logements, Bâtiment B, près de la Mosquée'
                    }
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  {t('paymentMethodLabel')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      paymentMethod === 'cod'
                        ? 'border-[#1C1917] bg-white ring-1 ring-[#1C1917] shadow-xs'
                        : 'border-stone-200 bg-white/50 text-stone-600'
                    }`}
                  >
                    <div>
                      <span className="block text-xs font-bold text-stone-900">
                        {t('codPayment')}
                      </span>
                      <span className="block text-[10px] text-emerald-700 font-medium">
                        {lang === 'ar' ? 'الدفع عند الاستلام نقداً' : 'Pay upon arrival'}
                      </span>
                    </div>
                    {paymentMethod === 'cod' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-left rtl:text-right transition-all flex items-center justify-between ${
                      paymentMethod === 'card'
                        ? 'border-[#1C1917] bg-white ring-1 ring-[#1C1917] shadow-xs'
                        : 'border-stone-200 bg-white/50 text-stone-600'
                    }`}
                  >
                    <div>
                      <span className="block text-xs font-bold text-stone-900">
                        {t('cardPayment')}
                      </span>
                      <span className="block text-[10px] text-stone-500">
                        {lang === 'ar' ? 'البطاقة الذهبية / CIB' : 'CIB / Edahabia / Card'}
                      </span>
                    </div>
                    {paymentMethod === 'card' && (
                      <CheckCircle2 className="w-4 h-4 text-stone-900 shrink-0" />
                    )}
                  </button>
                </div>
              </div>

              {/* Delivery notes */}
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  {t('orderNotesLabel')}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={lang === 'ar' ? 'الاتصال هاتفياً قبل المجيء...' : 'e.g. Call 1 hour prior to arrival'}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-800"
                />
              </div>
            </div>

            {/* Right Column: Order Summary (5 cols) */}
            <div className="md:col-span-5 flex flex-col justify-between bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
              <div>
                <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-stone-900 pb-3 border-b border-stone-100">
                  {isDirectOrder
                    ? lang === 'ar'
                      ? 'طلب فوري مباشر'
                      : 'Direct 1-Click Order'
                    : lang === 'ar'
                    ? 'ملخص الطلبية'
                    : 'Order Overview'}
                </h3>

                {/* Items preview */}
                <div className="py-3 space-y-2.5 max-h-48 overflow-y-auto">
                  {isDirectOrder ? (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-14 rounded-lg overflow-hidden shrink-0 border border-stone-100">
                        <ProductVisual
                          product={directCheckoutItem.product}
                          selectedShade={directCheckoutItem.shade}
                          className="w-full h-full scale-75"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-serif font-bold text-stone-900 truncate">
                          {productName(directCheckoutItem.product, lang)}
                        </h4>
                        {directCheckoutItem.shade && (
                          <span className="text-[10px] text-stone-500 block truncate">
                            {directCheckoutItem.shade.name}
                          </span>
                        )}
                        <span className="text-xs font-mono font-medium text-stone-800">
                          {formatPrice(
                            directCheckoutItem.product.priceDZD,
                            directCheckoutItem.product.priceUSD
                          )}
                        </span>
                      </div>
                    </div>
                  ) : (
                    cart.map((it) => (
                      <div key={it.id} className="flex items-center justify-between text-xs">
                        <div className="min-w-0 pr-2 rtl:pr-0 rtl:pl-2">
                          <span className="font-medium text-stone-900 truncate block">
                            {productName(it.product, lang)}
                          </span>
                          {it.selectedShade && (
                            <span className="text-[10px] text-stone-500 block">
                              {it.selectedShade.name} × {it.quantity}
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-stone-800 shrink-0">
                          {formatPrice(
                            it.product.priceDZD * it.quantity,
                            it.product.priceUSD * it.quantity
                          )}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                {/* Free gifts summary */}
                {selectedSamples.length > 0 && (
                  <div className="py-2 border-t border-stone-100 text-[11px] text-stone-600 flex items-center justify-between">
                    <span>{lang === 'ar' ? 'عينتان فاخرتان مجانيتان' : '2 Free Deluxe Samples'}</span>
                    <span className="font-mono text-emerald-700 font-bold uppercase text-[10px]">
                      {lang === 'ar' ? 'هدية مجانية' : 'Complimentary'}
                    </span>
                  </div>
                )}

                {/* Totals Breakdown */}
                <div className="pt-3 border-t border-stone-100 space-y-1.5 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>{t('subtotal')}</span>
                    <span className="font-mono text-stone-900">
                      {formatPrice(currentSubtotalDZD, currentSubtotalUSD)}
                    </span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>{t('estimatedDelivery')}</span>
                    <span className="font-mono">
                      {finalDeliveryFee === 0 ? (
                        <span className="text-emerald-700 font-semibold uppercase text-[10px]">
                          {lang === 'ar' ? 'مجاني (0 دج)' : 'Free (Gratuit)'}
                        </span>
                      ) : (
                        formatPrice(finalDeliveryFee, 5)
                      )}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                    <span className="font-serif font-bold text-stone-900 text-sm">{lang === 'ar' ? 'المجموع الإجمالي' : 'Total'}</span>
                    <span className="font-mono font-bold text-stone-900 text-base">
                      {formatPrice(grandTotalDZD, grandTotalUSD)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Anti-Return Policy Callout */}
              <div className="p-3 bg-[#FAF7F5] rounded-xl border border-stone-200/90 text-[11px] text-stone-600 leading-relaxed flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C87D65] shrink-0 mt-0.5" />
                <span>{t('antiFakeNotice')}</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-[#1C1917] hover:bg-[#2C2522] text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>{lang === 'ar' ? 'جاري تأكيد الطلب...' : 'Processing...'}</span>
                ) : (
                  <span>{t('placeOrderBtn')}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
