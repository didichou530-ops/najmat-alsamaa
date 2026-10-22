import React, { useState, useMemo } from 'react';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useShop } from '../context/ShopContext';
import { ProductVisual } from './ProductVisual';
import { Product, SkinConcern, SkinType } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { lang, formatPrice, isRtl, t } = useLanguage();
  const { products, setActiveProduct } = useShop();

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSkinType, setSelectedSkinType] = useState<string>('all');
  const [selectedConcern, setSelectedConcern] = useState<string>('all');

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const q = query.toLowerCase().trim();
      const matchQuery =
        !q ||
        prod.name.toLowerCase().includes(q) ||
        prod.description.toLowerCase().includes(q) ||
        prod.ingredients.some((ing) => ing.toLowerCase().includes(q)) ||
        (prod.shades && prod.shades.some((s) => s.name.toLowerCase().includes(q)));

      const matchCategory = selectedCategory === 'all' || prod.category === selectedCategory;
      const matchSkinType =
        selectedSkinType === 'all' || prod.skinTypes.includes(selectedSkinType as SkinType);
      const matchConcern =
        selectedConcern === 'all' || prod.concerns.includes(selectedConcern as SkinConcern);

      return matchQuery && matchCategory && matchSkinType && matchConcern;
    });
  }, [query, selectedCategory, selectedSkinType, selectedConcern]);

  if (!isOpen) return null;

  const handleSelectProduct = (product: Product) => {
    setActiveProduct(product);
    onClose();
  };

  const trendingTags = [
    'Luminous Silk',
    '24K Gold Peptides',
    'Ceramides',
    'Niacinamide 4%',
    'Olive Undertone',
    'Damask Rose'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#FAF7F5] rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200/80 bg-white flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === 'ar'
                ? 'ابحثي عن مستحضر، درجة، أو مكون نشط (سيراميد، نياسيناميد، أساس...)'
                : 'Search products, shades, actives (e.g. Niacinamide, Foundation, Peptides)...'
            }
            className="flex-1 bg-transparent text-sm sm:text-base text-stone-900 placeholder:text-stone-400 focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              {lang === 'ar' ? 'مسح' : 'Clear'}
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Selectors & Trending Chips */}
        <div className="p-4 bg-[#FAF7F5] border-b border-stone-200/60 space-y-3">
          {/* Trending Searches */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
            <span className="text-[11px] text-stone-400 uppercase tracking-wider font-mono shrink-0">
              {lang === 'ar' ? 'الأكثر رواجاً:' : 'Trending:'}
            </span>
            {trendingTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-2.5 py-1 bg-white hover:bg-stone-100 rounded-full border border-stone-200/80 text-[11px] text-stone-700 whitespace-nowrap transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Categorization Dropdowns */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            {/* Category */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-stone-200 rounded-xl text-stone-700 focus:outline-none cursor-pointer"
            >
              <option value="all">{lang === 'ar' ? 'كافة التصنيفات' : 'All Categories'}</option>
              <option value="skincare">{lang === 'ar' ? 'العناية بالبشرة' : 'Skincare'}</option>
              <option value="haircare">{lang === 'ar' ? 'العناية بالشعر' : 'Haircare'}</option>
              <option value="bodycare">{lang === 'ar' ? 'العناية بالجسم' : 'Body Care'}</option>
              <option value="oralcare">{lang === 'ar' ? 'العناية بالأسنان' : 'Oral Care'}</option>
              <option value="makeup">{lang === 'ar' ? 'المكياج' : 'Makeup'}</option>
              <option value="bundles">{lang === 'ar' ? 'المجموعات' : 'Sets & Bundles'}</option>
              <option value="fragrance">{lang === 'ar' ? 'الزيوت المعطرة' : 'Fragrance'}</option>
            </select>

            {/* Skin Type */}
            <select
              value={selectedSkinType}
              onChange={(e) => setSelectedSkinType(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-stone-200 rounded-xl text-stone-700 focus:outline-none cursor-pointer"
            >
              <option value="all">{lang === 'ar' ? 'نوع البشرة: الكل' : 'Skin Type: All'}</option>
              <option value="combination">{lang === 'ar' ? 'مختلطة' : 'Combination'}</option>
              <option value="dry">{lang === 'ar' ? 'جافة' : 'Dry'}</option>
              <option value="oily">{lang === 'ar' ? 'دهنية' : 'Oily'}</option>
              <option value="sensitive">{lang === 'ar' ? 'حساسة' : 'Sensitive'}</option>
            </select>

            {/* Skin Concern */}
            <select
              value={selectedConcern}
              onChange={(e) => setSelectedConcern(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-stone-200 rounded-xl text-stone-700 focus:outline-none cursor-pointer"
            >
              <option value="all">{lang === 'ar' ? 'المشكلة: الكل' : 'Concern: All'}</option>
              <option value="anti-aging">{lang === 'ar' ? 'مقاومة التجاعيد' : 'Anti-Aging'}</option>
              <option value="hydration">{lang === 'ar' ? 'ترطيب عميق' : 'Hydration'}</option>
              <option value="brightening">{lang === 'ar' ? 'نضارة وتوحيد' : 'Brightening'}</option>
              <option value="pores">{lang === 'ar' ? 'المسام والملمس' : 'Texture & Pores'}</option>
            </select>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          <div className="text-[11px] font-mono text-stone-400">
            {filteredProducts.length} {t('productsFound')}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-xs text-stone-500 font-serif italic">
              {lang === 'ar'
                ? 'لم يتم العثور على أي مستحضرات مطابقة. جربي كلمة بحث أخرى.'
                : 'No matching products found. Try another search keyword.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="p-3 bg-white rounded-2xl border border-stone-200/80 hover:border-stone-400 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-3 group"
                >
                  <div className="w-16 h-18 rounded-xl overflow-hidden shrink-0 border border-stone-100">
                    <ProductVisual
                      product={product}
                      className="w-full h-full scale-75"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-stone-400 block">
                      {product.category}
                    </span>
                    <h4 className="font-serif font-bold text-xs text-stone-900 truncate group-hover:text-[#C87D65] transition-colors">
                      {lang === 'ar' ? (product.nameAr || product.name) : product.name}
                    </h4>
                    <span className="text-xs font-mono font-bold text-stone-800 block mt-1">
                      {formatPrice(product.priceDZD, product.priceUSD)}
                    </span>
                  </div>
                  <div className="p-1.5 rounded-full bg-stone-50 text-stone-400 group-hover:bg-[#1C1917] group-hover:text-white transition-all shrink-0">
                    <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
