import React, { useState, useMemo } from 'react';
import { Filter, Star, Eye, ShoppingBag, Sparkles, Check, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useShop } from '../context/ShopContext';
import { useRouter } from '../context/RouterContext';
import { LUXURY_PRODUCTS } from '../data/products';
import { Product, SkinConcern, SkinType, Shade } from '../types';
import { ProductVisual } from './ProductVisual';

export const ProductListing: React.FC = () => {
  const { lang, formatPrice, t } = useLanguage();
  const { products, setActiveProduct, addToCart, openCheckout } = useShop();
  const { navigate } = useRouter();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSkinType, setSelectedSkinType] = useState<string>('all');
  const [selectedIngredient, setSelectedIngredient] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Local card state for shade selection on cards
  const [selectedCardShades, setSelectedCardShades] = useState<Record<string, Shade>>({});

  const handleSelectCardShade = (productId: string, shade: Shade, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCardShades((prev) => ({ ...prev, [productId]: shade }));
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...products].filter((prod) => {
      const matchCat = selectedCategory === 'all' || prod.category === selectedCategory;
      const matchSkin =
        selectedSkinType === 'all' || prod.skinTypes.includes(selectedSkinType as SkinType);
      const matchRating = prod.rating >= minRating;

      let matchIngredient = true;
      if (selectedIngredient === 'vegan') matchIngredient = prod.isVegan;
      else if (selectedIngredient === 'paraben-free') matchIngredient = prod.isParabenFree;
      else if (selectedIngredient === 'niacinamide')
        matchIngredient = prod.ingredients.some((i) => i.toLowerCase().includes('niacinamide'));
      else if (selectedIngredient === 'hyaluronic')
        matchIngredient = prod.ingredients.some((i) => i.toLowerCase().includes('hyaluron'));
      else if (selectedIngredient === 'peptides')
        matchIngredient = prod.ingredients.some((i) => i.toLowerCase().includes('peptide'));

      return matchCat && matchSkin && matchRating && matchIngredient;
    });

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.priceDZD - b.priceDZD);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.priceDZD - a.priceDZD);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      //efeatured: أحدث المنتجات أولاً (الوافد الجديد) ثم الأكثر مبيعاً
      const rank = (p: Product) =>
        p.badge === 'new' ? 0 : p.badge === 'limited' ? 1 : p.badge === 'bestseller' ? 2 : 3;
      list.sort((a, b) => rank(a) - rank(b));
    }

    return list;
  }, [selectedCategory, selectedSkinType, selectedIngredient, minRating, sortBy]);

  const categories = [
    { id: 'all', label: 'All Curations', labelAr: 'الكل' },
    { id: 'skincare', label: 'Skincare', labelAr: 'العناية بالبشرة' },
    { id: 'haircare', label: 'Haircare', labelAr: 'العناية بالشعر' },
    { id: 'bodycare', label: 'Body Care', labelAr: 'العناية بالجسم' },
    { id: 'oralcare', label: 'Oral Care', labelAr: 'العناية بالأسنان' },
    { id: 'makeup', label: 'Makeup', labelAr: 'المكياج' },
    { id: 'bundles', label: 'Sets & Duos', labelAr: 'المجموعات' },
    { id: 'fragrance', label: 'Sensory Oil', labelAr: 'الزيوت المعطرة' }
  ];

  return (
    <section id="catalog-grid" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <span className="text-xs font-serif text-[#C87D65] tracking-widest uppercase block mb-1">
            Curated Formulations
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            {lang === 'ar' ? 'تشكيلة المستحضرات الحصرية' : 'The Signature Collection'}
          </h2>
          <span className="text-xs text-stone-500 font-sans mt-1 block">
            {filteredProducts.length} {t('productsFound')}
          </span>
        </div>

        {/* Clean Segmented Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-stone-100/90 rounded-2xl w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {lang === 'ar' ? cat.labelAr : cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filter Toolbar (Skin Type, Ingredients, Rating, Sort) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3.5 rounded-2xl border border-stone-200/90 shadow-xs text-xs">
        {/* Skin Type Filter */}
        <div className="flex flex-col">
          <label className="text-[10px] uppercase font-mono tracking-wider text-stone-400 mb-1">
            {t('filterSkinType')}
          </label>
          <select
            value={selectedSkinType}
            onChange={(e) => setSelectedSkinType(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#C87D65] cursor-pointer"
          >
            <option value="all">{lang === 'ar' ? 'جميع أنواع البشرة' : 'All Skin Profiles'}</option>
            <option value="combination">{lang === 'ar' ? 'بشرة مختلطة' : 'Combination'}</option>
            <option value="dry">{lang === 'ar' ? 'بشرة جافة / عطشى' : 'Dry / Dehydrated'}</option>
            <option value="oily">{lang === 'ar' ? 'بشرة دهنية' : 'Oily / Congested'}</option>
            <option value="sensitive">{lang === 'ar' ? 'بشرة حساسة' : 'Sensitive Barrier'}</option>
          </select>
        </div>

        {/* Clean Ingredients Filter */}
        <div className="flex flex-col">
          <label className="text-[10px] uppercase font-mono tracking-wider text-stone-400 mb-1">
            {lang === 'ar' ? 'المكونات الفعالة' : 'Clean Actives'}
          </label>
          <select
            value={selectedIngredient}
            onChange={(e) => setSelectedIngredient(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#C87D65] cursor-pointer"
          >
            <option value="all">{lang === 'ar' ? 'كافة المكونات' : 'All Ingredients'}</option>
            <option value="vegan">{lang === 'ar' ? 'نباتي 100%' : '100% Vegan'}</option>
            <option value="paraben-free">{lang === 'ar' ? 'خالٍ من البارابين' : 'Paraben-Free'}</option>
            <option value="niacinamide">{lang === 'ar' ? 'نياسيناميد (4-5%)' : 'Niacinamide (4-5%)'}</option>
            <option value="hyaluronic">{lang === 'ar' ? 'حمض الهيالورونيك' : 'Hyaluronic Acid'}</option>
            <option value="peptides">{lang === 'ar' ? 'ببتيدات الكولاجين' : 'Collagen Peptides'}</option>
          </select>
        </div>

        {/* Customer Rating Filter */}
        <div className="flex flex-col">
          <label className="text-[10px] uppercase font-mono tracking-wider text-stone-400 mb-1">
            {lang === 'ar' ? 'التقييم الأدنى' : 'Min. Rating'}
          </label>
          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#C87D65] cursor-pointer"
          >
            <option value={0}>{lang === 'ar' ? 'جميع التقييمات' : 'Any Rating'}</option>
            <option value={4.8}>★ {lang === 'ar' ? '4.8 فأكثر' : '4.8 & Above'}</option>
            <option value={4.9}>★ {lang === 'ar' ? '4.9 فأكثر' : '4.9 & Above'}</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="flex flex-col">
          <label className="text-[10px] uppercase font-mono tracking-wider text-stone-400 mb-1">
            {t('sortBy')}
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#C87D65] cursor-pointer"
          >
            <option value="featured">{t('sortFeatured')}</option>
            <option value="price-asc">{t('sortPriceAsc')}</option>
            <option value="price-desc">{t('sortPriceDesc')}</option>
            <option value="rating">{t('sortRating')}</option>
          </select>
        </div>
      </div>

      {/* Product Cards 3-Column Desktop Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProducts.map((product) => {
          const currentShade =
            selectedCardShades[product.id] ||
            (product.shades ? product.shades[0] : undefined);
          // المنتج نافد المخزون (صفر) ← لا يمكن إضافته إلى السلة
          const outOfStock = (product.stockCount || 0) <= 0;

          return (
            <div
              key={product.id}
              onClick={() => {
                setActiveProduct(product);
                navigate('/product/' + product.id);
              }}
              className="group bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Product Visual Frame (65-75% height) */}
              <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-stone-50 border-b border-stone-100">
                <ProductVisual
                  product={product}
                  selectedShade={currentShade}
                  className="w-full h-full"
                />

                {/* Subtle Single Text Tag (Anti-Pill Rule) */}
                {product.badge && (
                  <div className="absolute top-3.5 left-3.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/80 text-[10px] font-bold uppercase tracking-wider text-stone-800 shadow-xs">
                    {product.badge}
                  </div>
                )}

                {/* Origin / pharmacy / haircare label */}
                {product.tag && (
                  <div
                    className="absolute top-3.5 right-3.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md border text-[10px] font-bold uppercase tracking-wider shadow-xs"
                    style={{
                      color: product.accentColor,
                      borderColor: `${product.accentColor}55`
                    }}
                  >
                    {lang === 'ar' ? product.tag.ar : lang === 'fr' ? product.tag.fr : product.tag.en}
                  </div>
                )}

                {/* Out of stock marker (always visible, blocks adding to bag) */}
                {outOfStock && (
                  <div
                    className={`absolute left-3.5 ${
                      product.badge ? 'top-12' : 'top-3.5'
                    } px-2.5 py-0.5 rounded-full bg-rose-600/95 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider shadow-sm`}
                  >
                    {lang === 'ar' ? 'نفدت الكمية' : 'Out of Stock'}
                  </div>
                )}

                {/* Hover Quick Actions Overlay */}
                <div className="absolute bottom-3 inset-x-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveProduct(product);
                      navigate('/product/' + product.id);
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-white/95 backdrop-blur-md text-stone-900 text-xs font-semibold uppercase tracking-wider border border-stone-200 hover:bg-stone-900 hover:text-white transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t('quickView')}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (outOfStock) return;
                      addToCart(product, 1, currentShade);
                    }}
                    disabled={outOfStock}
                    className={`p-2.5 rounded-xl transition-colors shadow-md ${
                      outOfStock
                        ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        : 'bg-[#1C1917] hover:bg-[#C87D65] text-white'
                    }`}
                    title={outOfStock ? (lang === 'ar' ? 'نفدت الكمية' : 'Out of stock') : t('addToBag')}
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card Meta & Typography */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  {/* Clean unboxed category + volume separator */}
                  <div className="flex items-center gap-2 text-[11px] text-stone-400 uppercase tracking-widest font-mono">
                    {product.brand && (
                      <>
                        <span className="text-stone-500 font-semibold">{product.brand}</span>
                        <span aria-hidden="true">·</span>
                      </>
                    )}
                    <span>{product.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.volume}</span>
                  </div>

                  {/* Product Title */}
                  <h3 className="font-serif font-bold text-base text-stone-900 mt-1 line-clamp-1 group-hover:text-[#C87D65] transition-colors">
                    {lang === 'ar' ? (product.nameAr || product.name) : product.name}
                  </h3>

                  <p className="text-xs text-stone-500 font-sans line-clamp-2 mt-1 leading-relaxed">
                    {lang === 'ar' ? product.taglineAr : product.tagline}
                  </p>
                </div>

                {/* Interactive Shade Swatches on Card (if has shades) */}
                {product.shades && product.shades.length > 0 && (
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[10px] text-stone-400 font-mono">
                      {product.shades.length} {lang === 'ar' ? 'درجات لونية:' : 'Shades:'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {product.shades.slice(0, 6).map((sh) => (
                        <button
                          key={sh.id}
                          title={sh.name}
                          onClick={(e) => handleSelectCardShade(product.id, sh, e)}
                          className={`w-3.5 h-3.5 rounded-full border border-black/10 transition-transform ${
                            currentShade?.id === sh.id ? 'scale-125 ring-1 ring-stone-900' : 'hover:scale-110'
                          }`}
                          style={{ backgroundColor: sh.hex }}
                        />
                      ))}
                      {product.shades.length > 6 && (
                        <span className="text-[9px] font-mono text-stone-400">
                          +{product.shades.length - 6}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Price Baseline with Tabular Numerals & Rating */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="font-mono font-bold text-stone-900 text-sm">
                    {formatPrice(product.priceDZD, product.priceUSD)}
                  </span>

                  <div className="flex items-center gap-1 text-[11px] font-mono text-stone-600">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="font-bold">{product.rating.toFixed(1)}</span>
                    <span className="text-stone-400">({product.reviewCount})</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
