import { lazy, Suspense, useEffect, useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router';

import { AppShell } from '../components/AppShell';
import { loadRoute } from '../lib/asset-preloader';
import { resetRouteScroll } from './route-scroll';

export const HomePage = lazy(() =>
  loadRoute('home').then((module) => ({ default: module.HomePage })),
);

export const AddressPage = lazy(() =>
  loadRoute('address').then((module) => ({ default: module.AddressPage })),
);

export const ItemInfoPage = lazy(() =>
  loadRoute('itemInfo').then((module) => ({ default: module.ItemInfoPage })),
);

export const OrderConfirmPage = lazy(() =>
  loadRoute('orderConfirm').then((module) => ({
    default: module.OrderConfirmPage,
  })),
);

export const TrackingPage = lazy(() =>
  loadRoute('tracking').then((module) => ({ default: module.TrackingPage })),
);

function PageFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-blue-500" />
    </div>
  );
}

export function RouteSuspense({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageFallback />}>{children}</Suspense>;
}

/** 所有业务路由共享的视口规则：关闭浏览器恢复并在每次导航时回顶。 */
export function RouteViewport() {
  const location = useLocation();

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    resetRouteScroll();
  }, [location.key]);

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
