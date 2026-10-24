import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useShop } from '../context/ShopContext';
import { useRouter } from '../context/RouterContext';
import { Truck, ShieldCheck, Heart, Sparkles, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, t } = useLanguage();
  const { openQuiz } = useShop();
  const { navigate } = useRouter();

  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#1C1917] text-[#FAF7F5] border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Trust Badges Strip (Adjacent Proof) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-stone-800 text-xs">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-[#C87D65] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-bold text-sm text-white mb-0.5">
                {lang === 'ar' ? 'توصيل سريع لكافة الولايات الـ 58' : '58 Wilayas Express Delivery'}
              </h4>
              <p className="text-stone-400 font-sans leading-relaxed">
                {lang === 'ar'
                  ? 'شحن فوري لباب منزلكِ أو لمكتب الاستلام، ومجاني للطلبيات التي تتجاوز 8,000 دج.'
                  : 'Fast courier dispatch to door or pickup desk. Free on orders above 8,000 DZD.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C87D65] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-bold text-sm text-white mb-0.5">
                {lang === 'ar' ? 'الدفع عند الاستلام مضمون 100%' : 'Cash on Delivery (COD) Guaranteed'}
              </h4>
              <p className="text-stone-400 font-sans leading-relaxed">
                {lang === 'ar'
                  ? 'عاينِي طردكِ عند وصوله وادفعي نقداً للموزع مباشرة بكل أمان وراحة بال.'
                  : 'Inspect packaging upon arrival and pay cash directly to the delivery courier.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#C87D65] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-bold text-sm text-white mb-0.5">
                {lang === 'ar' ? 'تركيبات نباتية فائقة النقاء' : 'Clean Botanical Science'}
              </h4>
              <p className="text-stone-400 font-sans leading-relaxed">
                {lang === 'ar'
                  ? 'مستحضرات خالية تماماً من البارابين والكبريتات القاسية، ولم تُختبر على الحيوانات.'
                  : 'Formulated without parabens, micro-plastics or harsh sulfates. 100% cruelty-free.'}
              </p>
            </div>
          </div>
        </div>

        {/* Luxury Newsletter Subscription Section */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#25211E] to-[#1C1917] border border-stone-800 p-8 sm:p-10 overflow-hidden shadow-2xl">
          {/* Subtle ambient luxury light halo */}
          <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-[#C87D65]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#C87D65]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {lang === 'ar'
                  ? 'دائرة نجمة السماء الخاصة · النشرة الحصرية'
                  : lang === 'fr'
                  ? 'Le Cercle Privé Najmat Al Samaa'
                  : 'The Najmat Al Samaa Circle'}
              </span>
            </div>

            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
              {lang === 'ar'
                ? 'احصلي على وصول حصري وأولوية استكشاف التشكيلات الجديدة'
                : lang === 'fr'
                ? 'Accès Privilégié & Avant-Première des Nouvelles Collections'
                : 'Reserve Your Insider Access & First Look at New Collections'}
            </h3>

            <p className="text-xs sm:text-sm text-stone-400 font-sans leading-relaxed max-w-xl mx-auto">
              {lang === 'ar'
                ? 'انضمي إلى مجتمع النخبة لتكوني أول من يستكشف الإصدارات المحدودة، أسرار التركيبات النباتية، والدعوات الخاصة للفعاليات.'
                : lang === 'fr'
                ? 'Bénéficiez d\'un accès privilégié à nos formulations confidentielles, nos avant-premières exclusives et nos rituels de beauté sur-mesure.'
                : 'Join our private register to receive exclusive invitations, confidential batch releases, and priority first looks before public seasonal drops.'}
            </p>

            {/* Newsletter Form & State */}
            {isSubscribed ? (
              <div className="pt-2 animate-fadeIn">
                <div className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#2A2421] border border-[#C87D65]/40 text-xs text-[#FAF7F5] shadow-inner font-sans">
                  <Check className="w-4 h-4 text-[#C87D65] shrink-0" />
                  <span>
                    {lang === 'ar'
                      ? 'أهلاً بكِ في الدائرة الحصرية. تم تأكيد اشتراكك بنجاح.'
                      : lang === 'fr'
                      ? 'Bienvenue dans le Cercle. Votre accès privilégié est confirmé.'
                      : 'Welcome to the Circle. Your insider privileges are now active.'}
                  </span>
                  <button
                    onClick={() => {
                      setIsSubscribed(false);
                      setEmail('');
                    }}
                    className="ml-2 text-[10px] text-stone-400 hover:text-white underline"
                  >
                    {lang === 'ar' ? 'تعديل' : 'Reset'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="pt-2 max-w-md mx-auto space-y-2">
                <div className="flex flex-col sm:flex-row items-center gap-2 bg-stone-950/70 p-1.5 rounded-2xl border border-stone-800 focus-within:border-[#C87D65] focus-within:ring-1 focus-within:ring-[#C87D65] transition-all">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      lang === 'ar'
                        ? 'أدخلي بريدك الإلكتروني الشخصي...'
                        : lang === 'fr'
                        ? 'Votre adresse email personnelle...'
                        : 'Enter your personal email...'
                    }
                    className="w-full px-4 py-2.5 bg-transparent text-xs text-white placeholder:text-stone-500 focus:outline-none font-sans"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#C87D65] hover:bg-[#B56750] text-white text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all shadow-md shrink-0 cursor-pointer"
                  >
                    {lang === 'ar' ? 'انضمام' : lang === 'fr' ? 'Rejoindre' : 'Join'}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-4 text-[10px] text-stone-500 font-mono pt-1">
                  <span>{lang === 'ar' ? 'خصوصية تامة ومحمية' : 'Privacy strictly protected'}</span>
                  <span>·</span>
                  <span>{lang === 'ar' ? 'بدون رسائل مزعجة' : 'No spam'}</span>
                  <span>·</span>
                  <span>{lang === 'ar' ? 'إلغاء الاشتراك بنقرة واحدة' : 'Instant unsubscribe'}</span>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-sans">
          {/* Col 1: Brand & Atelier */}
          <div className="col-span-2 sm:col-span-1 space-y-3">
            <span className="font-serif font-bold text-lg text-white tracking-tight block">
              {lang === 'ar' ? 'نجمة السماء' : 'NAJMAT AL SAMAA'}
            </span>
            <p className="text-stone-400 leading-relaxed">
              {lang === 'ar'
                ? 'مستحضرات العناية النباتية الفاخرة ومكياج عالي الأداء مصمم لبشرة بلادنا وجمالها الطبيعي.'
                : 'Haute botanical skincare & inclusive complexion cosmetics formulated for Mediterranean radiance.'}
            </p>
            <div className="text-[11px] text-stone-500 font-mono">
              {lang === 'ar' ? 'الجزائر العاصمة · مختبرات باريس للتركيبات' : 'Algiers Operations · Paris Formulation Lab'}
            </div>
          </div>

          {/* Col 2: The Collections */}
          <div className="space-y-2.5">
            <h5 className="font-serif font-bold text-white text-xs uppercase tracking-wider">
              {lang === 'ar' ? 'التشكيلات' : 'Curations'}
            </h5>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => {
                      const el = document.getElementById('catalog-grid');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-white transition-colors text-left rtl:text-right cursor-pointer"
                >
                  {lang === 'ar' ? 'كريمات أساس الإشراقة الحريرية' : "L'Éclat Silk Foundations"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => {
                      const el = document.getElementById('catalog-grid');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-white transition-colors text-left rtl:text-right cursor-pointer"
                >
                  {lang === 'ar' ? 'سيرومات الذهب عيار 24 والخلايا' : '24K Cellular Serums'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => {
                      const el = document.getElementById('catalog-grid');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-white transition-colors text-left rtl:text-right cursor-pointer"
                >
                  {lang === 'ar' ? 'بلسم حماية حاجز البشرة بالسيراميد' : 'Ceramide Barrier Balms'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => {
                      const el = document.getElementById('catalog-grid');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-white transition-colors text-left rtl:text-right cursor-pointer"
                >
                  {lang === 'ar' ? 'المجموعات الثلاثية الأيقونية' : 'Iconic Radiance Bundles'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Services */}
          <div className="space-y-2.5">
            <h5 className="font-serif font-bold text-white text-xs uppercase tracking-wider">
              {lang === 'ar' ? 'خدمات المتجر' : 'Boutique Services'}
            </h5>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button
                  onClick={() => navigate('/quiz')}
                  className="hover:text-white transition-colors text-left rtl:text-right cursor-pointer"
                >
                  {lang === 'ar' ? 'تشخيص البشرة (#/quiz)' : 'Skin Diagnostic (#/quiz)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/track')}
                  className="hover:text-white transition-colors text-left rtl:text-right cursor-pointer"
                >
                  {lang === 'ar' ? 'تتبع شحنة الطرد (#/track)' : 'Track Courier Delivery (#/track)'}
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/213550000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {lang === 'ar' ? 'خدمة الاستقبال عبر واتساب' : 'WhatsApp Concierge Service'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Dispatch Logistics */}
          <div className="space-y-2.5">
            <h5 className="font-serif font-bold text-white text-xs uppercase tracking-wider">
              {lang === 'ar' ? 'شركاء الشحن والتوصيل' : 'Courier Hubs'}
            </h5>
            <div className="text-stone-400 space-y-1">
              <p>{lang === 'ar' ? 'شركة ياليدين إكسبريس (Yalidine Express)' : 'Yalidine Express Logistics'}</p>
              <p>{lang === 'ar' ? 'شبكة زد آر إكسبريس (ZR Express)' : 'ZR Express Network'}</p>
              <p>{lang === 'ar' ? 'شحنات يومية من مركز الجزائر العاصمة' : 'Daily dispatches from Hub Alger'}</p>
            </div>
          </div>
        </div>

        {/* Quiet Copyright Row */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 font-mono gap-3">
          <span>{lang === 'ar' ? '© 2026 متجر نجمة السماء. كافة الحقوق محفوظة.' : '© 2026 NAJMAT AL SAMAA BEAUTÉ. All rights reserved.'}</span>
          <div className="flex items-center gap-4">
            <span>{lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
            <span>·</span>
            <span>{lang === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}</span>
            <span>·</span>
            <span>{lang === 'ar' ? 'سياسة الدفع عند الاستلام' : 'COD Verification Policy'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
