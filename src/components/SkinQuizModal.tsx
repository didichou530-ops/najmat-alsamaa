import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useShop } from '../context/ShopContext';
import { LUXURY_PRODUCTS } from '../data/products';
import { ProductVisual } from './ProductVisual';
import { Shade } from '../types';

export const SkinQuizModal: React.FC = () => {
  const { isQuizOpen, closeQuiz, addToCart } = useShop();
  const { lang, formatPrice, isRtl } = useLanguage();

  const [step, setStep] = useState(1);
  const [skinType, setSkinType] = useState<'combination' | 'dry' | 'oily' | 'sensitive'>('combination');
  const [concern, setConcern] = useState<'pores' | 'hydration' | 'anti-aging' | 'brightening'>('pores');
  const [finish, setFinish] = useState<'satin' | 'dewy' | 'velvet'>('satin');
  const [tone, setTone] = useState<string>('280-desert-olive');
  const [isCalculated, setIsCalculated] = useState(false);

  if (!isQuizOpen) return null;

  const foundationProduct = LUXURY_PRODUCTS.find((p) => p.id === 'prod-luminous-silk-foundation')!;
  const matchedShade: Shade =
    foundationProduct.shades?.find((s) => s.id === tone) || foundationProduct.shades![5];

  // Matched Routine recommendations based on answers
  const recommendedSerum =
    concern === 'anti-aging' || skinType === 'dry'
      ? LUXURY_PRODUCTS.find((p) => p.id === 'prod-cellular-serum')!
      : LUXURY_PRODUCTS.find((p) => p.id === 'prod-dew-resurfacing-essence')!;

  const recommendedCream = LUXURY_PRODUCTS.find((p) => p.id === 'prod-barrier-cream')!;
  const recommendedCleanser = LUXURY_PRODUCTS.find((p) => p.id === 'prod-cloud-cleanser')!;

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setStep(1);
    setIsCalculated(false);
  };

  const handleClose = () => {
    closeQuiz();
    if (window.location.hash.includes('/quiz')) {
      window.location.hash = '#/';
    }
  };

  const handleAddFullRoutine = () => {
    addToCart(foundationProduct, 1, matchedShade);
    addToCart(recommendedSerum, 1);
    addToCart(recommendedCream, 1);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FAF7F5] rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200/80 bg-white/70 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C87D65]" />
            <h2 className="text-sm font-serif font-bold tracking-wider text-stone-900 uppercase">
              {lang === 'ar' ? 'تشخيص البشرة ومطابقة الدرجة' : lang === 'fr' ? 'Diagnostic & Recherche de Teinte' : 'Skin Diagnostic & Shade Finder'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!isCalculated ? (
            <>
              {/* Progress dots */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-500 uppercase tracking-widest font-sans">
                  {lang === 'ar' ? `المرحلة ${step} من 4` : lang === 'fr' ? `Étape ${step} sur 4` : `Step ${step} of 4`}
                </span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4].map((s) => (
                    <div
                      key={s}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        s === step ? 'w-8 bg-[#C87D65]' : s < step ? 'w-3 bg-stone-700' : 'w-3 bg-stone-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Step 1: Skin Type */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-serif text-stone-900 font-semibold mb-1">
                      {lang === 'ar' ? 'كيف تشعرين ببشرتك في منتصف النهار؟' : lang === 'fr' ? 'Comment décririez-vous votre peau à la mi-journée ?' : 'How does your bare skin behave by midday?'}
                    </h3>
                    <p className="text-xs text-stone-600">
                      {lang === 'ar' ? 'اختاري الحالة الأقرب لطبيعة بشرتك' : 'Select the primary skin profile you identify with.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      {
                        id: 'combination',
                        title: 'Combination',
                        titleAr: 'مختلطة',
                        desc: 'T-zone shine with normal or dry cheeks.'
                      },
                      {
                        id: 'dry',
                        title: 'Dry & Tight',
                        titleAr: 'جافة ومشدودة',
                        desc: 'Prone to flaking, craving rich hydration.'
                      },
                      {
                        id: 'oily',
                        title: 'Oily / Congested',
                        titleAr: 'دهنية ومعرضة للمسام',
                        desc: 'Persistent sheen, visible pores, prone to breakouts.'
                      },
                      {
                        id: 'sensitive',
                        title: 'Sensitive & Reactive',
                        titleAr: 'حساسة وسريعة التهيج',
                        desc: 'Easily reddens, reacts to weather and fragrance.'
                      }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSkinType(item.id as any)}
                        className={`text-left p-4 rounded-2xl border transition-all ${
                          skinType === item.id
                            ? 'border-[#C87D65] bg-white shadow-md ring-1 ring-[#C87D65]'
                            : 'border-stone-200 bg-white/60 hover:bg-white hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-serif font-bold text-stone-900 text-sm">
                            {lang === 'ar' ? item.titleAr : item.title}
                          </span>
                          {skinType === item.id && <Check className="w-4 h-4 text-[#C87D65]" />}
                        </div>
                        <p className="text-xs text-stone-500 leading-relaxed font-sans">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Skin Concern */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-serif text-stone-900 font-semibold mb-1">
                      {lang === 'ar' ? 'ما هو هدفك الأساسي أو مشكلتك التي تودين علاجها؟' : 'What is your primary skincare objective?'}
                    </h3>
                    <p className="text-xs text-stone-600">
                      {lang === 'ar' ? 'سنخصص المكونات النشطة المناسبة لنتائج حقيقية' : 'We will select bio-compatible actives tailored to this target.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      {
                        id: 'pores',
                        title: 'Texture & Enlarged Pores',
                        titleAr: 'المسام الواسعة وعدم تجانس الملمس',
                        desc: 'Refine surface smoothness and smooth makeup application.'
                      },
                      {
                        id: 'hydration',
                        title: 'Dehydration & Barrier Repair',
                        titleAr: 'الجفاف الشديد وترميم الحاجز الواقي',
                        desc: 'Plump fine dehydration lines and calm redness.'
                      },
                      {
                        id: 'anti-aging',
                        title: 'Firmness & Collagen Boost',
                        titleAr: 'شد البشرة ومقاومة علامات التقدم بالسن',
                        desc: 'Restore skin bounce and diminish expression creases.'
                      },
                      {
                        id: 'brightening',
                        title: 'Dullness & Dark Spot Radiance',
                        titleAr: 'توحيد اللون والتخلص من البقع الباهتة',
                        desc: 'Awaken luminous glow and fade sun-induced spots.'
                      }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setConcern(item.id as any)}
                        className={`text-left p-4 rounded-2xl border transition-all ${
                          concern === item.id
                            ? 'border-[#C87D65] bg-white shadow-md ring-1 ring-[#C87D65]'
                            : 'border-stone-200 bg-white/60 hover:bg-white hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-serif font-bold text-stone-900 text-sm">
                            {lang === 'ar' ? item.titleAr : item.title}
                          </span>
                          {concern === item.id && <Check className="w-4 h-4 text-[#C87D65]" />}
                        </div>
                        <p className="text-xs text-stone-500 leading-relaxed font-sans">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Preferred Makeup Finish */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-serif text-stone-900 font-semibold mb-1">
                      {lang === 'ar' ? 'ما هو المظهر النهائي المفضل لديك لكريم الأساس؟' : 'What is your desired foundation complexion finish?'}
                    </h3>
                    <p className="text-xs text-stone-600">
                      {lang === 'ar' ? 'من اللمعان الزجاجي إلى المات المخملي' : 'From lit-from-within Parisian dewy to soft blurred velvet.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {[
                      {
                        id: 'satin',
                        title: 'Natural Satin Velvet',
                        titleAr: 'ساتان مخملي طبيعي',
                        desc: 'Second-skin skin balance; neither shiny nor powdery flat.'
                      },
                      {
                        id: 'dewy',
                        title: 'Luminous Glass Glow',
                        titleAr: 'إشراقة زجاجية مضيئة',
                        desc: 'Fresh morning hydration with juicy reflective highlights.'
                      },
                      {
                        id: 'velvet',
                        title: 'Soft Blur Demi-Matte',
                        titleAr: 'فلتر ناعم نصف مات',
                        desc: 'Long-lasting climate control that locks oil for 16 hours.'
                      }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setFinish(item.id as any)}
                        className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                          finish === item.id
                            ? 'border-[#C87D65] bg-white shadow-md ring-1 ring-[#C87D65]'
                            : 'border-stone-200 bg-white/60 hover:bg-white hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-serif font-bold text-stone-900 text-sm">
                            {lang === 'ar' ? item.titleAr : item.title}
                          </span>
                          {finish === item.id && <Check className="w-4 h-4 text-[#C87D65]" />}
                        </div>
                        <p className="text-xs text-stone-500 leading-relaxed font-sans">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Complexion Tone & Undertone */}
              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-serif text-stone-900 font-semibold mb-1">
                      {lang === 'ar' ? 'حددي لون بشرتك ونغمتها التحتية (Undertone)' : 'Select your skin tone & undertone depth'}
                    </h3>
                    <p className="text-xs text-stone-600">
                      {lang === 'ar' ? 'تركيبتنا الحريرية تندمج تلقائياً مع دفء بشرتك' : 'Inclusive pigments formulated for authentic Mediterranean & North African skin tones.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2">
                    {foundationProduct.shades?.map((sh) => (
                      <button
                        key={sh.id}
                        onClick={() => setTone(sh.id)}
                        className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                          tone === sh.id
                            ? 'border-stone-900 bg-white shadow-md ring-2 ring-[#C87D65]'
                            : 'border-stone-200 bg-white/50 hover:bg-white'
                        }`}
                      >
                        <div
                          className="w-10 h-10 rounded-full shadow-inner border border-black/10 transition-transform"
                          style={{ backgroundColor: sh.hex }}
                        />
                        <span className="text-[11px] font-semibold text-stone-800 line-clamp-1">
                          {sh.name.split(' ')[0]}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider text-stone-400 font-sans">
                          {sh.undertone}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Results Screen */
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center space-y-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C87D65] font-sans">
                  {lang === 'ar' ? 'تشخيصك الحصري المكتمل' : 'Personalized Clinical Curation'}
                </span>
                <h3 className="text-2xl font-serif text-stone-900 font-bold">
                  {lang === 'ar' ? 'روتينك النباتي المتكامل ودرجة الأساس المطابقة' : 'Your Tailored Routine & Perfect Shade Match'}
                </h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  {lang === 'ar'
                    ? 'بناءً على معطيات بشرتك المختلطة/الحساسة والمظهر المرغوب، اخترنا لك التركيبة الأكثر توافقاً'
                    : 'Curated for your skin balance, target concerns, and humidity endurance.'}
                </p>
              </div>

              {/* Matched Shade Card */}
              <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl shadow-inner border border-black/10 shrink-0"
                  style={{ backgroundColor: matchedShade.hex }}
                />
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-[#FAF0E6] text-[#A6624B]">
                      {matchedShade.undertone} {lang === 'ar' ? 'نغمة تحتية' : 'Undertone'}
                    </span>
                    <span className="text-xs text-stone-400 font-mono">
                      {lang === 'ar' ? 'تطابق 100%' : '100% Match'}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-stone-900 text-lg mt-1">
                    {lang === 'ar' ? (matchedShade.nameAr || matchedShade.name) : matchedShade.name}
                  </h4>
                  <p className="text-xs text-stone-600 font-sans">
                    {matchedShade.description}
                  </p>
                </div>
                <div className="text-right rtl:text-left shrink-0">
                  <span className="text-sm font-semibold font-mono text-stone-900">
                    {formatPrice(foundationProduct.priceDZD, foundationProduct.priceUSD)}
                  </span>
                </div>
              </div>

              {/* Complete 3-Step Routine Showcase */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-600 font-sans">
                  {lang === 'ar' ? 'خطوات الروتين الصباحي والمسائي الموصى بها:' : 'Recommended 3-Step Synergistic Routine:'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Step 1 */}
                  <div className="p-3 bg-white/70 rounded-2xl border border-stone-200 text-center">
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">
                      {lang === 'ar' ? 'الخطوة 1 · تنظيف' : 'Step 1 · Cleanse'}
                    </span>
                    <h5 className="font-serif font-bold text-stone-800 text-xs mt-1">
                      {lang === 'ar' ? (recommendedCleanser.nameAr || recommendedCleanser.name) : recommendedCleanser.name}
                    </h5>
                    <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                      {lang === 'ar' ? 'منظف شاي أخضر متوازن ينقي المسام بلطف دون تجريد البشرة.' : 'Low-pH green tea melt to purify without stripping.'}
                    </p>
                  </div>
                  {/* Step 2 */}
                  <div className="p-3 bg-white/70 rounded-2xl border border-[#C87D65]/40 text-center ring-1 ring-[#C87D65]/30">
                    <span className="text-[10px] uppercase tracking-wider text-[#C87D65] font-bold">
                      {lang === 'ar' ? 'الخطوة 2 · علاج مكثف' : 'Step 2 · Treat'}
                    </span>
                    <h5 className="font-serif font-bold text-stone-800 text-xs mt-1">
                      {lang === 'ar' ? (recommendedSerum.nameAr || recommendedSerum.name) : recommendedSerum.name}
                    </h5>
                    <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                      {lang === 'ar' ? 'مكونات نشطة موجهة خصيصاً لعلاج مشكلة بشرتكِ واستعادة نضارتها.' : `Targeted actives addressing ${concern}.`}
                    </p>
                  </div>
                  {/* Step 3 */}
                  <div className="p-3 bg-white/70 rounded-2xl border border-stone-200 text-center">
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">
                      {lang === 'ar' ? 'الخطوة 3 · حماية وترطيب' : 'Step 3 · Seal'}
                    </span>
                    <h5 className="font-serif font-bold text-stone-800 text-xs mt-1">
                      {lang === 'ar' ? (recommendedCream.nameAr || recommendedCream.name) : recommendedCream.name}
                    </h5>
                    <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                      {lang === 'ar' ? '5 سيراميدات أساسية لحبس الرطوبة طوال 24 ساعة وترميم الحاجز الواقي.' : '5 Essential ceramides for 24h barrier lock.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleAddFullRoutine}
                  className="w-full flex-1 py-3.5 px-6 rounded-xl bg-[#1C1917] hover:bg-[#2E2825] text-white text-sm font-medium tracking-wide flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>
                    {lang === 'ar' ? 'أضيفي الروتين والدرجة إلى الحقيبة (خصم 15%)' : 'Add Complete Routine to Bag (15% Bundle Discount)'}
                  </span>
                </button>
                <button
                  onClick={handleReset}
                  className="py-3 px-4 rounded-xl border border-stone-300 text-stone-600 hover:text-stone-900 text-xs font-medium flex items-center gap-1.5 hover:bg-white transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'إعادة الاختبار' : 'Retake Quiz'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls (Next / Back) */}
        {!isCalculated && (
          <div className="flex items-center justify-between px-6 py-4 bg-white/80 border-t border-stone-200/80">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 flex items-center gap-1 rounded-lg hover:bg-stone-100 transition-colors"
              >
                <ArrowLeft className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                <span>{lang === 'ar' ? 'السابق' : 'Back'}</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              className="px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#1C1917] hover:bg-[#2E2825] rounded-xl flex items-center gap-2 transition-all shadow-sm"
            >
              <span>{step === 4 ? (lang === 'ar' ? 'إظهار النتائج' : 'Reveal My Routine') : (lang === 'ar' ? 'التالي' : 'Continue')}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
