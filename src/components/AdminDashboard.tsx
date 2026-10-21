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
  Layers
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { OrderStatus, Order } from '../types';
import { LUXURY_PRODUCTS } from '../data/products';
import { WILAYAS_LIST } from '../data/regions';

export const AdminDashboard: React.FC = () => {
  const { orders, updateOrderStatus, deleteOrder, createOrder, setCurrentTab } = useShop();
  const { lang, formatPrice, isRtl, t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'queue' | 'inventory'>('queue');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Status options for call center
  const STATUS_LIST: { id: OrderStatus; label: string; color: string } = [
    { id: 'new', label: t('orderStatusNew'), color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { id: 'confirmed', label: t('orderStatusConfirmed'), color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { id: 'no_answer_1', label: t('orderStatusNoAnswer1'), color: 'bg-amber-100 text-amber-800 border-amber-200' },
    { id: 'no_answer_2', label: t('orderStatusNoAnswer2'), color: 'bg-amber-200 text-amber-900 border-amber-300' },
    { id: 'packed', label: t('orderStatusPacked'), color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { id: 'shipped', label: t('orderStatusShipped'), color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
    { id: 'delivered', label: t('orderStatusDelivered'), color: 'bg-green-100 text-green-800 border-green-200' },
    { id: 'cancelled', label: t('orderStatusCancelled'), color: 'bg-stone-200 text-stone-700 border-stone-300' },
    { id: 'blacklisted', label: t('orderStatusBlacklisted'), color: 'bg-red-100 text-red-800 border-red-200' }
  ] as any;

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

  // Simulate creating a new realistic order to test call-center workflows
  const handleAddSimulatedOrder = () => {
    const names = ['Lina Mansouri', 'Karim Haddad', 'Sarah Dahmani', 'Ryad Belkacem'];
    const wilayas = [WILAYAS_LIST[0], WILAYAS_LIST[1], WILAYAS_LIST[2], WILAYAS_LIST[3]];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomWilaya = wilayas[Math.floor(Math.random() * wilayas.length)];
    const randomPhone = `055${Math.floor(1000000 + Math.random() * 9000000)}`;

    createOrder({
      customerName: randomName,
      phone: randomPhone,
      wilayaCode: randomWilaya.code,
      commune: randomWilaya.communes[0],
      address: 'Avenue de la Liberté, No 23',
      deliveryType: Math.random() > 0.5 ? 'home' : 'desk',
      paymentMethod: 'cod',
      singleProductItem: {
        product: LUXURY_PRODUCTS[0],
        shade: LUXURY_PRODUCTS[0].shades![3],
        quantity: 1
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Return to shop */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentTab('catalog')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
          <span>Back to Storefront</span>
        </button>
        <span className="text-xs font-mono text-[#C87D65] font-semibold">
          NAJMAT AL SAMAA Merchant Portal · COD Operations
        </span>
      </div>

      {/* Title & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">
            {t('adminTitle')}
          </h1>
          <p className="text-xs text-stone-500 font-sans mt-0.5">
            {t('adminSubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleAddSimulatedOrder}
            className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t('addMockOrder')}</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-xl bg-[#1C1917] hover:bg-[#2C2724] text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t('exportCourierCsv')}</span>
          </button>
        </div>
      </div>

      {/* Tabs (Confirmation Queue vs Inventory & Expiration Tracking) */}
      <div className="flex items-center gap-2 border-b border-stone-200">
        <button
          onClick={() => setActiveTab('queue')}
          className={`pb-3 px-2 text-xs font-semibold font-sans tracking-wide transition-colors relative ${
            activeTab === 'queue'
              ? 'text-stone-900 border-b-2 border-[#1C1917]'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          Call-Center Confirmation Queue ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`pb-3 px-2 text-xs font-semibold font-sans tracking-wide transition-colors relative ${
            activeTab === 'inventory'
              ? 'text-stone-900 border-b-2 border-[#1C1917]'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          Inventory & Batch Expiration Monitor
        </button>
      </div>

      {/* TAB 1: CALL CENTER QUEUE */}
      {activeTab === 'queue' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-stone-200 shadow-xs">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ID, Customer or Phone..."
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

          {/* Dedicated Orders Table */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F5] border-b border-stone-200/90 text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4">Ref & Date</th>
                    <th className="py-3.5 px-4">Customer & Phone</th>
                    <th className="py-3.5 px-4">Wilaya / Commune</th>
                    <th className="py-3.5 px-4">Cart Items</th>
                    <th className="py-3.5 px-4">Amount (COD)</th>
                    <th className="py-3.5 px-4">Call-Center Status</th>
                    <th className="py-3.5 px-4 text-right">Instant Trigger</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-sans">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-stone-400 font-serif italic">
                        No orders found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => {
                      const whatsappText = encodeURIComponent(
                        `Bonjour ${ord.customerName}! Najmat Al Samaa vous contacte concernant votre commande ${ord.id} (${ord.total} DZD). Est-ce bien confirmé pour l'expédition vers ${ord.wilayaName}?`
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

                          {/* Wilaya */}
                          <td className="py-3.5 px-4">
                            <span className="font-medium text-stone-900 block truncate max-w-[140px]">
                              {ord.wilayaName}
                            </span>
                            <span className="text-[11px] text-stone-500">
                              {ord.commune} · ({ord.deliveryType})
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

                          {/* Total */}
                          <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                            {formatPrice(ord.total, ord.total / 135)}
                          </td>

                          {/* Status Dropdown */}
                          <td className="py-3.5 px-4">
                            <select
                              value={ord.status}
                              onChange={(e) =>
                                updateOrderStatus(ord.id, e.target.value as OrderStatus)
                              }
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border focus:outline-none ${
                                ord.status === 'confirmed'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : ord.status === 'new'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : ord.status === 'shipped'
                                  ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                                  : 'bg-stone-100 text-stone-800 border-stone-200'
                              }`}
                            >
                              <option value="new">New (A Confirmer)</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="no_answer_1">No Answer (1st)</option>
                              <option value="no_answer_2">No Answer (2nd)</option>
                              <option value="packed">Packed</option>
                              <option value="shipped">Shipped (Yalidine)</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                              <option value="blacklisted">Blacklist</option>
                            </select>
                          </td>

                          {/* WhatsApp Trigger */}
                          <td className="py-3.5 px-4 text-right">
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#20BE5A] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
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

      {/* TAB 2: INVENTORY & BATCH EXPIRATION MONITOR */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Batch & Skincare Expiration Tracker
              </h3>
              <p className="text-xs text-stone-500 font-sans">
                Monitor stock levels per shade, batch numbers, and alert flags to guarantee product freshness.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {LUXURY_PRODUCTS.map((prod) => (
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
                      {prod.name}
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
                    <span>Batch No:</span>
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
                          className="w-4 h-4 rounded-full border border-black/10 shadow-xs"
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
    </div>
  );
};
