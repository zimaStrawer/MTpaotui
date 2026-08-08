import { lazy, Suspense } from 'react';

import { loadRoute } from '../lib/asset-preloader';

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
