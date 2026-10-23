import React, { useState, useEffect } from 'react';
import { Search, Package, CheckCircle2, Clock, Truck, ShieldAlert, ArrowLeft, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { Order } from '../types';

export const OrderTracker: React.FC = () => {
  const { findOrder, orders } = useShop();
  const { lang, formatPrice, isRtl, t } = useLanguage();
  const { params, navigate } = useRouter();

  const [orderId, setOrderId] = useState(params.orderId || '');
  const [phone, setPhone] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (params.orderId) {
      const match = orders.find(
        (o) => o.id.toUpperCase() === params.orderId.toUpperCase()
      );
      if (match) {
        setOrderId(match.id);
        setPhone(match.phone);
        setSearchedOrder(match);
        setHasSearched(true);
      }
    }
  }, [params.orderId, orders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const found = findOrder(orderId, phone);
    setSearchedOrder(found || null);
  };

  const handlePrefill = (ord: Order) => {
    setOrderId(ord.id);
    setPhone(ord.phone);
    setSearchedOrder(ord);
    setHasSearched(true);
  };

  // Step definitions for visual progression
  const steps = [
    { key: 'new', label: 'Order Registered', labelAr: 'تسجيل الطلبية', labelFr: 'Commande Enregistrée', icon: Clock },
    { key: 'confirmed', label: 'Intent Verified', labelAr: 'تأكيد الطلبية هاتفياً', labelFr: 'Intention Vérifiée', icon: CheckCircle2 },
    { key: 'packed', label: 'Packed & Stamped', labelAr: 'التجهيز والتغليف الفاخر', labelFr: 'Préparé & Étiqueté', icon: Package },
    { key: 'shipped', label: 'In Transit (Yalidine)', labelAr: 'مع شركة التوصيل', labelFr: 'En Transit (Yalidine)', icon: Truck },
    { key: 'delivered', label: 'Delivered (COD Paid)', labelAr: 'تم التسليم والتحصيل', labelFr: 'Livré (COD Payé)', icon: CheckCircle2 }
  ];

  const getStepStatus = (stepKey: string, currentStatus: string) => {
    const orderProgression = ['new', 'confirmed', 'packed', 'shipped', 'delivered'];
    const currentIndex = orderProgression.indexOf(currentStatus);
    const stepIndex = orderProgression.indexOf(stepKey);

    if (currentStatus === 'cancelled' || currentStatus === 'blacklisted') {
      return 'cancelled';
    }
    if (stepIndex <= currentIndex) return 'completed';
    return 'upcoming';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Return to shop */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
          <span>{lang === 'ar' ? 'العودة للمتجر (#/)' : lang === 'fr' ? 'Retour à la Boutique (#/)' : 'Back to Boutique (#/)'}</span>
        </button>
        <span className="text-xs font-mono text-stone-400">
          {lang === 'ar' ? 'تتبع شحنات متجر نجمة السماء' : lang === 'fr' ? 'Suivi Logistique NAJMAT AL SAMAA' : 'NAJMAT AL SAMAA Logistics Tracker'}
        </span>
      </div>

      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#C87D65] font-sans">
          Real-Time Courier Tracking
        </span>
        <h1 className="text-3xl font-serif font-bold text-stone-900">
          {t('trackingTitle')}
        </h1>
        <p className="text-xs text-stone-600 max-w-md mx-auto">
          {t('trackingSubtitle')}
        </p>
      </div>

      {/* Search Lookup Form */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm max-w-2xl mx-auto space-y-4">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                {t('orderNumber')}
              </label>
              <input
                type="text"
                required
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder={t('orderIdPlaceholder')}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono uppercase text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                {t('phoneLabel')}
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t('phonePlaceholder')}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-[#1C1917] hover:bg-[#2E2825] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Search className="w-4 h-4" />
            <span>{t('trackSubmitBtn')}</span>
          </button>
        </form>

        {/* Quick Demo Click Fill */}
        {orders.length > 0 && (
          <div className="pt-2 border-t border-stone-100">
            <span className="text-[11px] text-stone-500 block mb-1.5">
              Quick test orders currently in the system:
            </span>
            <div className="flex flex-wrap gap-2">
              {orders.slice(0, 3).map((ord) => (
                <button
                  key={ord.id}
                  type="button"
                  onClick={() => handlePrefill(ord)}
                  className="px-2.5 py-1 bg-stone-100 hover:bg-[#FAF0E6] border border-stone-200 rounded-lg text-[11px] font-mono text-stone-700 transition-colors"
                >
                  {ord.id} ({ord.customerName.split(' ')[0]})
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SEARCH RESULT VIEW */}
      {hasSearched && (
        <div className="max-w-2xl mx-auto animate-fadeIn">
          {searchedOrder ? (
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden space-y-6 p-6">
              {/* Order Status Badge & Meta */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                    Order Ref: {searchedOrder.id}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    {searchedOrder.customerName} · {searchedOrder.wilayaName}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-mono font-bold uppercase text-stone-800">
                    Status: {searchedOrder.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Visual 5-Step Progression Bar */}
              <div className="space-y-4">
                <div className="relative flex items-center justify-between">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-stone-100 -translate-y-1/2 z-0" />
                  {steps.map((st, i) => {
                    const statusState = getStepStatus(st.key, searchedOrder.status);
                    const isDone = statusState === 'completed';
                    const Icon = st.icon;

                    return (
                      <div key={st.key} className="relative z-10 flex flex-col items-center">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                            isDone
                              ? 'bg-[#1C1917] text-white shadow-md'
                              : 'bg-stone-200 text-stone-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span
                          className={`text-[10px] text-center mt-2 font-medium max-w-[70px] leading-tight ${
                            isDone ? 'text-stone-900 font-bold' : 'text-stone-400'
                          }`}
                        >
                          {lang === 'ar' ? st.labelAr : lang === 'fr' ? (st.labelFr || st.label) : st.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tracking Chronological Event Logs */}
              <div className="pt-4 border-t border-stone-100 space-y-3">
                <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-stone-800">
                  Carrier Event History (Yalidine Express / Hub Alger)
                </h4>

                <div className="space-y-2.5">
                  {searchedOrder.trackingHistory.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-start justify-between text-xs"
                    >
                      <div>
                        <span className="font-medium text-stone-900 block">{item.status}</span>
                        <span className="text-[11px] text-stone-500 font-sans">{item.location}</span>
                      </div>
                      <span className="text-[10px] font-mono text-stone-400 whitespace-nowrap">
                        {item.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items & Payment Summary */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-stone-500 block">Payment Method:</span>
                  <span className="font-semibold text-stone-900 uppercase">
                    {searchedOrder.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Card'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-stone-500 block">Total Due:</span>
                  <span className="font-mono font-bold text-base text-stone-900">
                    {formatPrice(searchedOrder.total, searchedOrder.total / 135)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-3xl border border-stone-200 shadow-sm space-y-2">
              <ShieldAlert className="w-8 h-8 text-amber-500 mx-auto" />
              <h4 className="font-serif font-bold text-stone-900 text-sm">
                Order not found
              </h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                We could not find an order matching "{orderId}" with phone "{phone}". Please verify the digits or contact our customer desk.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
