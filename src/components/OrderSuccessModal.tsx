import React, { useState } from 'react';
import { CheckCircle2, MessageCircle, ShieldCheck, X, ArrowRight, Phone, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';

export const OrderSuccessModal: React.FC = () => {
  const { completedOrder, setCompletedOrder, updateOrderStatus } = useShop();
  const { lang, formatPrice, t, isRtl } = useLanguage();
  const { navigate } = useRouter();

  const [otpCode, setOtpCode] = useState('');
  const [isOtpSuccess, setIsOtpSuccess] = useState(false);

  if (!completedOrder) return null;

  const handleClose = () => {
    setCompletedOrder(null);
  };

  const handleGoToTracker = () => {
    const orderRef = completedOrder.id;
    setCompletedOrder(null);
    navigate(`/track/${orderRef}`);
  };

  // Generate pre-filled WhatsApp message URL
  const encodedMessage = encodeURIComponent(
    lang === 'ar'
      ? `مرحباً متجر نجمة السماء! أؤكد طلبيتي رقم ${completedOrder.id} (${completedOrder.customerName}، ولاية: ${completedOrder.wilayaName}). المبلغ الإجمالي: ${completedOrder.total} دج. شكراً!`
      : `Bonjour Najmat Al Samaa! Je confirme ma commande ${completedOrder.id} (${completedOrder.customerName}, Wilaya: ${completedOrder.wilayaName}). Total: ${completedOrder.total} DZD. Merci!`
  );
  const whatsAppUrl = `https://wa.me/213550000000?text=${encodedMessage}`;

  const handleSimulateOtp = () => {
    setOtpCode('4892');
    setTimeout(() => {
      setIsOtpSuccess(true);
      updateOrderStatus(completedOrder.id, 'confirmed');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FAF7F5] rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden flex flex-col p-6 space-y-5 animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="font-serif font-bold text-xl text-stone-900">
            {t('orderConfirmedTitle')}
          </h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 rounded-full text-xs font-mono font-semibold text-stone-800">
            <span>{t('orderNumber')}:</span>
            <span className="text-[#C87D65]">{completedOrder.id}</span>
          </div>
        </div>

        {/* Order Details Brief */}
        <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-xs space-y-2 text-xs">
          <div className="flex justify-between text-stone-600">
            <span>{lang === 'ar' ? 'المستلم:' : lang === 'fr' ? 'Destinataire :' : 'Destinataire:'}</span>
            <span className="font-semibold text-stone-900">{completedOrder.customerName}</span>
          </div>
          <div className="flex justify-between text-stone-600">
            <span>{lang === 'ar' ? 'رقم الهاتف:' : lang === 'fr' ? 'Téléphone :' : 'Téléphone:'}</span>
            <span className="font-mono text-stone-900">{completedOrder.phone}</span>
          </div>
          <div className="flex justify-between text-stone-600">
            <span>{lang === 'ar' ? 'عنوان التوصيل:' : lang === 'fr' ? 'Destination :' : 'Destination:'}</span>
            <span className="text-stone-900">
              {completedOrder.commune}، {completedOrder.wilayaName}
            </span>
          </div>
          <div className="flex justify-between text-stone-600 pt-2 border-t border-stone-100">
            <span className="font-serif font-bold text-stone-900">
              {lang === 'ar' ? 'المبلغ المطلوب نقداً (COD):' : lang === 'fr' ? 'Montant à régler (COD) :' : 'Montant à régler (COD):'}
            </span>
            <span className="font-mono font-bold text-stone-900 text-sm">
              {formatPrice(completedOrder.total, completedOrder.total / 135)}
            </span>
          </div>
        </div>

        {/* Anti-Return / Anti-Fake Verification Action */}
        <div className="p-4 bg-[#F8EFEA] rounded-2xl border border-[#E8D4C8] space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C87D65] shrink-0 mt-0.5" />
            <h4 className="font-serif font-bold text-xs uppercase tracking-wide text-stone-900">
              {lang === 'ar'
                ? 'تأكيد الطلبية الفوري لضمان سرعة الشحن'
                : 'Confirmation Immédiate Anti-Retour (WhatsApp / SMS)'}
            </h4>
          </div>

          <p className="text-[11px] text-stone-600 leading-relaxed font-sans">
            {lang === 'ar'
              ? 'لتسريع تجهيز طردكِ وخروجه مع الموزع اليوم، قومي بتأكيد الطلبية بنقرة واحدة عبر واتساب أو رمز التحقق.'
              : 'Pour expédier votre colis dès aujourd\'hui sans attendre l\'appel de notre centre, confirmez en 1 clic par WhatsApp.'}
          </p>

          {/* 1-Click WhatsApp Confirmation Trigger */}
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => updateOrderStatus(completedOrder.id, 'confirmed')}
            className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BE5A] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t('whatsAppConfirmBtn')}</span>
          </a>

          {/* Optional SMS OTP Verification Box */}
          <div className="pt-2 border-t border-[#E8D4C8]/70 flex items-center gap-2">
            <input
              type="text"
              maxLength={4}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              placeholder={lang === 'ar' ? 'رمز SMS' : lang === 'fr' ? 'Code SMS' : 'SMS Code'}
              className="w-24 px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-mono text-center tracking-widest text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
            />
            <button
              onClick={handleSimulateOtp}
              disabled={isOtpSuccess}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5 ${
                isOtpSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              {isOtpSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'تم التأكيد!' : lang === 'fr' ? 'Vérifié & Confirmé !' : 'Vérifié & Confirmé !'}</span>
                </>
              ) : (
                <span>{t('smsOtpVerifyBtn')}</span>
              )}
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-1 flex items-center justify-between">
          <button
            onClick={handleGoToTracker}
            className="w-full py-3 px-4 rounded-xl border border-stone-300 hover:bg-white text-stone-800 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <span>{t('trackYourOrderBtn')}</span>
            <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
