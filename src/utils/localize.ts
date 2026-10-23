/**
 * تطبيع نصوص المنتجات حسب لغة الواجهة (EN / FR / AR).
 *
 * المنتجات المستوردة تحمل نصوصاً بثلاث لغات منفصلة
 * (name / nameFr / nameAr — وtagline وdescription بنفس الشكل).
 * قبل هذا الموديول كانت الواجهة تفعل: `lang === 'ar' ? nameAr : name`
 * فتظهر النصوص **الإنجليزية في وضع الفرنسية**. هنا نختار اللغة الصحيحة
 * دائماً، مع تراجع ذكي إلى أفضل نص متاح (AR ← FR ← EN).
 */
import { KeyActive, Product, RoutineStep, Shade } from '../types';

export type UILang = 'en' | 'fr' | 'ar';

/** يعيد النص المناسب للغة الحالية، مع تراجع إلى أفضل نص متاح */
export const pickText = (lang: UILang, en?: string, fr?: string, ar?: string): string => {
  const order = lang === 'ar' ? [ar, fr, en] : lang === 'fr' ? [fr, en, ar] : [en, fr, ar];
  return order.find((v) => v && v.trim()) || '';
};

/** اسم المنتج حسب اللغة */
export const productName = (
  p: Pick<Product, 'name' | 'nameFr' | 'nameAr'>,
  lang: UILang
): string => pickText(lang, p.name, p.nameFr, p.nameAr);

/** الوصف التحريري القصير (تحت الاسم) */
export const productTagline = (
  p: Pick<Product, 'tagline' | 'taglineFr' | 'taglineAr'>,
  lang: UILang
): string => pickText(lang, p.tagline, p.taglineFr, p.taglineAr);

/** الوصف الكامل للمنتج */
export const productDescription = (
  p: Pick<Product, 'description' | 'descriptionFr' | 'descriptionAr'>,
  lang: UILang
): string => pickText(lang, p.description, p.descriptionFr, p.descriptionAr);

/** عنوان خطوة الاستخدام (البيانات تحمل EN + AR — الفرنسي يسترجع الإنجليزي) */
export const stepTitle = (s: RoutineStep, lang: UILang): string =>
  pickText(lang, s.title, s.title, s.titleAr);

/** وصف خطوة الاستخدام */
export const stepDesc = (s: RoutineStep, lang: UILang): string =>
  pickText(lang, s.desc, s.desc, s.descAr);

/** اسم المكوّن الفعّال */
export const activeName = (a: KeyActive, lang: UILang): string =>
  pickText(lang, a.name, a.name, a.nameAr);

/** فائدة المكوّن الفعّال */
export const activeBenefit = (a: KeyActive, lang: UILang): string =>
  pickText(lang, a.benefit, a.benefit, a.benefitAr);

/** اسم العلامة على القارورة — يفضَّل العلامة التجارية نفسها (لاتينية دائماً) */
export const brandPlaque = (p: Pick<Product, 'brand' | 'name'>): string =>
  (p.brand || p.name.split(' ')[0] || '').trim();

/** اسم درجة اللون (البيانات تحمل EN + AR) */
export const shadeName = (s: Pick<Shade, 'name' | 'nameAr'>, lang: UILang): string =>
  pickText(lang, s.name, s.name, s.nameAr);

/** اسم المنتج في السلة/الدفع — يتحمّل نسخاً مخزّنة قديمة تفتقر لحقول FR/AR */
export const cartProductName = (p: Partial<Product>, lang: UILang): string =>
  pickText(lang, p.name, p.nameFr, p.nameAr);

/** اسم العينة المجانية (EN + AR) */
export const sampleName = (s: { name: string; nameAr?: string }, lang: UILang): string =>
  pickText(lang, s.name, s.name, s.nameAr);

/** اسم الولاية (EN + AR) */
export const wilayaName = (w: { name: string; nameAr?: string }, lang: UILang): string =>
  pickText(lang, w.name, w.name, w.nameAr);

/* ── نصوص المخزون المشتركة (كانت EN/AR فقط فتظهر الإنجليزية في FR) ───── */

/** «نفدت الكمية» */
export const outOfStockLabel = (lang: UILang): string =>
  lang === 'ar' ? 'نفدت الكمية' : lang === 'fr' ? 'Rupture de stock' : 'Out of Stock';

/** «متوفر في المخزن (n وحدة متاحة)» */
export const inStockLabel = (lang: UILang, units: number): string =>
  lang === 'ar'
    ? `متوفر في المخزن (${units} وحدة متاحة)`
    : lang === 'fr'
      ? `En stock (${units} unités disponibles)`
      : `In Stock (${units} units available)`;

/** «الحد الأقصى المتوفر (n)» — عنوان زر + */
export const maxAvailable = (lang: UILang, units: number): string =>
  lang === 'ar'
    ? `الحد الأقصى المتوفر (${units})`
    : lang === 'fr'
      ? `Stock maximum (${units})`
      : `Max available (${units})`;

/** «وصلت للحد الأقصى المتوفر في المخزن» — تنبيه تحت العدّاد */
export const maxStockHint = (lang: UILang, units: number): string =>
  lang === 'ar'
    ? `وصلت للحد الأقصى المتوفر في المخزن (${units} وحدة)`
    : lang === 'fr'
      ? `Vous avez atteint le stock maximum disponible (${units} unités)`
      : `You reached the maximum available stock (${units} units)`;

/** «نفدت الكمية — أزل هذا المنتج لإتمام الطلب» — داخل صنف السلة */
export const removeFromBagNotice = (lang: UILang): string =>
  lang === 'ar'
    ? 'نفدت الكمية — أزل هذا المنتج لإتمام الطلب'
    : lang === 'fr'
      ? 'Rupture de stock — retirez cet article pour commander'
      : 'Out of stock — remove this item to checkout';

/** «نفدت الكمية من منتج (أو n منتجات) في سلتك» — لوحة التحذير */
export const bagOosBanner = (lang: UILang, count: number): string => {
  if (lang === 'ar') {
    return `نفدت الكمية من ${count === 1 ? 'منتج' : `${count} منتجات`} في سلتك`;
  }
  if (lang === 'fr') {
    return count === 1
      ? 'Un article de votre panier est en rupture de stock'
      : `${count} articles de votre panier sont en rupture de stock`;
  }
  return count === 1
    ? 'One item is out of stock in your bag'
    : `${count} items are out of stock in your bag`;
};

/** «هذا المنتج نفدت كميته حالياً — تواصل معنا...» */
export const restockNotice = (lang: UILang): string =>
  lang === 'ar'
    ? 'هذا المنتج نفدت كميته حالياً — تواصل معنا لمعرفة موعد توفره القادم.'
    : lang === 'fr'
      ? 'Ce produit est momentanément en rupture de stock — contactez-nous pour connaître la prochaine livraison.'
      : 'This product is currently out of stock — contact us for the next restock.';
