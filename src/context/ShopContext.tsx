import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Shade, Order, OrderStatus } from '../types';
import { LUXURY_PRODUCTS } from '../data/products';
import { FREE_SAMPLES_LIST, WILAYAS_LIST } from '../data/regions';

export const FREE_SHIPPING_THRESHOLD_DZD = 8000;
export const FREE_SHIPPING_THRESHOLD_USD = 60;

interface ShopContextType {
  cart: CartItem[];
  selectedSamples: string[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity?: number, shade?: Shade) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  toggleSample: (sampleId: string) => void;
  clearCart: () => void;

  subtotalDZD: number;
  subtotalUSD: number;
  cartCount: number;
  isFreeShipping: boolean;
  shippingRemainingDZD: number;
  shippingRemainingUSD: number;
  shippingProgressPercent: number;

  orders: Order[];
  createOrder: (orderPayload: {
    customerName: string;
    phone: string;
    wilayaCode: string;
    commune: string;
    address: string;
    deliveryType: 'home' | 'desk';
    paymentMethod: 'cod' | 'card';
    notes?: string;
    singleProductItem?: { product: Product; shade?: Shade; quantity: number };
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, reason?: string) => void;
  deleteOrder: (orderId: string) => void;
  findOrder: (orderId: string, phone: string) => Order | undefined;

  activeProduct: Product | null;
  setActiveProduct: (p: Product | null) => void;

  isCheckoutOpen: boolean;
  openCheckout: (directProduct?: { product: Product; shade?: Shade }) => void;
  closeCheckout: () => void;
  directCheckoutItem: { product: Product; shade?: Shade } | null;

  isQuizOpen: boolean;
  openQuiz: () => void;
  closeQuiz: () => void;

  currentTab: 'catalog' | 'tracking' | 'admin';
  setCurrentTab: (tab: 'catalog' | 'tracking' | 'admin') => void;

  completedOrder: Order | null;
  setCompletedOrder: (order: Order | null) => void;

  // Loyalty Nour Points
  nourPoints: number;
  potentialPointsEarned: number;
  isAccountOpen: boolean;
  openAccount: () => void;
  closeAccount: () => void;
  redeemPoints: (cost: number, rewardLabel: string) => boolean;
  redeemedRewards: string[];

  // Dynamic Products & Catalog Management
  products: Product[];
  addProduct: (productData: Omit<Product, 'id'> | Product) => Product;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  resetProductsToDefault: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Initial realistic orders to seed the admin dashboard & order tracking experience
const INITIAL_MOCK_ORDERS: Order[] = [
  {
    id: 'NS-8924',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    customerName: 'Meriem Benali',
    phone: '0554129841',
    wilayaCode: '16',
    wilayaName: '16 - Alger (Algiers)',
    commune: 'Hydra',
    address: 'Résidence Les Pins, Villa 14',
    deliveryType: 'home',
    deliveryFee: 400,
    subtotal: 10200,
    total: 10600,
    currency: 'DZD',
    paymentMethod: 'cod',
    status: 'new',
    selectedSamples: ['sample-1', 'sample-2'],
    items: [
      {
        productId: 'prod-luminous-silk-foundation',
        productName: "L'Éclat Luminous Silk Foundation",
        shadeName: '280 Mediterranean Olive',
        price: 4800,
        quantity: 1
      },
      {
        productId: 'prod-cellular-serum',
        productName: 'Cellular Youth Nectar Serum',
        price: 5400,
        quantity: 1
      }
    ],
    notes: 'Please call before delivery in the afternoon.',
    otpVerified: true,
    trackingHistory: [
      {
        status: 'Order Placed (Cash on Delivery)',
        timestamp: 'Today at 10:30 AM',
        location: 'NAJMAT AL SAMAA Online Boutique'
      },
      {
        status: 'WhatsApp Intent Verified',
        timestamp: 'Today at 10:32 AM',
        location: 'Automated Anti-RTO System'
      }
    ]
  },
  {
    id: 'NS-8890',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    customerName: 'Sofiane Larbi',
    phone: '0661849201',
    wilayaCode: '31',
    wilayaName: '31 - Oran',
    commune: 'Bir El Djir',
    address: 'Boulevard Millenium, Imm C 4',
    deliveryType: 'home',
    deliveryFee: 550,
    subtotal: 10800,
    total: 10800, // free shipping qualified
    currency: 'DZD',
    paymentMethod: 'cod',
    status: 'confirmed',
    selectedSamples: ['sample-3'],
    items: [
      {
        productId: 'prod-iconic-radiance-trio',
        productName: 'The Iconic Radiance Routine Trio',
        price: 10800,
        quantity: 1
      }
    ],
    notes: 'Gift wrapping requested.',
    otpVerified: true,
    trackingHistory: [
      {
        status: 'Order Placed',
        timestamp: 'Yesterday at 04:15 PM',
        location: 'Oran Web Store'
      },
      {
        status: 'Call Center Confirmed with Customer',
        timestamp: 'Yesterday at 05:00 PM',
        location: 'Najmat Al Samaa Central Operations'
      },
      {
        status: 'Packed in Signature Silk Dust Bag',
        timestamp: 'Yesterday at 06:40 PM',
        location: 'Hub Central Alger'
      }
    ]
  },
  {
    id: 'NS-8745',
    createdAt: new Date(Date.now() - 3600000 * 42).toISOString(),
    customerName: 'Sarah Khelifi',
    phone: '0770339912',
    wilayaCode: '25',
    wilayaName: '25 - Constantine',
    commune: 'El Khroub',
    address: 'Cité 500 Logements, Bâtiment 8',
    deliveryType: 'desk',
    deliveryFee: 400,
    subtotal: 4200,
    total: 4600,
    currency: 'DZD',
    paymentMethod: 'cod',
    status: 'shipped',
    selectedSamples: ['sample-1', 'sample-4'],
    items: [
      {
        productId: 'prod-barrier-cream',
        productName: 'Crème Velours Barrier Cream',
        price: 4200,
        quantity: 1
      }
    ],
    otpVerified: true,
    trackingHistory: [
      {
        status: 'Order Confirmed',
        timestamp: '2 days ago',
        location: 'Central Call Center'
      },
      {
        status: 'Handed to Yalidine Courier (Tracking: YAL-948192)',
        timestamp: 'Yesterday at 09:00 AM',
        location: 'Courier Sort Facility Alger'
      },
      {
        status: 'In Transit to Constantine Agency Stop-Desk',
        timestamp: 'Yesterday at 09:30 PM',
        location: 'Transit Regional Nord-Est'
      }
    ]
  }
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mn_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Selected Samples (up to 2)
  const [selectedSamples, setSelectedSamples] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mn_samples');
      return saved ? JSON.parse(saved) : [FREE_SAMPLES_LIST[0].id];
    } catch {
      return [FREE_SAMPLES_LIST[0].id];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [directCheckoutItem, setDirectCheckoutItem] = useState<{
    product: Product;
    shade?: Shade;
  } | null>(null);

  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<'catalog' | 'tracking' | 'admin'>('catalog');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Loyalty Points & VIP Account Modal State
  const [nourPoints, setNourPoints] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('mn_nour_points');
      return saved ? Number(saved) : 480;
    } catch {
      return 480;
    }
  });

  const [redeemedRewards, setRedeemedRewards] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mn_redeemed_rewards');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const openAccount = () => setIsAccountOpen(true);
  const closeAccount = () => setIsAccountOpen(false);

  const redeemPoints = (cost: number, rewardLabel: string): boolean => {
    if (nourPoints >= cost) {
      setNourPoints((prev) => prev - cost);
      setRedeemedRewards((prev) => [...prev, rewardLabel]);
      return true;
    }
    return false;
  };

  useEffect(() => {
    localStorage.setItem('mn_nour_points', String(nourPoints));
  }, [nourPoints]);

  useEffect(() => {
    localStorage.setItem('mn_redeemed_rewards', JSON.stringify(redeemedRewards));
  }, [redeemedRewards]);

  // Products & Catalog state (stored in localStorage)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('mn_products');
      return saved ? JSON.parse(saved) : LUXURY_PRODUCTS;
    } catch {
      return LUXURY_PRODUCTS;
    }
  });

  useEffect(() => {
    localStorage.setItem('mn_products', JSON.stringify(products));
  }, [products]);

  // Orders store
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('mn_orders');
      return saved ? JSON.parse(saved) : INITIAL_MOCK_ORDERS;
    } catch {
      return INITIAL_MOCK_ORDERS;
    }
  });

  useEffect(() => {
    localStorage.setItem('mn_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('mn_samples', JSON.stringify(selectedSamples));
  }, [selectedSamples]);

  useEffect(() => {
    localStorage.setItem('mn_orders', JSON.stringify(orders));
  }, [orders]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openQuiz = () => setIsQuizOpen(true);
  const closeQuiz = () => setIsQuizOpen(false);

  const openCheckout = (directItem?: { product: Product; shade?: Shade }) => {
    if (directItem) {
      setDirectCheckoutItem(directItem);
    } else {
      setDirectCheckoutItem(null);
    }
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    setDirectCheckoutItem(null);
  };

  const addToCart = (product: Product, quantity = 1, shade?: Shade) => {
    setCart((prev) => {
      const itemId = `${product.id}_${shade ? shade.id : 'default'}`;
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          quantity,
          selectedShade: shade
        }
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const toggleSample = (sampleId: string) => {
    setSelectedSamples((prev) => {
      if (prev.includes(sampleId)) {
        return prev.filter((id) => id !== sampleId);
      }
      if (prev.length >= 2) {
        // Replace oldest
        return [prev[1], sampleId];
      }
      return [...prev, sampleId];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const subtotalDZD = cart.reduce((acc, item) => acc + item.product.priceDZD * item.quantity, 0);
  const subtotalUSD = cart.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isFreeShipping = subtotalDZD >= FREE_SHIPPING_THRESHOLD_DZD;
  const shippingRemainingDZD = Math.max(0, FREE_SHIPPING_THRESHOLD_DZD - subtotalDZD);
  const shippingRemainingUSD = Math.max(0, FREE_SHIPPING_THRESHOLD_USD - subtotalUSD);
  const shippingProgressPercent = Math.min(100, Math.round((subtotalDZD / FREE_SHIPPING_THRESHOLD_DZD) * 100));
  const potentialPointsEarned = Math.round(subtotalDZD / 10);

  // Create Order
  const createOrder = (payload: {
    customerName: string;
    phone: string;
    wilayaCode: string;
    commune: string;
    address: string;
    deliveryType: 'home' | 'desk';
    paymentMethod: 'cod' | 'card';
    notes?: string;
    singleProductItem?: { product: Product; shade?: Shade; quantity: number };
  }): Order => {
    const wilaya = WILAYAS_LIST.find((w) => w.code === payload.wilayaCode) || WILAYAS_LIST[0];
    const isSingle = !!payload.singleProductItem;

    const items = isSingle
      ? [
          {
            productId: payload.singleProductItem!.product.id,
            productName: payload.singleProductItem!.product.name,
            shadeName: payload.singleProductItem!.shade?.name,
            price: payload.singleProductItem!.product.priceDZD,
            quantity: payload.singleProductItem!.quantity
          }
        ]
      : cart.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          shadeName: item.selectedShade?.name,
          price: item.product.priceDZD,
          quantity: item.quantity
        }));

    const orderSubtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const freeDeliveryUnlocked = orderSubtotal >= FREE_SHIPPING_THRESHOLD_DZD;

    const baseDeliveryFee =
      payload.deliveryType === 'desk' ? wilaya.deskDeliveryFee : wilaya.homeDeliveryFee;
    const deliveryFee = freeDeliveryUnlocked ? 0 : baseDeliveryFee;
    const total = orderSubtotal + deliveryFee;

    const newOrderNumber = `NS-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: newOrderNumber,
      createdAt: new Date().toISOString(),
      customerName: payload.customerName,
      phone: payload.phone,
      wilayaCode: wilaya.code,
      wilayaName: wilaya.name,
      commune: payload.commune,
      address: payload.address,
      deliveryType: payload.deliveryType,
      deliveryFee,
      subtotal: orderSubtotal,
      total,
      currency: 'DZD',
      paymentMethod: payload.paymentMethod,
      status: 'new',
      selectedSamples: [...selectedSamples],
      items,
      notes: payload.notes,
      otpVerified: false,
      trackingHistory: [
        {
          status: 'Order Placed (Cash on Delivery)',
          timestamp: 'Just now',
          location: 'NAJMAT AL SAMAA Online Boutique'
        },
        {
          status: 'Assigned to Call-Center Confirmation Queue',
          timestamp: 'Just now',
          location: 'Algiers Dispatch Facility'
        }
      ]
    };

    const earnedPoints = Math.round(orderSubtotal / 10);
    setNourPoints((prev) => prev + earnedPoints);

    setOrders((prev) => [newOrder, ...prev]);
    if (!isSingle) {
      clearCart();
    }
    setCompletedOrder(newOrder);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, reason?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        const statusDescriptions: Record<OrderStatus, string> = {
          new: 'Order registered in confirmation queue',
          confirmed: 'Customer confirmed details via phone / WhatsApp',
          no_answer_1: 'Call attempt 1: Customer did not answer',
          no_answer_2: 'Call attempt 2: Customer unreachable',
          packed: 'Order packed in signature dust bag & stamped',
          shipped: 'Handed over to carrier courier (Yalidine Express)',
          delivered: 'Delivered to customer & cash collected',
          cancelled: reason ? `Order cancelled: ${reason}` : 'Order cancelled by customer',
          blacklisted: 'Phone number flagged for recurrent refusal'
        };

        const newLog = {
          status: statusDescriptions[status],
          timestamp: 'Just now',
          location: 'NAJMAT AL SAMAA Operations'
        };

        return {
          ...ord,
          status,
          trackingHistory: [...ord.trackingHistory, newLog]
        };
      })
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== orderId));
  };

  const findOrder = (orderId: string, phone: string) => {
    const cleanId = orderId.trim().toUpperCase();
    const cleanPhone = phone.trim().replace(/\s+/g, '');
    return orders.find(
      (ord) =>
        ord.id.toUpperCase() === cleanId &&
        (ord.phone.includes(cleanPhone) || cleanPhone.includes(ord.phone))
    );
  };

  const addProduct = (productData: Omit<Product, 'id'> | Product): Product => {
    const newId = 'id' in productData && productData.id ? productData.id : `prod-${Date.now()}`;
    const newProduct: Product = {
      ...productData,
      id: newId,
      nameFr: productData.nameFr || productData.name,
      nameAr: productData.nameAr || productData.name,
      taglineFr: productData.taglineFr || productData.tagline,
      taglineAr: productData.taglineAr || productData.tagline,
      descriptionFr: productData.descriptionFr || productData.description,
      descriptionAr: productData.descriptionAr || productData.description,
      rating: productData.rating || 5.0,
      reviewCount: productData.reviewCount || 1,
      skinTypes: productData.skinTypes?.length ? productData.skinTypes : ['normal', 'combination'],
      concerns: productData.concerns?.length ? productData.concerns : ['hydration'],
      isVegan: productData.isVegan ?? true,
      isParabenFree: productData.isParabenFree ?? true,
      isCrueltyFree: productData.isCrueltyFree ?? true,
      volume: productData.volume || '50 ml',
      stockCount: Number(productData.stockCount) || 25,
      batchNumber: productData.batchNumber || `NS-25${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
      expirationDate: productData.expirationDate || '2027-12-31',
      bgGradient: productData.bgGradient || 'from-[#F7ECE4] to-[#EBD5C8]',
      accentColor: productData.accentColor || '#C87D65',
      ingredients: productData.ingredients?.length ? productData.ingredients : ['Aqua', 'Botanical Extracts', 'Vitamin E'],
      keyActives: productData.keyActives || [],
      howToUse: productData.howToUse || [],
      shades: productData.shades || [],
      reviews: productData.reviews || []
    };

    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        const updated = { ...p, ...updates };
        if (activeProduct && activeProduct.id === productId) {
          setActiveProduct(updated);
        }
        return updated;
      })
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    if (activeProduct && activeProduct.id === productId) {
      setActiveProduct(null);
    }
  };

  const resetProductsToDefault = () => {
    setProducts(LUXURY_PRODUCTS);
    localStorage.setItem('mn_products', JSON.stringify(LUXURY_PRODUCTS));
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        selectedSamples,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleSample,
        clearCart,
        subtotalDZD,
        subtotalUSD,
        cartCount,
        isFreeShipping,
        shippingRemainingDZD,
        shippingRemainingUSD,
        shippingProgressPercent,
        orders,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        findOrder,
        activeProduct,
        setActiveProduct,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        directCheckoutItem,
        isQuizOpen,
        openQuiz,
        closeQuiz,
        currentTab,
        setCurrentTab,
        completedOrder,
        setCompletedOrder,
        nourPoints,
        potentialPointsEarned,
        isAccountOpen,
        openAccount,
        closeAccount,
        redeemPoints,
        redeemedRewards,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used within ShopProvider');
  return ctx;
};
