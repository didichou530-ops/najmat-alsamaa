export type CategoryType = 'makeup' | 'skincare' | 'haircare' | 'fragrance' | 'bodycare' | 'oralcare' | 'bundles';
export type SkinType = 'oily' | 'dry' | 'combination' | 'sensitive' | 'normal';
export type SkinConcern = 'acne' | 'anti-aging' | 'hydration' | 'brightening' | 'texture' | 'pores';

export interface Shade {
  id: string;
  name: string;
  nameFr: string;
  nameAr: string;
  hex: string;
  undertone: 'warm' | 'cool' | 'neutral' | 'olive';
  toneLevel: 'fair' | 'light' | 'medium' | 'tan' | 'deep';
  modelImage?: string;
  description: string;
}

export interface KeyActive {
  name: string;
  nameAr: string;
  concentration?: string;
  benefit: string;
  benefitAr: string;
}

export interface RoutineStep {
  step: number;
  title: string;
  titleAr: string;
  desc: string;
  descAr: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  skinType: SkinType;
  ageGroup: '18-24' | '25-34' | '35-44' | '45+';
  shadeUsed?: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  nameFr: string;
  nameAr: string;
  tagline: string;
  taglineFr: string;
  taglineAr: string;
  category: CategoryType;
  priceDZD: number;
  priceUSD: number;
  rating: number;
  reviewCount: number;
  badge?: 'bestseller' | 'new' | 'limited';
  skinTypes: SkinType[];
  concerns: SkinConcern[];
  isVegan: boolean;
  isParabenFree: boolean;
  isCrueltyFree: boolean;
  volume: string;
  stockCount: number;
  batchNumber: string;
  expirationDate: string;
  bgGradient: string;
  accentColor: string;
  /** مسار صورة المنتج داخل public/media (نسبي) أو رابط خارجي */
  image?: string;
  /** صور إضافية للمنتج (معرض) */
  gallery?: string[];
  /** العلامة التجارية */
  brand?: string;
  /** وسم تسويقي مترجم (أصلي 🇫🇷 / صيدلية / ...) */
  tag?: { en: string; fr: string; ar: string };
  description: string;
  descriptionFr: string;
  descriptionAr: string;
  ingredients: string[];
  keyActives: KeyActive[];
  howToUse: RoutineStep[];
  shades?: Shade[];
  beforeAfter?: {
    beforeLabel: string;
    afterLabel: string;
    beforeDesc: string;
    afterDesc: string;
    durationWeeks: number;
  };
  routineBundleIds?: string[];
  reviews: Review[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedShade?: Shade;
}

export interface FreeSample {
  id: string;
  name: string;
  nameFr: string;
  nameAr: string;
  category: string;
  volume: string;
  colorHex: string;
  description: string;
}

export type OrderStatus =
  | 'new'
  | 'confirmed'
  | 'no_answer_1'
  | 'no_answer_2'
  | 'packed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'blacklisted';

export interface OrderItem {
  productId: string;
  productName: string;
  shadeName?: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  wilayaCode: string;
  wilayaName: string;
  commune: string;
  address: string;
  deliveryType: 'home' | 'desk';
  deliveryFee: number;
  subtotal: number;
  total: number;
  currency: 'DZD' | 'USD';
  paymentMethod: 'cod' | 'card';
  status: OrderStatus;
  selectedSamples: string[];
  items: OrderItem[];
  notes?: string;
  trackingHistory: {
    status: string;
    timestamp: string;
    location: string;
  }[];
  otpVerified: boolean;
}

export interface WilayaInfo {
  code: string;
  name: string;
  nameAr: string;
  homeDeliveryFee: number;
  deskDeliveryFee: number;
  communes: string[];
}
