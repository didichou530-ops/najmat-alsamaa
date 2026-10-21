import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppRoute =
  | { path: '/' }
  | { path: '/admin' }
  | { path: '/track'; orderId?: string }
  | { path: '/product'; productId: string }
  | { path: '/quiz' };

interface RouterContextType {
  route: string;
  params: Record<string, string>;
  navigate: (to: string) => void;
  isAdmin: boolean;
  isAdminDomain: boolean;
  storeDomainUrl: string;
  adminDomainUrl: string;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

/**
 * Checks whether the current hostname corresponds to the Admin / Control Panel domain.
 * Supports:
 * - admin.yourdomain.com
 * - dashboard.yourdomain.com
 * - panel.yourdomain.com
 * - admin-najmatalsamaa.vercel.app / najmatalsamaa-admin.vercel.app
 * - admin-najmatalsamaa.netlify.app
 * - admin.localhost or localhost with admin port
 */
export function isCurrentHostAdmin(): boolean {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname.toLowerCase();
  
  return (
    host.startsWith('admin.') ||
    host.startsWith('dashboard.') ||
    host.startsWith('panel.') ||
    host.startsWith('control.') ||
    host.startsWith('admin-') ||
    host.includes('-admin.') ||
    host.endsWith('-admin') ||
    host === 'admin'
  );
}

function parseLocation(
  hash: string = window.location.hash,
  pathname: string = window.location.pathname
): { route: string; params: Record<string, string> } {
  const isAdminHost = isCurrentHostAdmin();

  // 1. Direct pathname detection (e.g., https://domain.com/admin)
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return { route: '/admin', params: {} };
  }

  const clean = hash.replace(/^#\/?/, '').trim();

  // 2. Explicit Storefront hash routes (#/store, #/shop, #/boutique)
  if (clean === 'store' || clean === 'shop' || clean === 'boutique') {
    return { route: '/', params: {} };
  }

  // 3. Explicit Admin hash route (#/admin)
  if (clean === 'admin') {
    return { route: '/admin', params: {} };
  }

  // 4. Subpaths in hash (#/product/123, #/track/ORD-456, #/quiz)
  const parts = clean.split('/').filter(Boolean);
  const root = parts[0] ? `/${parts[0]}` : '';

  if (root === '/admin') {
    return { route: '/admin', params: {} };
  }

  if (root === '/store' || root === '/shop') {
    return { route: '/', params: {} };
  }

  if (root === '/track') {
    return {
      route: '/track',
      params: parts[1] ? { orderId: parts[1] } : {}
    };
  }

  if (root === '/product') {
    return {
      route: '/product',
      params: parts[1] ? { productId: parts[1] } : {}
    };
  }

  if (root === '/quiz') {
    return { route: '/quiz', params: {} };
  }

  // 5. If accessed via the Admin Subdomain (e.g. admin.najmatalsamaa.com)
  // Default directly to the Admin Portal!
  if (isAdminHost) {
    return { route: '/admin', params: {} };
  }

  // 6. Default for the Main Store Domain (e.g. najmatalsamaa.com / www.najmatalsamaa.com):
  // Show the luxury storefront & products to customers!
  return { route: '/', params: {} };
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [current, setCurrent] = useState(() => {
    return parseLocation(window.location.hash, window.location.pathname);
  });

  useEffect(() => {
    const handleNavigationChange = () => {
      setCurrent(parseLocation(window.location.hash, window.location.pathname));
    };

    window.addEventListener('hashchange', handleNavigationChange);
    window.addEventListener('popstate', handleNavigationChange);
    return () => {
      window.removeEventListener('hashchange', handleNavigationChange);
      window.removeEventListener('popstate', handleNavigationChange);
    };
  }, []);

  const navigate = (to: string) => {
    const normalized = to === '/' ? '/store' : to;
    const targetHash = normalized.startsWith('#')
      ? normalized
      : `#${normalized.startsWith('/') ? normalized : '/' + normalized}`;
    
    window.location.hash = targetHash;
    setCurrent(parseLocation(targetHash, window.location.pathname));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAdminDomain = isCurrentHostAdmin();
  const isAdmin = current.route === '/admin';

  // Calculate base domains dynamically for smooth cross-domain links
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const port = typeof window !== 'undefined' && window.location.port ? `:${window.location.port}` : '';
  const protocol = typeof window !== 'undefined' ? window.location.protocol : 'https:';

  // Base domain stripped of 'admin.' or 'www.'
  const rootDomain = hostname.replace(/^(admin\.|dashboard\.|panel\.|control\.|www\.)/i, '');
  const storeDomainUrl = `${protocol}//${rootDomain}${port}`;
  const adminDomainUrl = `${protocol}//admin.${rootDomain}${port}`;

  return (
    <RouterContext.Provider
      value={{
        route: current.route,
        params: current.params,
        navigate,
        isAdmin,
        isAdminDomain,
        storeDomainUrl,
        adminDomainUrl
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
};

