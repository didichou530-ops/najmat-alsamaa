/**
 * نسخة الكتالوج ووسائط الموقع.
 * أي تغيير في products.ts أو في صور public/media يجب أن يرفع هذه القيم:
 *  - CATALOG_VERSION: تُجبر المتصفحات على تحديث المنتجات المخزّنة محلياً.
 *  - MEDIA_VERSION:   يمنع خدمة نسخة قديمة من الكاش (علامة ?v=).
 */
export const CATALOG_VERSION = '2026-10-24-sandoz-v1';
// MEDIA_VERSION لا يُرفع إلا عند تغيّر ملفات الصور نفسها (تغيّرت صورة Minoxidil)
export const MEDIA_VERSION = '20261024-sandoz-v1';
