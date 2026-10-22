import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Trash2,
  Sparkles,
  Check,
  Palette,
  Package,
  Layers,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Eye
} from 'lucide-react';
import { Product, CategoryType, SkinType, SkinConcern, Shade, KeyActive } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ProductVisual } from './ProductVisual';

interface ProductEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: Product) => void;
  productToEdit?: Product | null;
}

const LUXURY_PRESET_COLORS = [
  { name: 'Rose Gold', hex: '#C87D65' },
  { name: 'Terracotta', hex: '#B85D43' },
  { name: 'Velvet Berry', hex: '#7A2841' },
  { name: '24K Gold', hex: '#D4AF37' },
  { name: 'Champagne Silk', hex: '#E8B4A2' },
  { name: 'Botanical Emerald', hex: '#2E4530' },
  { name: 'Deep Espresso', hex: '#1C1917' },
  { name: 'Warm Alabaster', hex: '#FAF7F5' }
];

export const ProductEditorModal: React.FC<ProductEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  productToEdit
}) => {
  const { lang, formatPrice, isRtl } = useLanguage();

  const isEditing = !!productToEdit;

  // Active form tab
  const [activeTab, setActiveTab] = useState<'basics' | 'pricing' | 'skin' | 'shades' | 'preview'>('basics');

  // Form States
  const [name, setName] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [nameFr, setNameFr] = useState('');
  const [category, setCategory] = useState<CategoryType>('makeup');
  const [tagline, setTagline] = useState('');
  const [taglineAr, setTaglineAr] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [volume, setVolume] = useState('50 ml / 1.7 fl. oz.');
  const [badge, setBadge] = useState<'bestseller' | 'new' | 'limited' | undefined>(undefined);

  // Pricing & Inventory
  const [priceDZD, setPriceDZD] = useState<number>(4800);
  const [priceUSD, setPriceUSD] = useState<number>(36);
  const [stockCount, setStockCount] = useState<number>(35);
  const [batchNumber, setBatchNumber] = useState('NS-25A10');
  const [expirationDate, setExpirationDate] = useState('2027-10-31');

  // Skin & Clean Science
  const [skinTypes, setSkinTypes] = useState<SkinType[]>(['combination', 'dry', 'normal']);
  const [concerns, setConcerns] = useState<SkinConcern[]>(['hydration', 'texture']);
  const [isVegan, setIsVegan] = useState(true);
  const [isParabenFree, setIsParabenFree] = useState(true);
  const [isCrueltyFree, setIsCrueltyFree] = useState(true);

  // Visuals & Swatches
  const [accentColor, setAccentColor] = useState('#C87D65');
  const [shades, setShades] = useState<Shade[]>([]);

  // Key Active Ingredients
  const [activeName, setActiveName] = useState('');
  const [activeNameAr, setActiveNameAr] = useState('');
  const [activeConcentration, setActiveConcentration] = useState('');
  const [activeBenefit, setActiveBenefit] = useState('');
  const [activeBenefitAr, setActiveBenefitAr] = useState('');
  const [keyActives, setKeyActives] = useState<KeyActive[]>([]);

  // New Shade Inputs
  const [newShadeName, setNewShadeName] = useState('');
  const [newShadeNameAr, setNewShadeNameAr] = useState('');
  const [newShadeHex, setNewShadeHex] = useState('#E8B4A2');
  const [newShadeUndertone, setNewShadeUndertone] = useState<'neutral' | 'warm' | 'cool' | 'olive'>('neutral');
  const [newShadeTone, setNewShadeTone] = useState<'fair' | 'light' | 'medium' | 'tan' | 'deep'>('medium');

  // Error validation
  const [errorMessage, setErrorMessage] = useState('');

  // Populate form when editing or resetting for new
  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setNameAr(productToEdit.nameAr || productToEdit.name);
      setNameFr(productToEdit.nameFr || productToEdit.name);
      setCategory(productToEdit.category);
      setTagline(productToEdit.tagline);
      setTaglineAr(productToEdit.taglineAr || productToEdit.tagline);
      setDescription(productToEdit.description);
      setDescriptionAr(productToEdit.descriptionAr || productToEdit.description);
      setVolume(productToEdit.volume || '50 ml');
      setBadge(productToEdit.badge);

      setPriceDZD(productToEdit.priceDZD);
      setPriceUSD(productToEdit.priceUSD);
      setStockCount(productToEdit.stockCount);
      setBatchNumber(productToEdit.batchNumber || `NS-25${Math.random().toString(36).substring(2, 5).toUpperCase()}`);
      setExpirationDate(productToEdit.expirationDate || '2027-10-31');

      setSkinTypes(productToEdit.skinTypes || ['normal']);
      setConcerns(productToEdit.concerns || ['hydration']);
      setIsVegan(productToEdit.isVegan);
      setIsParabenFree(productToEdit.isParabenFree);
      setIsCrueltyFree(productToEdit.isCrueltyFree);

      setAccentColor(productToEdit.accentColor || '#C87D65');
      setShades(productToEdit.shades || []);
      setKeyActives(productToEdit.keyActives || []);
    } else {
      // Default blank values for new product
      setName('');
      setNameAr('');
      setNameFr('');
      setCategory('skincare');
      setTagline('Pure botanical formulation with clinical active potency.');
      setTaglineAr('تركيبة نباتية نقية مع فاعلية علاجية مثبتة سريرياً.');
      setDescription('Crafted in our Paris atelier with sustainably sourced Mediterranean flora.');
      setDescriptionAr('صُنع في مختبراتنا بمكونات نباتية متوسطية نقية وعالية الجودة.');
      setVolume('50 ml / 1.7 fl. oz.');
      setBadge('new');

      setPriceDZD(5200);
      setPriceUSD(38);
      setStockCount(30);
      setBatchNumber(`NS-25${Math.random().toString(36).substring(2, 5).toUpperCase()}`);
      setExpirationDate('2028-02-28');

      setSkinTypes(['combination', 'dry', 'normal', 'sensitive']);
      setConcerns(['hydration', 'brightening']);
      setIsVegan(true);
      setIsParabenFree(true);
      setIsCrueltyFree(true);

      setAccentColor('#C87D65');
      setShades([]);
      setKeyActives([
        {
          name: '5% Pure Niacinamide',
          nameAr: '5% نياسيناميد نقي',
          concentration: '5%',
          benefit: 'Refines skin texture and minimizes visible pores.',
          benefitAr: 'يقلل مظهر المسام الواسعة ويوحد ملمس البشرة.'
        }
      ]);
    }
    setErrorMessage('');
    setActiveTab('basics');
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  // Toggle skin types
  const handleToggleSkinType = (st: SkinType) => {
    setSkinTypes((prev) =>
      prev.includes(st) ? prev.filter((item) => item !== st) : [...prev, st]
    );
  };

  // Toggle concerns
  const handleToggleConcern = (sc: SkinConcern) => {
    setConcerns((prev) =>
      prev.includes(sc) ? prev.filter((item) => item !== sc) : [...prev, sc]
    );
  };

  // Add Shade
  const handleAddShade = () => {
    if (!newShadeName.trim()) return;
    const shadeId = `shade-${Date.now()}`;
    const newShade: Shade = {
      id: shadeId,
      name: newShadeName.trim(),
      nameFr: newShadeName.trim(),
      nameAr: newShadeNameAr.trim() || newShadeName.trim(),
      hex: newShadeHex,
      undertone: newShadeUndertone,
      toneLevel: newShadeTone,
      description: `${newShadeTone} complexion with ${newShadeUndertone} undertone`
    };
    setShades((prev) => [...prev, newShade]);
    setNewShadeName('');
    setNewShadeNameAr('');
  };

  const handleRemoveShade = (id: string) => {
    setShades((prev) => prev.filter((s) => s.id !== id));
  };

  // Add Key Active
  const handleAddActive = () => {
    if (!activeName.trim()) return;
    setKeyActives((prev) => [
      ...prev,
      {
        name: activeName.trim(),
        nameAr: activeNameAr.trim() || activeName.trim(),
        concentration: activeConcentration.trim() || undefined,
        benefit: activeBenefit.trim() || 'Provides nourishing clinical care',
        benefitAr: activeBenefitAr.trim() || 'يمنح تغذية عميقة وحماية متكاملة للبشرة'
      }
    ]);
    setActiveName('');
    setActiveNameAr('');
    setActiveConcentration('');
    setActiveBenefit('');
    setActiveBenefitAr('');
  };

  const handleRemoveActive = (idx: number) => {
    setKeyActives((prev) => prev.filter((_, i) => i !== idx));
  };

  // Auto calculate USD from DZD
  const handleAutoCalculateUSD = () => {
    const usd = Math.round(priceDZD / 135);
    setPriceUSD(usd);
  };

  // Generate random batch code
  const handleGenerateBatch = () => {
    const code = `NS-25${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
    setBatchNumber(code);
  };

  // Save product
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage(lang === 'ar' ? 'يرجى إدخال اسم المنتج بالإنجليزية' : 'Product name is required');
      setActiveTab('basics');
      return;
    }
    if (priceDZD <= 0) {
      setErrorMessage(lang === 'ar' ? 'يرجى إدخال سعر صحيح للمنتج' : 'Price must be greater than 0');
      setActiveTab('pricing');
      return;
    }

    const payload: Product = {
      id: productToEdit ? productToEdit.id : `prod-${Date.now()}`,
      name: name.trim(),
      nameFr: nameFr.trim() || name.trim(),
      nameAr: nameAr.trim() || name.trim(),
      tagline: tagline.trim() || 'Sensory botanical luxury.',
      taglineFr: tagline.trim(),
      taglineAr: taglineAr.trim() || tagline.trim(),
      description: description.trim() || 'A high-performance formulation.',
      descriptionFr: description.trim(),
      descriptionAr: descriptionAr.trim() || description.trim(),
      category,
      priceDZD: Number(priceDZD),
      priceUSD: Number(priceUSD),
      rating: productToEdit?.rating || 5.0,
      reviewCount: productToEdit?.reviewCount || 12,
      badge,
      skinTypes: skinTypes.length ? skinTypes : ['normal', 'combination'],
      concerns: concerns.length ? concerns : ['hydration'],
      isVegan,
      isParabenFree,
      isCrueltyFree,
      volume: volume.trim() || '50 ml',
      stockCount: Number(stockCount) || 20,
      batchNumber: batchNumber.trim() || 'NS-25X01',
      expirationDate: expirationDate.trim() || '2028-01-01',
      bgGradient: productToEdit?.bgGradient || 'from-[#F7ECE4] to-[#EBD5C8]',
      accentColor,
      // الحفاظ على الصورة والوسوم عند تعديل منتج مستورد
      image: productToEdit?.image,
      gallery: productToEdit?.gallery,
      brand: productToEdit?.brand,
      tag: productToEdit?.tag,
      ingredients: productToEdit?.ingredients || ['Aqua', 'Glycerin', 'Botanical Extract', 'Tocopherol'],
      keyActives,
      howToUse: productToEdit?.howToUse || [
        {
          step: 1,
          title: 'Apply',
          titleAr: 'التطبيق',
          desc: 'Apply 2-3 drops to clean dry skin daily.',
          descAr: 'ضعي قطرتين إلى ثلاث قطرات على بشرة نظيفة وجافة يومياً.'
        }
      ],
      shades: category === 'makeup' || shades.length > 0 ? shades : undefined,
      reviews: productToEdit?.reviews || []
    };

    onSave(payload);
    onClose();
  };

  // Mock product object for live preview
  const previewProduct: Product = {
    id: productToEdit ? productToEdit.id : 'preview-temp',
    name: name || (lang === 'ar' ? 'اسم المنتج الجديد' : 'New Luxury Product'),
    nameFr: nameFr || name || 'Nouveau Produit',
    nameAr: nameAr || name || 'منتج نجمة السماء الجديد',
    tagline: tagline || 'Editorial botanical radiance',
    taglineFr: tagline,
    taglineAr: taglineAr || tagline,
    description: description || 'High-performance beauty formulation.',
    descriptionFr: description,
    descriptionAr: descriptionAr || description,
    category,
    priceDZD: Number(priceDZD) || 4800,
    priceUSD: Number(priceUSD) || 36,
    rating: 5.0,
    reviewCount: 24,
    badge,
    skinTypes,
    concerns,
    isVegan,
    isParabenFree,
    isCrueltyFree,
    volume,
    stockCount: Number(stockCount) || 0,
    batchNumber,
    expirationDate,
    bgGradient: productToEdit?.bgGradient || 'from-[#F7ECE4] to-[#EBD5C8]',
    accentColor,
    image: productToEdit?.image,
    gallery: productToEdit?.gallery,
    brand: productToEdit?.brand,
    tag: productToEdit?.tag,
    ingredients: ['Aqua', 'Niacinamide', 'Hyaluronic Acid'],
    keyActives,
    howToUse: [],
    shades,
    reviews: []
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden font-sans"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#1C1917] text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#C87D65] flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base text-white">
                {isEditing
                  ? lang === 'ar'
                    ? `تعديل المنتج: ${productToEdit.nameAr || productToEdit.name}`
                    : `Edit Product: ${productToEdit.name}`
                  : lang === 'ar'
                  ? 'إضافة منتج فاخر جديد للمتجر'
                  : 'Add New Luxury Product'}
              </h2>
              <span className="text-[11px] text-stone-400 font-mono">
                Najmat Al Samaa Catalog CMS · Real-time Storefront Sync
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-2.5 bg-[#FAF7F5] border-b border-stone-200 flex items-center gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('basics')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'basics'
                ? 'bg-[#1C1917] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'البيانات الأساسية' : 'Basics'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pricing')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'pricing'
                ? 'bg-[#1C1917] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'السعر والمخزون' : 'Pricing & Stock'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('skin')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'skin'
                ? 'bg-[#1C1917] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'البشرة والتركيبة' : 'Formulation'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('shades')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'shades'
                ? 'bg-[#1C1917] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>
              {lang === 'ar'
                ? `درجات الألوان (${shades.length})`
                : `Shades (${shades.length})`}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ml-auto rtl:mr-auto rtl:ml-0 ${
              activeTab === 'preview'
                ? 'bg-[#C87D65] text-white shadow-xs'
                : 'text-[#C87D65] hover:bg-[#C87D65]/10'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'معاينة حية للمنتج' : 'Live Preview'}</span>
          </button>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: BASICS */}
          {activeTab === 'basics' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name English */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 block">
                    {lang === 'ar' ? 'اسم المنتج (بالإنجليزية) *' : 'Product Name (English) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. L'Éclat Luminous Silk Foundation"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:ring-1 focus:ring-[#C87D65] focus:outline-none"
                  />
                </div>

                {/* Name Arabic */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 block">
                    {lang === 'ar' ? 'اسم المنتج (بالعربية)' : 'Product Name (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={nameAr}
                    onChange={(e) => setNameAr(e.target.value)}
                    placeholder="مثال: كريم أساس الإشراقة الحريرية"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:ring-1 focus:ring-[#C87D65] focus:outline-none font-sans"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 block">
                    {lang === 'ar' ? 'التصنيف' : 'Category'}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryType)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:ring-1 focus:ring-[#C87D65] focus:outline-none cursor-pointer"
                  >
                    <option value="skincare">{lang === 'ar' ? 'عناية بالبشرة (Skincare)' : 'Skincare'}</option>
                    <option value="makeup">{lang === 'ar' ? 'مكياج (Makeup)' : 'Makeup'}</option>
                    <option value="haircare">{lang === 'ar' ? 'عناية بالشعر (Haircare)' : 'Haircare'}</option>
                    <option value="fragrance">{lang === 'ar' ? 'عطور فاخرة (Fragrance)' : 'Fragrance'}</option>
                    <option value="bundles">{lang === 'ar' ? 'مجموعات وباقات (Bundles)' : 'Bundles'}</option>
                  </select>
                </div>

                {/* Volume / Size */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 block">
                    {lang === 'ar' ? 'الحجم / السعة' : 'Volume / Size'}
                  </label>
                  <input
                    type="text"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    placeholder="e.g. 30 ml / 1.0 fl. oz."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:ring-1 focus:ring-[#C87D65] focus:outline-none"
                  />
                </div>

                {/* Badge */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 block">
                    {lang === 'ar' ? 'الشارة الترويجية' : 'Marketing Badge'}
                  </label>
                  <select
                    value={badge || ''}
                    onChange={(e) =>
                      setBadge(e.target.value ? (e.target.value as any) : undefined)
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:ring-1 focus:ring-[#C87D65] focus:outline-none cursor-pointer"
                  >
                    <option value="">{lang === 'ar' ? 'بدون شارة (عادي)' : 'None'}</option>
                    <option value="bestseller">{lang === 'ar' ? 'الأكثر مبيعاً (Bestseller)' : 'Bestseller'}</option>
                    <option value="new">{lang === 'ar' ? 'جديد (New Arrival)' : 'New Arrival'}</option>
                    <option value="limited">{lang === 'ar' ? 'إصدار محدود (Limited)' : 'Limited Edition'}</option>
                  </select>
                </div>
              </div>

              {/* Taglines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 block">
                    {lang === 'ar' ? 'الشعار التسويقي (English)' : 'Editorial Tagline (English)'}
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="Weightless buildable coverage with satin glow"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:ring-1 focus:ring-[#C87D65] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 block">
                    {lang === 'ar' ? 'الشعار التسويقي (بالعربية)' : 'Editorial Tagline (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={taglineAr}
                    onChange={(e) => setTaglineAr(e.target.value)}
                    placeholder="تغطية حريرية خفيفة الوزن مع إشراقة طبيعية"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:ring-1 focus:ring-[#C87D65] focus:outline-none font-sans"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 block">
                    {lang === 'ar' ? 'الوصف التفصيلي (English)' : 'Description (English)'}
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Comprehensive description of active botanicals and sensory benefits..."
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:ring-1 focus:ring-[#C87D65] focus:outline-none resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 block">
                    {lang === 'ar' ? 'الوصف التفصيلي (بالعربية)' : 'Description (Arabic)'}
                  </label>
                  <textarea
                    rows={3}
                    value={descriptionAr}
                    onChange={(e) => setDescriptionAr(e.target.value)}
                    placeholder="وصف تفصيلي للتركيبة الفاخرة والمكونات الطبيعية والنتائج المثبتة..."
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:ring-1 focus:ring-[#C87D65] focus:outline-none resize-none font-sans"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Accent Color Palette */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <label className="text-xs font-semibold text-stone-700 block">
                  {lang === 'ar' ? 'اللون المميز للعبوة / العطر' : 'Bottle / Accent Luxury Color'}
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {LUXURY_PRESET_COLORS.map((preset) => (
                    <button
                      key={preset.hex}
                      type="button"
                      onClick={() => setAccentColor(preset.hex)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs border transition-all cursor-pointer ${
                        accentColor.toLowerCase() === preset.hex.toLowerCase()
                          ? 'border-stone-900 bg-stone-100 font-bold'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: preset.hex }}
                      />
                      <span className="text-[11px] text-stone-700">{preset.name}</span>
                    </button>
                  ))}
                  <div className="flex items-center gap-1.5 ml-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-stone-200 p-0.5 bg-white"
                      title="Custom color picker"
                    />
                    <span className="text-xs font-mono text-stone-500">{accentColor}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRICING & INVENTORY */}
          {activeTab === 'pricing' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Price DZD */}
                <div className="p-4 rounded-2xl bg-[#FAF7F5] border border-stone-200 space-y-2">
                  <label className="text-xs font-semibold text-stone-800 block">
                    {lang === 'ar' ? 'سعر البيع بالدينار الجزائري (DZD) *' : 'Price in DZD (دج) *'}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      min={100}
                      step={50}
                      value={priceDZD}
                      onChange={(e) => setPriceDZD(Number(e.target.value))}
                      className="w-full pl-4 pr-16 py-2.5 rounded-xl bg-white border border-stone-200 text-sm font-mono font-bold text-stone-900 focus:ring-1 focus:ring-[#C87D65] focus:outline-none"
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs font-bold text-stone-500 font-mono">
                      DZD
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAutoCalculateUSD}
                    className="text-[11px] text-[#C87D65] hover:underline flex items-center gap-1 font-mono cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Auto-calculate USD (≈ 135 DZD/$)</span>
                  </button>
                </div>

                {/* Price USD */}
                <div className="p-4 rounded-2xl bg-[#FAF7F5] border border-stone-200 space-y-2">
                  <label className="text-xs font-semibold text-stone-800 block">
                    {lang === 'ar' ? 'السعر بالدولار الأمريكي (USD)' : 'Price in USD ($)'}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      value={priceUSD}
                      onChange={(e) => setPriceUSD(Number(e.target.value))}
                      className="w-full pl-4 pr-16 py-2.5 rounded-xl bg-white border border-stone-200 text-sm font-mono font-bold text-stone-900 focus:ring-1 focus:ring-[#C87D65] focus:outline-none"
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs font-bold text-stone-500 font-mono">
                      USD
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono block">
                    Displayed when customers choose USD currency
                  </span>
                </div>
              </div>

              {/* Stock & Batch Details */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-4">
                <h4 className="font-serif font-bold text-sm text-stone-900">
                  {lang === 'ar' ? 'إدارة المخزون وتاريخ الصلاحية' : 'Stock & Freshness Batch'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Stock Count */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700 block">
                      {lang === 'ar' ? 'الكمية المتوفرة في المخزن' : 'Stock Units Available'}
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={stockCount}
                      onChange={(e) => setStockCount(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono font-bold focus:ring-1 focus:ring-[#C87D65] focus:outline-none"
                    />
                  </div>

                  {/* Batch Number */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-stone-700">
                        {lang === 'ar' ? 'رقم التشغيلة (Batch)' : 'Batch Code'}
                      </label>
                      <button
                        type="button"
                        onClick={handleGenerateBatch}
                        className="text-[10px] text-[#C87D65] hover:underline cursor-pointer"
                      >
                        Generate
                      </button>
                    </div>
                    <input
                      type="text"
                      value={batchNumber}
                      onChange={(e) => setBatchNumber(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono focus:ring-1 focus:ring-[#C87D65] focus:outline-none"
                    />
                  </div>

                  {/* Expiration Date */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700 block">
                      {lang === 'ar' ? 'تاريخ انتهاء الصلاحية' : 'Expiration Date'}
                    </label>
                    <input
                      type="date"
                      value={expirationDate}
                      onChange={(e) => setExpirationDate(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono focus:ring-1 focus:ring-[#C87D65] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FORMULATION & SKIN TYPES */}
          {activeTab === 'skin' && (
            <div className="space-y-5">
              {/* Skin Types Multi-select */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-800 block">
                  {lang === 'ar' ? 'مناسب لأنواع البشرة (حدد كل ما ينطبق):' : 'Compatible Skin Types:'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['oily', 'dry', 'combination', 'sensitive', 'normal'] as SkinType[]).map((st) => {
                    const isSelected = skinTypes.includes(st);
                    return (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleToggleSkinType(st)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#1C1917] text-white border-stone-900 shadow-xs'
                            : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#C87D65]" />}
                        <span className="capitalize">{st}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Skin Concerns Multi-select */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-800 block">
                  {lang === 'ar' ? 'يعالج مشاكل البشرة:' : 'Addresses Skin Concerns:'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['hydration', 'brightening', 'anti-aging', 'texture', 'pores', 'acne'] as SkinConcern[]).map(
                    (sc) => {
                      const isSelected = concerns.includes(sc);
                      return (
                        <button
                          key={sc}
                          type="button"
                          onClick={() => handleToggleConcern(sc)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#C87D65] text-white border-[#C87D65] shadow-xs'
                              : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                          <span className="capitalize">{sc}</span>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Clean Science Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FAF7F5] border border-stone-200">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isVegan}
                    onChange={(e) => setIsVegan(e.target.checked)}
                    className="w-4 h-4 text-[#C87D65] rounded focus:ring-0 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-stone-800">
                    {lang === 'ar' ? 'نباتي 100% (Vegan)' : '100% Vegan'}
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isParabenFree}
                    onChange={(e) => setIsParabenFree(e.target.checked)}
                    className="w-4 h-4 text-[#C87D65] rounded focus:ring-0 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-stone-800">
                    {lang === 'ar' ? 'خالٍ من البارابين (Paraben-Free)' : 'Paraben-Free'}
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isCrueltyFree}
                    onChange={(e) => setIsCrueltyFree(e.target.checked)}
                    className="w-4 h-4 text-[#C87D65] rounded focus:ring-0 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-stone-800">
                    {lang === 'ar' ? 'لم يجرب على الحيوانات (Cruelty-Free)' : 'Cruelty-Free'}
                  </span>
                </label>
              </div>

              {/* Key Active Ingredients Manager */}
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-stone-700">
                    {lang === 'ar' ? 'المكونات الفعالة الرئيسية (Key Actives)' : 'Key Active Ingredients'}
                  </h4>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {keyActives.length} active(s) added
                  </span>
                </div>

                {/* List of current key actives */}
                <div className="space-y-2">
                  {keyActives.map((ka, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900">{ka.name}</span>
                          {ka.concentration && (
                            <span className="text-[10px] bg-stone-200 text-stone-700 px-1.5 py-0.2 rounded font-mono font-medium">
                              {ka.concentration}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-500 font-sans mt-0.5">{ka.benefit}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveActive(idx)}
                        className="p-1.5 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Remove active"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add new active ingredient mini form */}
                <div className="p-3 rounded-2xl border border-stone-200 bg-white space-y-2 text-xs">
                  <span className="font-semibold text-stone-700 block">
                    {lang === 'ar' ? '+ إضافة مركب نشط جديد' : '+ Add New Active'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Active Name (e.g. 5% Niacinamide)"
                      value={activeName}
                      onChange={(e) => setActiveName(e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Arabic Name (مثال: 5% نياسيناميد)"
                      value={activeNameAr}
                      onChange={(e) => setActiveNameAr(e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs focus:outline-none font-sans"
                    />
                    <input
                      type="text"
                      placeholder="Concentration (e.g. 5%)"
                      value={activeConcentration}
                      onChange={(e) => setActiveConcentration(e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Benefit description (e.g. Refines pore texture)"
                      value={activeBenefit}
                      onChange={(e) => setActiveBenefit(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddActive}
                      className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold cursor-pointer shrink-0"
                    >
                      Add Active
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SHADES & SWATCHES */}
          {activeTab === 'shades' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-stone-900">
                    {lang === 'ar' ? 'درجات الألوان المتوفرة للمنتج' : 'Complexion & Color Shades'}
                  </h4>
                  <p className="text-xs text-stone-500">
                    {lang === 'ar'
                      ? 'أضف درجات الألوان المختلفة مع كود اللون الحقيقي (HEX) ودرجة البشرة.'
                      : 'Add inclusive shade variants with real HEX colors for interactive swatches.'}
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-stone-600 bg-stone-100 px-2 py-1 rounded-lg">
                  {shades.length} {lang === 'ar' ? 'درجة مسجلة' : 'shades'}
                </span>
              </div>

              {/* Current Shades List */}
              {shades.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto p-1">
                  {shades.map((sh) => (
                    <div
                      key={sh.id}
                      className="p-2.5 rounded-xl border border-stone-200 bg-[#FAF7F5] flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-6 h-6 rounded-full border border-black/15 shadow-xs shrink-0"
                          style={{ backgroundColor: sh.hex }}
                        />
                        <div>
                          <span className="font-bold text-stone-900 block truncate max-w-[130px]">
                            {sh.name}
                          </span>
                          <span className="text-[10px] text-stone-500 font-mono">
                            {sh.hex} · {sh.undertone}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveShade(sh.id)}
                        className="p-1.5 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete shade"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Shade Form */}
              <div className="p-4 rounded-2xl bg-white border border-stone-300 space-y-3">
                <span className="font-semibold text-xs text-stone-800 block">
                  {lang === 'ar' ? '+ إضافة درجة لون جديدة' : '+ Add New Shade Variant'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    placeholder="Shade Name (e.g. 120 Warm Vanilla)"
                    value={newShadeName}
                    onChange={(e) => setNewShadeName(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:ring-1 focus:ring-[#C87D65] focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Arabic Shade Name (مثال: 120 فانيليا دافئة)"
                    value={newShadeNameAr}
                    onChange={(e) => setNewShadeNameAr(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:ring-1 focus:ring-[#C87D65] focus:outline-none font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-center">
                  {/* Hex Picker */}
                  <div className="flex items-center gap-2 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
                    <input
                      type="color"
                      value={newShadeHex}
                      onChange={(e) => setNewShadeHex(e.target.value)}
                      className="w-7 h-7 rounded-full cursor-pointer border border-black/10 bg-transparent p-0"
                    />
                    <input
                      type="text"
                      value={newShadeHex}
                      onChange={(e) => setNewShadeHex(e.target.value)}
                      placeholder="#HEX"
                      className="w-16 bg-transparent text-xs font-mono font-bold text-stone-800 focus:outline-none"
                    />
                  </div>

                  {/* Undertone */}
                  <select
                    value={newShadeUndertone}
                    onChange={(e) => setNewShadeUndertone(e.target.value as any)}
                    className="px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="neutral">Neutral Undertone</option>
                    <option value="warm">Warm / Golden</option>
                    <option value="cool">Cool / Rosy</option>
                    <option value="olive">Olive Undertone</option>
                  </select>

                  {/* Tone Level */}
                  <select
                    value={newShadeTone}
                    onChange={(e) => setNewShadeTone(e.target.value as any)}
                    className="px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="fair">Fair (بشرة فاتحة جداً)</option>
                    <option value="light">Light (بشرة فاتحة)</option>
                    <option value="medium">Medium (بشرة متوسطة حنطية)</option>
                    <option value="tan">Tan (بشرة سمراء برونزية)</option>
                    <option value="deep">Deep (بشرة داكنة غنية)</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleAddShade}
                  className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'تأكيد إضافة الدرجة' : 'Confirm Shade'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: LIVE PREVIEW */}
          {activeTab === 'preview' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FAF7F5] border border-stone-200 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-serif font-bold text-sm text-stone-900">
                    {lang === 'ar' ? 'معاينة ظهور المنتج على الموقع للعملاء' : 'Live Storefront Visual Preview'}
                  </h4>
                  <p className="text-stone-500 text-[11px]">
                    {lang === 'ar'
                      ? 'هكذا سيظهر المنتج في قائمة المنتجات وصفحة التفاصيل.'
                      : 'This is exactly how customers will see your newly added or updated product.'}
                  </p>
                </div>
                <span className="font-mono font-bold text-[#C87D65] text-sm">
                  {formatPrice(previewProduct.priceDZD, previewProduct.priceUSD)}
                </span>
              </div>

              <div className="max-w-sm mx-auto bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <ProductVisual product={previewProduct} className="w-full h-full" />
                  {previewProduct.badge && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold bg-[#C87D65] text-white shadow-xs">
                      {previewProduct.badge}
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                    {previewProduct.category} · {previewProduct.volume}
                  </span>
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    {lang === 'ar' ? previewProduct.nameAr : previewProduct.name}
                  </h3>
                  <p className="text-xs text-stone-500 font-sans line-clamp-2">
                    {lang === 'ar' ? previewProduct.taglineAr : previewProduct.tagline}
                  </p>

                  {previewProduct.shades && previewProduct.shades.length > 0 && (
                    <div className="pt-2 flex items-center gap-1.5 flex-wrap">
                      {previewProduct.shades.slice(0, 6).map((s) => (
                        <div
                          key={s.id}
                          className="w-4 h-4 rounded-full border border-black/10 shadow-2xs"
                          style={{ backgroundColor: s.hex }}
                        />
                      ))}
                      {previewProduct.shades.length > 6 && (
                        <span className="text-[10px] text-stone-400 font-mono">
                          +{previewProduct.shades.length - 6}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="font-mono font-bold text-stone-900 text-sm">
                      {formatPrice(previewProduct.priceDZD, previewProduct.priceUSD)}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {previewProduct.stockCount} in stock
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
            >
              {lang === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#1C1917] hover:bg-[#2C2724] text-white text-xs font-semibold flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Check className="w-4 h-4 text-[#C87D65]" />
              <span>
                {isEditing
                  ? lang === 'ar'
                    ? 'حفظ التعديلات ونشرها'
                    : 'Save & Publish Changes'
                  : lang === 'ar'
                  ? 'إضافة المنتج للمتجر فوراً'
                  : 'Add Product to Store'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
