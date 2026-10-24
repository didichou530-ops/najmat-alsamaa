import { Product } from '../types';
import { LAMSHA_PRODUCTS } from './lamsaProducts';

/**
 * كتالوج المتجر الظاهر للزوار.
 *
 * حُذفت المنتجات التجريبية الثمانية من القالب القديم (بلا صور حقيقية ولا أسعار شراء):
 *  - L'Éclat Luminous Silk Foundation
 *  - Cellular Youth Nectar Serum
 *  - Crème Velours Barrier Cream
 *  - Glow Dew Resurfacing Essence
 *  - Botanical Cloud Cleanser
 *  - The Iconic Radiance Trio
 *  - Velvet Lip Soufflé Tint
 *  - Oud & Damask Rose Dry Oil
 *
 * يبقى فقط ما يبيعه المتجر فعلياً: منتجات LAMSHA المولّدة من متجر لَمسة
 * (الأسماء والأسعار والصور والمخزون وسعر الشراء + الهامش).
 */
export const LUXURY_PRODUCTS: Product[] = [
  ...LAMSHA_PRODUCTS
];
