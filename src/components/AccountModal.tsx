import React, { useState } from 'react';
import { X, Award, Sparkles, Check, Gift, Crown, ArrowRight, Clock, ShieldCheck, User } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';

export const AccountModal: React.FC = () => {
  const { isAccountOpen, closeAccount, nourPoints, redeemPoints, redeemedRewards } = useShop();
  const { lang, formatPrice, isRtl } = useLanguage();

  const [notification, setNotification] = useState<string | null>(null);

  if (!isAccountOpen) return null;

  // Rewards catalog
  const rewardsList = [
    {
      id: 'rew-voucher-500',
      title: '500 DZD Boutique Voucher',
      titleAr: 'قسيمة شراء بقيمة 500 دج',
      cost: 250,
      icon: Gift,
      desc: 'Applicable directly on your next Cash on Delivery or online order.'
    },
    {
      id: 'rew-mini-rose',
      title: 'Rose Dew Water Infusion (15ml)',
      titleAr: 'مرطب ماء الورد المصغر (15 مل)',
      cost: 400,
      icon: Sparkles,
      desc: 'Deluxe travel miniature added to your next shipment.'
    },
    {
      id: 'rew-voucher-1000',
      title: '1,000 DZD VIP Voucher',
      titleAr: 'قسيمة شراء VIP بقيمة 1000 دج',
      cost: 600,
      icon: Crown,
      desc: 'Exclusive savings applied to any order above 5,000 DZD.'
    },
    {
      id: 'rew-full-tint',
      title: 'Full-Size Velvet Lip Soufflé',
      titleAr: 'حمرة شفاه سوفليه مخملية بالحجم الكامل',
      cost: 900,
      icon: Award,
      desc: 'Complimentary full-size Parisian nude lip tint of your choice.'
    }
  ];

  const handleRedeem = (reward: (typeof rewardsList)[0]) => {
    if (nourPoints >= reward.cost) {
      const success = redeemPoints(reward.cost, reward.title);
      if (success) {
        setNotification(
          lang === 'ar'
            ? `تهانينا! تم استبدال ${reward.cost} نقطة بنجاح للحصول على "${reward.titleAr}".`
            : `Félicitations ! Vous avez échangé ${reward.cost} points pour "${reward.title}".`
        );
        setTimeout(() => setNotification(null), 4000);
      }
    }
  };

  const nextTierPoints = 1000;
  const progressPercent = Math.min(100, Math.round((nourPoints / nextTierPoints) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FAF7F5] rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200/80 bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#C87D65]" />
            <div>
              <h2 className="font-serif font-bold text-sm sm:text-base text-stone-900">
                {lang === 'ar' ? 'نادي نجمة السماء للولاء والمكافآت' : 'Najmat Al Samaa VIP Rewards Club'}
              </h2>
              <span className="text-[11px] text-stone-500 font-sans block">
                {lang === 'ar' ? 'اجمعي النقاط مع كل طلبية واستبدليها بهدايا فاخرة' : 'Earn points on every purchase and redeem for beauty gifts'}
              </span>
            </div>
          </div>
          <button
            onClick={closeAccount}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {notification && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-xs text-emerald-900 animate-fadeIn">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{notification}</span>
            </div>
          )}

          {/* Member Card & Points Balance Display */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#231F1C] via-[#1C1917] to-[#2D2420] text-white p-6 shadow-xl border border-stone-800 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C87D65]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800/80">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-[#C87D65]">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-white">
                      Meriem Benali
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest text-[#C87D65] font-mono block">
                      Éclat Privilège Member
                    </span>
                  </div>
                </div>
              </div>

              {/* Large Tabular Points Counter */}
              <div className="sm:text-right bg-white/5 sm:bg-transparent p-3 sm:p-0 rounded-2xl sm:rounded-none border border-white/10 sm:border-none">
                <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block">
                  {lang === 'ar' ? 'الرصيد المتاح' : 'Available Balance'}
                </span>
                <div className="flex items-baseline sm:justify-end gap-1.5 mt-0.5">
                  <span className="font-serif font-bold text-3xl sm:text-4xl text-[#FAF7F5] tabular-nums tracking-tight">
                    {nourPoints}
                  </span>
                  <span className="text-xs font-mono font-medium text-[#C87D65]">
                    {lang === 'ar' ? 'نقطة نجمة' : 'Najmat Points'}
                  </span>
                </div>
              </div>
            </div>

            {/* Next Tier Milestone Bar */}
            <div className="pt-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-stone-300">
                  {lang === 'ar' ? 'التقدم نحو رتبة Haute Noblesse' : 'Tier Progress: Haute Noblesse'}
                </span>
                <span className="font-mono text-stone-400 text-[11px]">
                  {nourPoints} / {nextTierPoints} pts ({progressPercent}%)
                </span>
              </div>
              <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#D7A783] to-[#C87D65] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Gamification Rule Callout */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 bg-white rounded-2xl border border-stone-200/80 shadow-2xs space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#C87D65] font-bold">
                {lang === 'ar' ? '01. كسب النقاط' : '01. Earn Points'}
              </span>
              <p className="text-stone-600 font-sans leading-relaxed">
                {lang === 'ar'
                  ? 'احصلي على نقطة نجمة واحدة مقابل كل 10 دج يتم إنفاقها على جميع مستحضرات التجميل والعناية.'
                  : 'Receive 1 Najmat Point per 10 DZD spent on all cosmetics and skincare.'}
              </p>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-stone-200/80 shadow-2xs space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#C87D65] font-bold">
                {lang === 'ar' ? '02. مزايا المستويات' : '02. Tier Perks'}
              </span>
              <p className="text-stone-600 font-sans leading-relaxed">
                {lang === 'ar'
                  ? 'استفيدي من تخفيضات خاصة حصرية وشحن ذو أولوية فائقة مع شركات التوصيل.'
                  : 'Unlock confidential private sales and priority dispatch with Yalidine courier.'}
              </p>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-stone-200/80 shadow-2xs space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#C87D65] font-bold">
                {lang === 'ar' ? '03. صلاحية دائمة' : '03. Zero Expiry'}
              </span>
              <p className="text-stone-600 font-sans leading-relaxed">
                {lang === 'ar'
                  ? 'نقاطكِ المتراكمة تظل صالحة دائماً ولا تسقط طالما أن حسابكِ نشط.'
                  : 'Your accumulated points never expire as long as your account remains active.'}
              </p>
            </div>
          </div>

          {/* Rewards Marketplace */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-sm text-stone-900 uppercase tracking-wide">
                {lang === 'ar' ? 'استبدال النقاط بالمكافآت' : 'Redeem Your Najmat Points'}
              </h4>
              <span className="text-xs text-stone-500 font-mono">
                {rewardsList.length} {lang === 'ar' ? 'مكافآت متاحة' : 'Rewards Available'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rewardsList.map((reward) => {
                const canAfford = nourPoints >= reward.cost;
                const Icon = reward.icon;
                const isClaimed = redeemedRewards.includes(reward.title);

                return (
                  <div
                    key={reward.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                      canAfford
                        ? 'bg-white border-stone-200/90 shadow-xs hover:border-stone-400'
                        : 'bg-stone-50/70 border-stone-200/60 opacity-80'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 rounded-xl bg-[#FAF0E6] text-[#A6624B] flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono font-bold text-stone-900">
                          {reward.cost} {lang === 'ar' ? 'نقطة' : 'pts'}
                        </span>
                      </div>

                      <h5 className="font-serif font-bold text-xs text-stone-900">
                        {lang === 'ar' ? reward.titleAr : reward.title}
                      </h5>
                      <p className="text-[11px] text-stone-500 font-sans leading-relaxed mt-1">
                        {reward.desc}
                      </p>
                    </div>

                    <div className="pt-3 mt-2 border-t border-stone-100 flex items-center justify-between">
                      {isClaimed ? (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {lang === 'ar' ? '✓ تم الاستبدال بنجاح' : '✓ Claimed & Unlocked'}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleRedeem(reward)}
                          disabled={!canAfford}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                            canAfford
                              ? 'bg-[#1C1917] hover:bg-[#2F2926] text-white shadow-xs cursor-pointer'
                              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                          }`}
                        >
                          {canAfford ? (
                            <>
                              <span>{lang === 'ar' ? 'استبدال المكافأة' : 'Redeem Reward'}</span>
                              <ArrowRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
                            </>
                          ) : (
                            <span>
                              {lang === 'ar'
                                ? `تحتاجين إلى ${reward.cost - nourPoints} نقطة إضافية`
                                : `Needs ${reward.cost - nourPoints} more pts`}
                            </span>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
