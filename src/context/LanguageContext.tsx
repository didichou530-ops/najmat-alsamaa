import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'fr' | 'ar';
export type Currency = 'DZD' | 'USD';

interface Translations {
  [key: string]: {
    en: string;
    fr: string;
    ar: string;
  };
}

export const DICT: Translations = {
  brandName: { en: 'NAJMAT AL SAMAA', fr: 'NAJMAT AL SAMAA', ar: 'نجمة السماء' },
  brandTagline: {
    en: 'High-Performance Botanical Skincare & Celestial Luxury Cosmetics',
    fr: 'Haute Cosmétique Botanique & Maquillage Céleste de Luxe',
    ar: 'مستحضرات العناية النباتية الفاخرة ومكياج عالي الأداء بنقاء نجمة السماء'
  },
  // Nav
  navSkincare: { en: 'Skincare', fr: 'Soin de la Peau', ar: 'العناية بالبشرة' },
  navMakeup: { en: 'Makeup', fr: 'Maquillage', ar: 'المكياج' },
  navBundles: { en: 'Sets & Bundles', fr: 'Coffrets & Duos', ar: 'المجموعات والعروض' },
  navRoutineFinder: { en: 'Skin & Shade Quiz', fr: 'Diagnostic & Teinte', ar: 'اختبار البشرة والدرجة' },
  navTrackOrder: { en: 'Track Order', fr: 'Suivi de Commande', ar: 'تتبع طلبيتك' },
  navAdminQueue: { en: 'Call Center', fr: 'Centre d\'Appels', ar: 'لوحة التحكم المركزية' },

  // Announcements
  freeShippingPromo: {
    en: 'Free Express Delivery across all 58 Wilayas on orders above 8,000 DZD ($60) · Cash on Delivery available',
    fr: 'Livraison Express Gratuite sur 58 Wilayas dès 8 000 DZD (60$) · Paiement à la Livraison (COD)',
    ar: 'توصيل مجاني وسريع لكافة الولايات الـ 58 للطلبيات التي تتجاوز 8,000 دج · الدفع عند الاستلام متاح'
  },

  // Hero
  heroKicker: { en: 'Najmat Al Samaa Editorial · Collection 2026', fr: 'Najmat Al Samaa Édition · Collection 2026', ar: 'مجموعات نجمة السماء · تشكيلة 2026' },
  heroHeadline: {
    en: 'Skin-first luxury. Formulated for high-humidity radiance.',
    fr: 'Le soin d\'abord. La haute perfection seconde peau.',
    ar: 'جمال مستوحى من بهاء السماء. تركيبات نباتية فاخرة تدوم طوال اليوم.'
  },
  heroSubtext: {
    en: 'Clean bio-identical actives, inclusive skin tones, and Parisian sensory textures tailored for Mediterranean skin resilience.',
    fr: 'Actifs purs bio-identiques, carnations inclusives et textures sensorielles parisiennes pensées pour le climat méditerranéen.',
    ar: 'مكونات نشطة نقية، درجات لونية شاملة لجميع البشرات، وتركيبات حسية باريسية مصممة لمقاومة حرارة الصيف ورطوبة البحر الأبيض المتوسط.'
  },
  heroCtaShop: { en: 'Explore the Collection', fr: 'Découvrir la Collection', ar: 'اكتشفي التشكيلة' },
  heroCtaQuiz: { en: 'Find My Perfect Shade', fr: 'Trouver ma Teinte Idéale', ar: 'اكتشفي درجتك وروتينك' },
  heroShopLookTitle: { en: 'Interactive Hotspot · Tap to Shop', fr: 'Point d\'intérêt · Cliquez pour acheter', ar: 'انقري على المستحضر لتسوق الإطلالة الكاملة' },

  // Filters
  allCategories: { en: 'All Curations', fr: 'Tous les Soins', ar: 'جميع المستحضرات' },
  filterSkinType: { en: 'Skin Type', fr: 'Type de Peau', ar: 'نوع البشرة' },
  filterConcern: { en: 'Skin Concern', fr: 'Préoccupation', ar: 'مشكلة البشرة' },
  filterPrice: { en: 'Price', fr: 'Prix', ar: 'السعر' },
  sortBy: { en: 'Sort by', fr: 'Trier par', ar: 'الترتيب حسب' },
  sortFeatured: { en: 'Featured', fr: 'Recommandés', ar: 'الأكثر تميزاً' },
  sortPriceAsc: { en: 'Price: Low to High', fr: 'Prix croissant', ar: 'السعر: من الأقل للأعلى' },
  sortPriceDesc: { en: 'Price: High to Low', fr: 'Prix décroissant', ar: 'السعر: من الأعلى للأقل' },
  sortRating: { en: 'Highest Rated', fr: 'Mieux notés', ar: 'الأعلى تقييماً' },
  clearFilters: { en: 'Reset Filters', fr: 'Réinitialiser', ar: 'إعادة تعيين الفلاتر' },
  productsFound: { en: 'Products available', fr: 'Produits disponibles', ar: 'مستحضر متوفر' },

  // PDP
  quickView: { en: 'Quick View', fr: 'Aperçu Rapide', ar: 'نظرة سريعة' },
  addToBag: { en: 'Add to Bag', fr: 'Ajouter au Panier', ar: 'أضيفي إلى الحقيبة' },
  expressCodOrder: { en: 'Fast COD Checkout', fr: 'Commander en 1 Clic (COD)', ar: 'طلب سريع والدفع عند الاستلام' },
  selectShade: { en: 'Selected Shade', fr: 'Teinte sélectionnée', ar: 'الدرجة المختارة' },
  shadesAvailable: { en: 'Inclusive Shades', fr: 'Teintes inclusives', ar: 'درجات بشرة شاملة' },
  beforeAfterTitle: { en: 'Real Results Comparison', fr: 'Résultats Cliniques Comparatifs', ar: 'مقارنة النتائج الحقيقية قبل وبعد' },
  dragToCompare: { en: 'Drag slider to compare bare skin vs treated finish', fr: 'Glissez le curseur pour comparer', ar: 'اسحبي المؤشر للمقارنة بين البشرة قبل وبعد الاستخدام' },
  keyIngredients: { en: 'Highlighted Active Ingredients', fr: 'Actifs Majeurs & Bienfaits', ar: 'المكونات النشطة الرئيسية والفوائد' },
  howToApply: { en: 'How to Use Ritual', fr: 'Rituel d\'Application', ar: 'طريقة الاستخدام والطقوس الجمالية' },
  verifiedReviews: { en: 'Verified Customer Reviews', fr: 'Avis Clients Vérifiés', ar: 'تقييمات وتجارب العملاء الموثقة' },
  filterBySkin: { en: 'Filter by Skin Type', fr: 'Filtrer par Peau', ar: 'تصفية حسب نوع البشرة' },
  allSkinTypes: { en: 'All Types', fr: 'Tous types', ar: 'كافة الأنواع' },
  completeRoutineTitle: { en: 'Complete Your Routine & Save 15%', fr: 'Complétez votre rituel (-15%)', ar: 'أكملي روتينك اليومي ووفري 15%' },
  addBundleToCart: { en: 'Add Routine Bundle to Bag', fr: 'Ajouter le Duo/Trio', ar: 'أضيفي المجموعة الكاملة إلى الحقيبة' },

  // Cart
  bagTitle: { en: 'Your Shopping Bag', fr: 'Votre Panier', ar: 'حقيبة التسوق' },
  freeShippingUnlocked: {
    en: 'Congratulations! You unlocked FREE Delivery & a Luxury Gift!',
    fr: 'Félicitations ! Livraison Gratuite & Cadeau Deluxe débloqués !',
    ar: 'تهانينا! لقد حصلتِ على توصيل مجاني وهدية فاخرة!'
  },
  freeShippingProgress: {
    en: 'Add {amount} more to unlock FREE Delivery across 58 Wilayas!',
    fr: 'Ajoutez encore {amount} pour la Livraison Gratuite partout en Algérie !',
    ar: 'أضيفي منتجات بقيمة {amount} للحصول على توصيل مجاني لكافة الولايات الـ 58!'
  },
  pickSamplesTitle: { en: 'Complimentary Deluxe Samples (Pick up to 2)', fr: 'Échantillons Deluxe Offerts (Choisissez 2)', ar: 'عينات فاخرة مجانية (اختاري عينتين مجاناً)' },
  sampleSelected: { en: 'Selected', fr: 'Sélectionné', ar: 'تم الاختيار' },
  sampleSelect: { en: 'Select Free Sample', fr: 'Choisir cet échantillon', ar: 'اختاري العينة' },
  maxSamplesNotice: { en: 'You have chosen your 2 complimentary samples', fr: 'Vous avez sélectionné vos 2 échantillons offerts', ar: 'لقد قمتِ باختيار عينتيكِ المجانيتين' },
  cartEmpty: { en: 'Your shopping bag is empty.', fr: 'Votre panier est vide.', ar: 'حقيبة التسوق فارغة حالياً.' },
  subtotal: { en: 'Subtotal', fr: 'Sous-total', ar: 'المجموع الفرعي' },
  estimatedDelivery: { en: 'Shipping Fee', fr: 'Frais de Livraison', ar: 'تكلفة التوصيل' },
  checkoutBtn: { en: 'Proceed to 1-Page Checkout', fr: 'Passer la Commande Express', ar: 'إتمام الطلب السريع' },

  // Express COD Checkout
  checkoutHeading: { en: '1-Step Express Checkout', fr: 'Validation Express de Commande', ar: 'تأكيد الطلبية السريع (الدفع عند الاستلام)' },
  checkoutSubtitle: {
    en: 'Pay in cash when your parcel is delivered to your door or pickup desk. No prepayment needed.',
    fr: 'Payez en espèces à la livraison à domicile ou au bureau stop-desk. Sans prépaiement.',
    ar: 'ادفعي نقداً عند استلام طلبيتكِ في منزلكِ أو من مكتب التوصيل دون أي دفع مسبق.'
  },
  fullNameLabel: { en: 'Full Name', fr: 'Nom & Prénom', ar: 'الاسم واللقب الكامل' },
  phoneLabel: { en: 'Phone Number (Algeria: 05/06/07)', fr: 'Numéro de Téléphone', ar: 'رقم الهاتف (مثال: 0550123456)' },
  wilayaLabel: { en: 'State / Wilaya', fr: 'Wilaya de Destination', ar: 'الولاية' },
  communeLabel: { en: 'Municipality / Commune', fr: 'Commune / Daira', ar: 'البلدية' },
  addressLabel: { en: 'Street Address & Delivery Landmark', fr: 'Adresse Complète & Repère', ar: 'العنوان الكامل ونقطة دالة' },
  deliveryTypeLabel: { en: 'Delivery Preference', fr: 'Mode de Livraison', ar: 'نوع التوصيل' },
  homeDelivery: { en: 'Home Delivery (To your door)', fr: 'À Domicile (À votre porte)', ar: 'توصيل للمنزل حتى باب البيت' },
  deskDelivery: { en: 'Stop-Desk Pickup (Courier Office)', fr: 'Stop-Desk (Bureau du Transporteur)', ar: 'استلام من مكتب شركة التوصيل (Stop-Desk)' },
  paymentMethodLabel: { en: 'Payment Method', fr: 'Mode de Paiement', ar: 'طريقة الدفع' },
  codPayment: { en: 'Cash on Delivery (COD - Pay on Arrival)', fr: 'Paiement à la Livraison (Espèces)', ar: 'الدفع نقداً عند الاستلام (COD)' },
  cardPayment: { en: 'Edahabia / CIB / Bank Card', fr: 'Carte Edahabia / CIB / Bancaire', ar: 'البطاقة الذهبية / CIB / بطاقة بنكية' },
  orderNotesLabel: { en: 'Special Delivery Instructions (Optional)', fr: 'Instructions spéciales (Facultatif)', ar: 'ملاحظات إضافية للموزع (اختياري)' },
  placeOrderBtn: { en: 'Confirm Order with Cash on Delivery', fr: 'Confirmer la Commande (Paiement à Réception)', ar: 'تأكيد الطلبية الآن (الدفع عند الاستلام)' },
  antiFakeNotice: {
    en: 'Strict Anti-Return policy: You will receive an instant WhatsApp / SMS verification link to confirm your delivery address before dispatch.',
    fr: 'Confirmation immédiate : Un message de confirmation WhatsApp vous sera envoyé avant l\'expédition pour sécuriser votre colis.',
    ar: 'تأكيد فوري ومضمون: ستصلكِ رسالة عبر واتساب أو رسالة نصية لتأكيد العنوان وموعد الاستلام قبل شحن الطرد مع الموزع.'
  },

  // Order Success & Verification
  orderConfirmedTitle: { en: 'Order Placed Successfully!', fr: 'Commande Validée avec Succès !', ar: 'تم تسجيل طلبيتكِ بنجاح!' },
  orderNumber: { en: 'Order Reference', fr: 'Référence Commande', ar: 'رقم الطلبية' },
  whatsAppConfirmBtn: { en: 'Confirm via WhatsApp (1-Click)', fr: 'Confirmer par WhatsApp (1 Clic)', ar: 'تأكيد فوري عبر واتساب (بنقرة واحدة)' },
  smsOtpVerifyBtn: { en: 'Verify with SMS Code', fr: 'Vérifier par Code SMS', ar: 'التحقق برمز SMS' },
  trackYourOrderBtn: { en: 'Track Real-Time Status', fr: 'Suivre l\'Acheminement', ar: 'تتبع مسار الشحنة مباشرة' },

  // Tracking
  trackingTitle: { en: 'Track Your Luxury Parcel', fr: 'Suivi de Votre Colis', ar: 'تتبع شحنتكِ الفاخرة' },
  trackingSubtitle: {
    en: 'Enter your Order Reference and Phone number to view live carrier updates.',
    fr: 'Entrez votre numéro de commande et votre téléphone pour suivre l\'envoi.',
    ar: 'أدخلي رقم الطلبية ورقم الهاتف لمعرفة حالة التوصيل الحالية فورياً.'
  },
  orderIdPlaceholder: { en: 'e.g. NS-8942', fr: 'ex. NS-8942', ar: 'مثال: NS-8942' },
  phonePlaceholder: { en: 'e.g. 0555123456', fr: 'ex. 0555123456', ar: 'مثال: 0555123456' },
  trackSubmitBtn: { en: 'Locate Parcel', fr: 'Rechercher le Colis', ar: 'تتبع مسار الشحنة' },

  // Admin Dashboard
  adminTitle: { en: 'Merchant Call-Center & Order Dispatch', fr: 'Centre d\'Appels & Expéditions', ar: 'مركز الاتصال وإدارة الطلبيات' },
  adminSubtitle: {
    en: 'Confirmation Queue · Real-time anti-return workflow · 1-click WhatsApp trigger · Yalidine Courier Export',
    fr: 'File de confirmation · Lutte anti-retour · Déclencheur WhatsApp · Export Transporteur',
    ar: 'طابور التأكيد الهاتفي · تقليل نسبة الإرجاع · تأكيد واتساب بنقرة واحدة · تصدير لشركات التوصيل'
  },
  exportCourierCsv: { en: 'Export Courier CSV (Yalidine/ZR)', fr: 'Exporter CSV Transporteur', ar: 'تصدير ملف الشحن (Yalidine)' },
  addMockOrder: { en: '+ Simulate Test Order', fr: '+ Simuler une Commande', ar: '+ إضافة طلبية تجريبية' },
  orderStatusNew: { en: 'New Order', fr: 'Nouvelle', ar: 'جديدة' },
  orderStatusConfirmed: { en: 'Confirmed', fr: 'Confirmée', ar: 'مؤكدة' },
  orderStatusNoAnswer1: { en: 'No Answer (1st)', fr: 'Pas de réponse (1)', ar: 'لا يرد (محاولة 1)' },
  orderStatusNoAnswer2: { en: 'No Answer (2nd)', fr: 'Pas de réponse (2)', ar: 'لا يرد (محاولة 2)' },
  orderStatusPacked: { en: 'Packed', fr: 'Emballée', ar: 'تم التجهيز' },
  orderStatusShipped: { en: 'Shipped (In Transit)', fr: 'Expédiée', ar: 'تم الشحن' },
  orderStatusDelivered: { en: 'Delivered', fr: 'Livrée & Encaissée', ar: 'تم التسليم والتحصيل' },
  orderStatusCancelled: { en: 'Cancelled', fr: 'Annulée', ar: 'ملغاة' },
  orderStatusBlacklisted: { en: 'Blacklisted Phone', fr: 'Numéro Bloqué', ar: 'رقم في القائمة المحظورة' }
};

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  formatPrice: (dzd: number, usd: number) => string;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('mn_lang');
    return (saved as Language) || 'en';
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('mn_currency');
    return (saved as Currency) || 'DZD';
  });

  const isRtl = lang === 'ar';

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('mn_lang', newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('mn_currency', newCurrency);
  };

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  const t = (key: string, params?: Record<string, string | number>): string => {
    const entry = DICT[key];
    let text = entry ? entry[lang] || entry['en'] || key : key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };

  const formatPrice = (dzd: number, usd: number): string => {
    if (currency === 'DZD') {
      const formatted = new Intl.NumberFormat(lang === 'ar' ? 'ar-DZ' : 'fr-DZ', {
        maximumFractionDigits: 0
      }).format(dzd);
      return `${formatted} DZD`;
    } else {
      return `$${usd.toFixed(2)}`;
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, currency, setCurrency, t, formatPrice, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
