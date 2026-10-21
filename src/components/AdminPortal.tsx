import React, { useState } from 'react';
import {
  PhoneCall,
  MessageCircle,
  Download,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Plus,
  RefreshCw,
  Search,
  ArrowLeft,
  Truck,
  Package,
  Layers,
  TrendingUp,
  Clock,
  ShieldCheck,
  ExternalLink,
  Users,
  Box,
  FileSpreadsheet,
  Edit3,
  Trash2,
  Copy,
  Sparkles,
  ShoppingBag,
  Eye,
  Check,
  Lock,
  KeyRound,
  LogOut
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { OrderStatus, Order, Product, CategoryType } from '../types';
import { WILAYAS_LIST } from '../data/regions';
import { ProductVisual } from './ProductVisual';
import { ProductEditorModal } from './ProductEditorModal';

export const AdminPortal: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    createOrder,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault,
    setActiveProduct
  } = useShop();
  const { lang, setLang, formatPrice, isRtl, t } = useLanguage();
  const { navigate, isAdminDomain, storeDomainUrl } = useRouter();

  const [activeTab, setActiveTab] = useState<'products' | 'queue' | 'inventory' | 'courier'>('products');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Security Gatekeeper States
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('najmat_admin_auth') === 'true';
  });
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [isChangePinModalOpen, setIsChangePinModalOpen] = useState(false);
  const [newPinInput, setNewPinInput] = useState('');
  const [pinChangeSuccessMsg, setPinChangeSuccessMsg] = useState(false);

  const getSavedPin = () => {
    return localStorage.getItem('najmat_admin_pin') || '1234';
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin.trim() === getSavedPin()) {
      sessionStorage.setItem('najmat_admin_auth', 'true');
      setIsAuthenticated(true);
      setPinError(false);
      setAdminPin('');
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('najmat_admin_auth');
    setIsAuthenticated(false);
    setAdminPin('');
  };

  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPinInput.trim().length >= 4) {
      localStorage.setItem('najmat_admin_pin', newPinInput.trim());
      setPinChangeSuccessMsg(true);
      setTimeout(() => {
        setPinChangeSuccessMsg(false);
        setIsChangePinModalOpen(false);
        setNewPinInput('');
      }, 1500);
    }
  };

  // Product Management States
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [isProductEditorOpen, setIsProductEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState<Product | null>(null);

  // KPIs
  const newOrdersCount = orders.filter((o) => o.status === 'new').length;
  const confirmedCount = orders.filter((o) => o.status === 'confirmed').length;
  const shippedCount = orders.filter((o) => o.status === 'shipped').length;
  const totalCodValue = orders.reduce((sum, o) => sum + o.total, 0);

  // Products KPIs
  const totalProductsCount = products.length;
  const totalStockUnits = products.reduce((acc, p) => acc + p.stockCount, 0);
  const totalInventoryValueDZD = products.reduce((acc, p) => acc + p.stockCount * p.priceDZD, 0);
  const lowStockCount = products.filter((p) => p.stockCount <= 15).length;

  // Filtered products for CMS
  const filteredProducts = products.filter((p) => {
    const matchCategory = productCategoryFilter === 'all' || p.category === productCategoryFilter;
    const q = productSearchQuery.toLowerCase().trim();
    const matchQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.nameAr?.toLowerCase().includes(q) ||
      p.batchNumber?.toLowerCase().includes(q) ||
      p.tagline?.toLowerCase().includes(q) ||
      p.taglineAr?.toLowerCase().includes(q);
    return matchCategory && matchQuery;
  });

  // Filtered orders
  const filteredOrders = orders.filter((ord) => {
    const matchStatus = filterStatus === 'all' || ord.status === filterStatus;
    const matchQuery =
      ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.phone.includes(searchQuery);
    return matchStatus && matchQuery;
  });

  // Export to CSV for Yalidine / ZR Express format
  const handleExportCSV = () => {
    const headers = [
      'Order ID',
      'Customer Name',
      'Phone',
      'Wilaya',
      'Commune',
      'Address',
      'Delivery Type',
      'Total COD (DZD)',
      'Items Description',
      'Status'
    ];

    const rows = filteredOrders.map((o) => [
      o.id,
      `"${o.customerName}"`,
      `"${o.phone}"`,
      `"${o.wilayaName}"`,
      `"${o.commune}"`,
      `"${o.address}"`,
      o.deliveryType,
      o.total,
      `"${o.items.map((i) => `${i.productName} (${i.quantity})`).join(', ')}"`,
      o.status
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `NajmatAlSamaa_Courier_Export_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddSimulatedOrder = () => {
    const names = ['Lina Mansouri', 'Karim Haddad', 'Sarah Dahmani', 'Ryad Belkacem', 'Yasmine Cherif'];
    const wilayas = [WILAYAS_LIST[0], WILAYAS_LIST[1], WILAYAS_LIST[2], WILAYAS_LIST[3], WILAYAS_LIST[4]];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomWilaya = wilayas[Math.floor(Math.random() * wilayas.length)];
    const randomPhone = `055${Math.floor(1000000 + Math.random() * 9000000)}`;

    const chosenProduct = products[0] || undefined;
    if (chosenProduct) {
      createOrder({
        customerName: randomName,
        phone: randomPhone,
        wilayaCode: randomWilaya.code,
        commune: randomWilaya.communes[0],
        address: 'Boulevard des Martyrs, Résidence El Bahdja',
        deliveryType: Math.random() > 0.5 ? 'home' : 'desk',
        paymentMethod: 'cod',
        singleProductItem: {
          product: chosenProduct,
          shade: chosenProduct.shades?.[0],
          quantity: 1
        }
      });
    }
  };

  // Product CRUD Action Handlers
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setIsProductEditorOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setIsProductEditorOpen(true);
  };

  const handleDuplicateProduct = (prod: Product) => {
    const duplicated: Product = {
      ...prod,
      id: `prod-${Date.now()}`,
      name: `${prod.name} (Copy)`,
      nameAr: `${prod.nameAr || prod.name} (نسخة)`,
      nameFr: `${prod.nameFr || prod.name} (Copie)`,
      batchNumber: `NS-25${Math.random().toString(36).substring(2, 5).toUpperCase()}`
    };
    addProduct(duplicated);
  };

  const handleSaveProduct = (savedProd: Product) => {
    if (editingProduct) {
      updateProduct(savedProd.id, savedProd);
    } else {
      addProduct(savedProd);
    }
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmProduct) {
      deleteProduct(deleteConfirmProduct.id);
      setDeleteConfirmProduct(null);
    }
  };

  const handlePreviewInStore = (prod: Product) => {
    setActiveProduct(prod);
    navigate(`/product/${prod.id}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#141211] text-[#FAF7F5] flex items-center justify-center p-4 selection:bg-[#C87D65] selection:text-white" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="max-w-md w-full bg-[#1C1917]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#C87D65]/15 border border-[#C87D65]/30 flex items-center justify-center text-[#C87D65] shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#C87D65] px-2.5 py-0.5 rounded-full bg-[#C87D65]/10 border border-[#C87D65]/20 inline-block">
              {lang === 'ar' ? 'منطقة إدارية سرية ومحمية' : 'Encrypted Administrative Zone'}
            </span>
            <h1 className="text-2xl font-serif font-bold text-white tracking-wide">
              {lang === 'ar' ? 'نجمة السماء | بوابة الإدارة' : 'Najmat Al Samaa | Admin Gate'}
            </h1>
            <p className="text-xs text-stone-400 leading-relaxed">
              {lang === 'ar'
                ? 'لوحة التحكم مخصصة لمدير المتجر فقط ومحجوبة عن الزبائن. يرجى إدخال رمز الأمان للمتابعة.'
                : 'Restricted merchant portal. Please enter your secret Master PIN to proceed.'}
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5 text-left rtl:text-right">
              <label className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block text-center">
                {lang === 'ar' ? 'رمز الأمان السري (PIN)' : 'Secret Master PIN'}
              </label>
              <div className="relative">
                <input
                  type="password"
                  autoFocus
                  value={adminPin}
                  onChange={(e) => {
                    setAdminPin(e.target.value);
                    if (pinError) setPinError(false);
                  }}
                  placeholder="••••"
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-center text-2xl tracking-[0.4em] font-mono text-white focus:outline-none transition-all ${
                    pinError
                      ? 'border-red-500/80 ring-2 ring-red-500/30'
                      : 'border-white/15 focus:border-[#C87D65] focus:ring-1 focus:ring-[#C87D65]'
                  }`}
                />
              </div>
              {pinError && (
                <p className="text-xs text-red-400 text-center flex items-center justify-center gap-1 mt-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'رمز الأمان غير صحيح، يرجى المحاولة ثانية' : 'Incorrect security PIN. Please try again.'}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#C87D65] hover:bg-[#B36B54] text-white font-medium text-sm rounded-xl shadow-lg shadow-[#C87D65]/20 hover:shadow-[#C87D65]/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>{lang === 'ar' ? 'فتح لوحة التحكم' : 'Unlock Admin Portal'}</span>
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 flex flex-col items-center gap-3">
            <button
              onClick={() => navigate('/store')}
              className="text-xs text-stone-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
              <span>{lang === 'ar' ? 'الرجوع إلى متجر الزبائن' : 'Back to Storefront'}</span>
            </button>

            <span className="text-[10px] text-stone-600 font-mono">
              {lang === 'ar' ? 'الرمز الافتراضي: 1234' : 'Default Master PIN: 1234'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-stone-900 flex flex-col font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* 1. Dedicated Admin Top Navigation Header */}
      <header className="sticky top-0 z-30 bg-[#1C1917] text-white border-b border-stone-800 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#C87D65] flex items-center justify-center text-white font-serif font-bold text-sm shadow-xs">
            ★
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm tracking-wider uppercase text-white">
                {lang === 'ar' ? 'نجمة السماء' : 'Najmat Al Samaa'}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#C87D65]/20 text-[#E8B4A2] font-semibold border border-[#C87D65]/30">
                {lang === 'ar' ? 'لوحة التحكم المركزية' : 'Admin Operations Hub'}
              </span>
            </div>
            <span className="text-[10px] text-stone-400 font-mono block">
              Direct Route: <strong className="text-stone-300">#/admin</strong> · {products.length} {lang === 'ar' ? 'منتج مسجل' : 'Products'} · 58 Wilayas COD
            </span>
          </div>
        </div>

        {/* Right Admin Header Controls */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-stone-400 border-r border-stone-800 pr-3 rtl:border-l rtl:border-r-0 rtl:pl-3 rtl:pr-0">
            <button
              onClick={() => setLang('en')}
              className={`hover:text-white transition-colors cursor-pointer ${lang === 'en' ? 'text-[#C87D65] font-bold' : ''}`}
            >
              EN
            </button>
            <span>·</span>
            <button
              onClick={() => setLang('fr')}
              className={`hover:text-white transition-colors cursor-pointer ${lang === 'fr' ? 'text-[#C87D65] font-bold' : ''}`}
            >
              FR
            </button>
            <span>·</span>
            <button
              onClick={() => setLang('ar')}
              className={`hover:text-white transition-colors cursor-pointer ${lang === 'ar' ? 'text-[#C87D65] font-bold font-sans' : ''}`}
            >
              العربية
            </button>
          </div>

          {/* Quick link to Storefront Website */}
          <button
            onClick={() => {
              if (isAdminDomain && typeof window !== 'undefined' && !window.location.hostname.includes('localhost')) {
                window.location.href = storeDomainUrl;
              } else {
                navigate('/store');
              }
            }}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1.5 transition-all border border-white/15 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#C87D65]" />
            <span>{lang === 'ar' ? 'زيارة متجر نجمة السماء' : 'Visit Storefront'}</span>
          </button>

          {/* Change PIN button */}
          <button
            onClick={() => setIsChangePinModalOpen(true)}
            className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white text-xs font-medium flex items-center gap-1 transition-all border border-white/10 cursor-pointer"
            title={lang === 'ar' ? 'تغيير رمز المرور' : 'Change Security PIN'}
          >
            <KeyRound className="w-3.5 h-3.5 text-stone-400" />
            <span className="hidden sm:inline">{lang === 'ar' ? 'رمز الأمان' : 'PIN'}</span>
          </button>

          {/* Logout & Lock Button */}
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-300 hover:text-red-200 text-xs font-medium flex items-center gap-1.5 transition-all border border-red-500/30 cursor-pointer"
            title={lang === 'ar' ? 'إغلاق اللوحة وقفل الجلسة' : 'Lock & Exit'}
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span>{lang === 'ar' ? 'قفل اللوحة' : 'Lock'}</span>
          </button>
        </div>
      </header>

      {/* 2. Admin Operational Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-6">
        {/* Dynamic KPI Performance Strip */}
        {activeTab === 'products' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-stone-200/90 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>{lang === 'ar' ? 'إجمالي المنتجات في المتجر' : 'Active Catalog Items'}</span>
                <ShoppingBag className="w-4 h-4 text-[#C87D65]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif font-bold text-2xl text-stone-900">{totalProductsCount}</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-mono font-medium">
                  Live on site
                </span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-stone-200/90 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>{lang === 'ar' ? 'إجمالي وحدات المخزون' : 'Total Stock Units'}</span>
                <Box className="w-4 h-4 text-stone-600" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif font-bold text-2xl text-stone-900">{totalStockUnits}</span>
                <span className="text-[10px] text-stone-600 font-mono font-medium">
                  {lang === 'ar' ? 'قطعة متوفرة' : 'units in warehouse'}
                </span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-stone-200/90 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>{lang === 'ar' ? 'القيمة التقديرية للمخزون' : 'Inventory Asset Value'}</span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono font-bold text-xl text-stone-900">
                  {totalInventoryValueDZD.toLocaleString()} DZD
                </span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-stone-200/90 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>{lang === 'ar' ? 'منتجات شارفت على النفاد' : 'Low Stock Alerts'}</span>
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif font-bold text-2xl text-stone-900">{lowStockCount}</span>
                <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded font-mono font-medium">
                  ≤ 15 units
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-stone-200/90 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>{lang === 'ar' ? 'طلبيات تنتظر التأكيد' : 'New In Queue'}</span>
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif font-bold text-2xl text-stone-900">{newOrdersCount}</span>
                <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded font-mono font-medium">
                  Call required
                </span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-stone-200/90 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>{lang === 'ar' ? 'مؤكدة هاتفياً / واتساب' : 'Confirmed Orders'}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif font-bold text-2xl text-stone-900">{confirmedCount}</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-mono font-medium">
                  Ready to pack
                </span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-stone-200/90 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>{lang === 'ar' ? 'مع شركة التوصيل' : 'In Transit (Yalidine)'}</span>
                <Truck className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif font-bold text-2xl text-stone-900">{shippedCount}</span>
                <span className="text-[10px] text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded font-mono font-medium">
                  Active tracking
                </span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-stone-200/90 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>{lang === 'ar' ? 'إجمالي مبيعات الدفع عند الاستلام' : 'Total COD Volume'}</span>
                <TrendingUp className="w-4 h-4 text-[#C87D65]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono font-bold text-xl text-stone-900">{totalCodValue.toLocaleString()} DZD</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 0: PRODUCT MANAGEMENT & CATALOG CMS */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            {/* Filter, Search & Category Strip */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 rtl:left-auto rtl:right-3" />
                <input
                  type="text"
                  value={productSearchQuery}
                  onChange={(e) => setProductSearchQuery(e.target.value)}
                  placeholder={
                    lang === 'ar'
                      ? 'البحث عن منتج، المكونات، رقم التشغيلة...'
                      : 'Search product, ingredients, batch...'
                  }
                  className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
                {[
                  { id: 'all', label: lang === 'ar' ? 'الكل' : 'All' },
                  { id: 'skincare', label: lang === 'ar' ? 'عناية بالبشرة' : 'Skincare' },
                  { id: 'makeup', label: lang === 'ar' ? 'مكياج' : 'Makeup' },
                  { id: 'haircare', label: lang === 'ar' ? 'عناية بالشعر' : 'Haircare' },
                  { id: 'fragrance', label: lang === 'ar' ? 'عطور' : 'Fragrance' },
                  { id: 'bundles', label: lang === 'ar' ? 'باقات' : 'Bundles' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setProductCategoryFilter(cat.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      productCategoryFilter === cat.id
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right text-xs">
                  <thead className="bg-[#FAF7F5] border-b border-stone-200/90 text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4">{lang === 'ar' ? 'المظهر والمنتج' : 'Product & Visual'}</th>
                      <th className="py-3.5 px-4">{lang === 'ar' ? 'التصنيف والحجم' : 'Category & Size'}</th>
                      <th className="py-3.5 px-4">{lang === 'ar' ? 'سعر البيع' : 'Retail Price'}</th>
                      <th className="py-3.5 px-4">{lang === 'ar' ? 'المخزون والتشغيلة' : 'Stock & Batch'}</th>
                      <th className="py-3.5 px-4">{lang === 'ar' ? 'الدرجات والمكونات' : 'Shades & Actives'}</th>
                      <th className="py-3.5 px-4 text-right rtl:text-left">{lang === 'ar' ? 'الإجراءات والتحكم' : 'CMS Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-sans">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-stone-400 font-serif italic">
                          {lang === 'ar' ? 'لا توجد منتجات مطابقة لخيارات البحث.' : 'No products found.'}
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((prod) => (
                        <tr key={prod.id} className="hover:bg-stone-50/70 transition-colors">
                          {/* Product & Visual */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-14 rounded-xl overflow-hidden shrink-0 border border-stone-200/80 bg-[#FAF7F5]">
                                <ProductVisual product={prod} className="w-full h-full scale-75" />
                              </div>
                              <div className="min-w-0 max-w-[200px]">
                                <span className="font-serif font-bold text-stone-900 block truncate text-xs">
                                  {lang === 'ar' ? prod.nameAr || prod.name : prod.name}
                                </span>
                                <span className="text-[10px] text-stone-500 block truncate">
                                  {lang === 'ar' ? prod.taglineAr || prod.tagline : prod.tagline}
                                </span>
                                {prod.badge && (
                                  <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-[#C87D65]/15 text-[#A8583F] uppercase">
                                    {prod.badge}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Category & Volume */}
                          <td className="py-3.5 px-4">
                            <span className="font-mono text-stone-800 uppercase text-[11px] font-semibold block">
                              {prod.category}
                            </span>
                            <span className="text-[10px] text-stone-400 font-mono">
                              {prod.volume || '50 ml'}
                            </span>
                          </td>

                          {/* Price */}
                          <td className="py-3.5 px-4 font-mono">
                            <span className="font-bold text-stone-900 block text-xs">
                              {formatPrice(prod.priceDZD, prod.priceUSD)}
                            </span>
                            <span className="text-[10px] text-stone-400">
                              (${prod.priceUSD} USD)
                            </span>
                          </td>

                          {/* Stock & Batch */}
                          <td className="py-3.5 px-4 font-mono">
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                                prod.stockCount <= 10
                                  ? 'bg-red-50 text-red-700 border border-red-200'
                                  : prod.stockCount <= 20
                                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              }`}
                            >
                              {prod.stockCount} {lang === 'ar' ? 'قطعة' : 'in stock'}
                            </span>
                            <span className="text-[10px] text-stone-400 block mt-0.5">
                              {prod.batchNumber} · Exp: {prod.expirationDate?.slice(0, 7)}
                            </span>
                          </td>

                          {/* Shades & Actives */}
                          <td className="py-3.5 px-4">
                            {prod.shades && prod.shades.length > 0 ? (
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 flex-wrap">
                                  {prod.shades.slice(0, 5).map((sh) => (
                                    <span
                                      key={sh.id}
                                      title={sh.name}
                                      className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs"
                                      style={{ backgroundColor: sh.hex }}
                                    />
                                  ))}
                                  {prod.shades.length > 5 && (
                                    <span className="text-[9px] font-mono text-stone-500">
                                      +{prod.shades.length - 5}
                                    </span>
                                  )}
                                </div>
                                <span className="text-[10px] text-stone-500 font-mono block">
                                  {prod.shades.length} {lang === 'ar' ? 'درجة لون' : 'shades'}
                                </span>
                              </div>
                            ) : (
                              <span className="text-[11px] text-stone-500 italic">
                                {prod.keyActives?.[0]?.name || (lang === 'ar' ? 'تركيبة موحدة' : 'Universal')}
                              </span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right rtl:text-left">
                            <div className="flex items-center justify-end rtl:justify-start gap-1.5">
                              {/* Preview in Store */}
                              <button
                                onClick={() => handlePreviewInStore(prod)}
                                className="p-1.5 text-stone-500 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                                title={lang === 'ar' ? 'معاينة في المتجر' : 'Preview in Store'}
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              {/* Edit Button */}
                              <button
                                onClick={() => handleOpenEditProduct(prod)}
                                className="px-2.5 py-1.5 rounded-lg bg-[#1C1917] hover:bg-stone-800 text-white text-[11px] font-semibold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                              >
                                <Edit3 className="w-3 h-3 text-[#C87D65]" />
                                <span>{lang === 'ar' ? 'تعديل' : 'Edit'}</span>
                              </button>

                              {/* Duplicate Button */}
                              <button
                                onClick={() => handleDuplicateProduct(prod)}
                                className="p-1.5 text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                                title={lang === 'ar' ? 'نسخ سريع' : 'Duplicate Product'}
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>

                              {/* Delete Button */}
                              <button
                                onClick={() => setDeleteConfirmProduct(prod)}
                                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                title={lang === 'ar' ? 'حذف المنتج' : 'Delete Product'}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: CALL CENTER QUEUE */}
        {activeTab === 'queue' && (
          <div className="space-y-4">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search order ID, customer name, or phone..."
                  className="w-full pl-9 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
                />
              </div>

              {/* Status Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    filterStatus === 'all'
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  All ({orders.length})
                </button>
                {['new', 'confirmed', 'no_answer_1', 'packed', 'shipped'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                      filterStatus === st
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right text-xs">
                  <thead className="bg-[#FAF7F5] border-b border-stone-200/90 text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4">{lang === 'ar' ? 'رقم الطلب والوقت' : 'Ref & Time'}</th>
                      <th className="py-3.5 px-4">{lang === 'ar' ? 'العميل ورقم الهاتف' : 'Customer & Phone'}</th>
                      <th className="py-3.5 px-4">{lang === 'ar' ? 'الولاية والتوصيل' : 'Destination'}</th>
                      <th className="py-3.5 px-4">{lang === 'ar' ? 'المنتجات' : 'Items'}</th>
                      <th className="py-3.5 px-4">{lang === 'ar' ? 'المبلغ عند الاستلام' : 'Amount (COD)'}</th>
                      <th className="py-3.5 px-4">{lang === 'ar' ? 'حالة الطلب' : 'Status & Action'}</th>
                      <th className="py-3.5 px-4 text-right rtl:text-left">{lang === 'ar' ? 'تأكيد عبر واتساب' : 'Anti-RTO Trigger'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-sans">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-stone-400 font-serif italic">
                          {lang === 'ar' ? 'لا توجد طلبات مطابقة في قائمة الانتظار.' : 'No matching orders in the queue.'}
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((ord) => {
                        const whatsappText = encodeURIComponent(
                          lang === 'ar'
                            ? `مرحباً ${ord.customerName}! متجر نجمة السماء يتواصل معك بخصوص طلبيتك رقم ${ord.id} بمبلغ ${ord.total} دج. هل تؤكدين شحن الطرد إلى ${ord.wilayaName}؟`
                            : `Bonjour ${ord.customerName}! Najmat Al Samaa vous contacte concernant votre commande ${ord.id} (${ord.total} DZD). Est-ce bien confirmé pour l'expédition vers ${ord.wilayaName}?`
                        );
                        const waUrl = `https://wa.me/213${ord.phone.replace(/^0/, '')}?text=${whatsappText}`;

                        return (
                          <tr key={ord.id} className="hover:bg-stone-50/70 transition-colors">
                            {/* Ref */}
                            <td className="py-3.5 px-4 font-mono">
                              <span className="font-bold text-stone-900 block">{ord.id}</span>
                              <span className="text-[10px] text-stone-400">
                                {new Date(ord.createdAt).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </td>

                            {/* Customer */}
                            <td className="py-3.5 px-4">
                              <span className="font-semibold text-stone-900 block">
                                {ord.customerName}
                              </span>
                              <a
                                href={`tel:${ord.phone}`}
                                className="font-mono text-stone-500 hover:text-stone-900 inline-flex items-center gap-1"
                              >
                                <PhoneCall className="w-2.5 h-2.5 text-stone-400" />
                                <span>{ord.phone}</span>
                              </a>
                            </td>

                            {/* Destination */}
                            <td className="py-3.5 px-4">
                              <span className="font-medium text-stone-900 block truncate max-w-[140px]">
                                {ord.wilayaName}
                              </span>
                              <span className="text-[11px] text-stone-500">
                                {ord.commune} · ({ord.deliveryType === 'home' ? (lang === 'ar' ? 'توصيل للمنزل' : 'Home') : (lang === 'ar' ? 'مكتب استلام' : 'Desk')})
                              </span>
                            </td>

                            {/* Items */}
                            <td className="py-3.5 px-4 max-w-[180px]">
                              {ord.items.map((it, idx) => (
                                <div key={idx} className="truncate text-stone-700">
                                  • {it.productName}{' '}
                                  {it.shadeName && (
                                    <span className="text-stone-400 text-[10px]">({it.shadeName})</span>
                                  )}
                                </div>
                              ))}
                            </td>

                            {/* Amount */}
                            <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                              {formatPrice(ord.total, ord.total / 135)}
                            </td>

                            {/* Status */}
                            <td className="py-3.5 px-4">
                              <select
                                value={ord.status}
                                onChange={(e) =>
                                  updateOrderStatus(ord.id, e.target.value as OrderStatus)
                                }
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border focus:outline-none cursor-pointer ${
                                  ord.status === 'confirmed'
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                    : ord.status === 'new'
                                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                                    : ord.status === 'shipped'
                                    ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                                    : 'bg-stone-100 text-stone-800 border-stone-200'
                                }`}
                              >
                                <option value="new">{lang === 'ar' ? 'جديد (بانتظار التأكيد)' : 'New (To Confirm)'}</option>
                                <option value="confirmed">{lang === 'ar' ? 'مؤكد هاتفياً' : 'Confirmed'}</option>
                                <option value="no_answer_1">{lang === 'ar' ? 'لا يرد (محاولة 1)' : 'No Answer (1st)'}</option>
                                <option value="no_answer_2">{lang === 'ar' ? 'لا يرد (محاولة 2)' : 'No Answer (2nd)'}</option>
                                <option value="packed">{lang === 'ar' ? 'تم تجهيز الطرد' : 'Packed'}</option>
                                <option value="shipped">{lang === 'ar' ? 'تم الشحن (ياليدين)' : 'Shipped (Yalidine)'}</option>
                                <option value="delivered">{lang === 'ar' ? 'تم التسليم والتحصيل' : 'Delivered'}</option>
                                <option value="cancelled">{lang === 'ar' ? 'ملغاة' : 'Cancelled'}</option>
                                <option value="blacklisted">{lang === 'ar' ? 'رقم محظور' : 'Blacklist'}</option>
                              </select>
                            </td>

                            {/* WhatsApp Trigger */}
                            <td className="py-3.5 px-4 text-right rtl:text-left">
                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#20BE5A] text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>{lang === 'ar' ? 'تأكيد واتساب بنقرة واحدة' : 'WhatsApp 1-Click'}</span>
                              </a>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INVENTORY & BATCH FRESHNESS */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-6">
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Inventory & Expiration Date Management
              </h3>
              <p className="text-xs text-stone-500 font-sans">
                Real-time stock alerts per shade, production batch numbers, and climate stability monitoring.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 rounded-2xl border border-stone-200 bg-[#FAF7F5] space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                        {prod.category}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-stone-900 line-clamp-1">
                        {lang === 'ar' ? prod.nameAr || prod.name : prod.name}
                      </h4>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        prod.stockCount < 20
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {prod.stockCount} in stock
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-stone-600 font-mono">
                    <div className="flex justify-between">
                      <span>Batch:</span>
                      <span className="text-stone-900 font-bold">{prod.batchNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expiration:</span>
                      <span className="text-emerald-700 font-bold">{prod.expirationDate}</span>
                    </div>
                  </div>

                  {prod.shades && (
                    <div className="pt-2 border-t border-stone-200">
                      <span className="text-[10px] text-stone-500 block mb-1">
                        Variants ({prod.shades.length} shades):
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {prod.shades.slice(0, 8).map((sh) => (
                          <div
                            key={sh.id}
                            title={sh.name}
                            className="w-4 h-4 rounded-full border border-black/10 shadow-2xs"
                            style={{ backgroundColor: sh.hex }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: COURIER DISPATCH HUB */}
        {activeTab === 'courier' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Yalidine & ZR Express Logistics Manifest
                </h3>
                <p className="text-xs text-stone-500 font-sans">
                  Generate courier bordereaux, pickup slips, and tracking barcodes for confirmed COD parcels.
                </p>
              </div>

              <button
                onClick={handleExportCSV}
                className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Daily Courier Manifest (.CSV)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#FAF7F5] border border-stone-200 space-y-2">
                <span className="text-xs font-semibold text-stone-700 block">Hub Alger Central</span>
                <p className="text-[11px] text-stone-500 font-mono">Daily pickup schedule: 16:30</p>
                <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Scheduled for pickup
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F5] border border-stone-200 space-y-2">
                <span className="text-xs font-semibold text-stone-700 block">Yalidine API Sync</span>
                <p className="text-[11px] text-stone-500 font-mono">Status: Connected (Webhook Active)</p>
                <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Live Barcode Sync
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F5] border border-stone-200 space-y-2">
                <span className="text-xs font-semibold text-stone-700 block">Anti-RTO Protocol</span>
                <p className="text-[11px] text-stone-500 font-mono">100% WhatsApp phone pre-validation</p>
                <span className="inline-block text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  98.4% Delivery Success
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. Product Add / Edit Modal Drawer */}
      <ProductEditorModal
        isOpen={isProductEditorOpen}
        onClose={() => {
          setIsProductEditorOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        productToEdit={editingProduct}
      />

      {/* 4. Delete Confirmation Dialog */}
      {deleteConfirmProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-stone-900">
                  {lang === 'ar' ? 'تأكيد حذف المنتج' : 'Delete Product Confirmation'}
                </h3>
                <p className="text-xs text-stone-500">
                  {lang === 'ar'
                    ? 'هل أنت متأكد من رغبتك في حذف هذا المنتج نهائياً من المتجر؟'
                    : 'Are you sure you want to permanently remove this product from the boutique?'}
                </p>
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-3">
              <div className="w-12 h-14 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-white">
                <ProductVisual product={deleteConfirmProduct} className="w-full h-full scale-75" />
              </div>
              <div className="min-w-0">
                <span className="font-serif font-bold text-xs text-stone-900 block truncate">
                  {lang === 'ar' ? deleteConfirmProduct.nameAr || deleteConfirmProduct.name : deleteConfirmProduct.name}
                </span>
                <span className="text-[10px] text-stone-500 font-mono block">
                  {deleteConfirmProduct.category} · {formatPrice(deleteConfirmProduct.priceDZD, deleteConfirmProduct.priceUSD)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmProduct(null)}
                className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 cursor-pointer"
              >
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                {lang === 'ar' ? 'نعم، احذف المنتج' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Change Security PIN Modal */}
      {isChangePinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="bg-[#1C1917] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-4 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-base flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#C87D65]" />
                <span>{lang === 'ar' ? 'تغيير رمز الأمان للوحة' : 'Change Security PIN'}</span>
              </h3>
              <button
                onClick={() => setIsChangePinModalOpen(false)}
                className="text-stone-400 hover:text-white text-sm cursor-pointer p-1"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-stone-400">
              {lang === 'ar'
                ? 'أدخل الرمز السري الجديد (4 خانات على الأقل):'
                : 'Enter your new PIN (at least 4 characters):'}
            </p>
            <form onSubmit={handleUpdatePin} className="space-y-4">
              <input
                type="password"
                autoFocus
                value={newPinInput}
                onChange={(e) => setNewPinInput(e.target.value)}
                placeholder="••••"
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-center text-xl font-mono focus:border-[#C87D65] focus:outline-none text-white"
              />
              {pinChangeSuccessMsg && (
                <p className="text-xs text-emerald-400 text-center flex items-center justify-center gap-1 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'تم حفظ الرمز الجديد بنجاح!' : 'PIN updated successfully!'}</span>
                </p>
              )}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsChangePinModalOpen(false)}
                  className="w-1/2 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={newPinInput.trim().length < 4}
                  className="w-1/2 py-2 px-3 rounded-xl bg-[#C87D65] hover:bg-[#B36B54] disabled:opacity-50 text-white text-xs font-medium cursor-pointer"
                >
                  {lang === 'ar' ? 'حفظ الرمز' : 'Save PIN'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
