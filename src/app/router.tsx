import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router';

/**
 * 路由实现见 tech.md §2:多个 Figma frame → 5 个路由。
 * 同一屏幕的多个 frame = 一个路由 + 一个状态字段。
 *
 * 全部页面改为 React.lazy 按需加载，避免 5 个页面（含各自内联图片资源）
 * 全部打进首屏 bundle，降低移动端首屏 JS 解析成本。
 */
const HomePage = lazy(() =>
  import('../pages/home/HomePage').then((m) => ({ default: m.HomePage }))
);
const AddressPage = lazy(() =>
  import('../pages/address/AddressPage').then((m) => ({ default: m.AddressPage }))
);
const ItemInfoPage = lazy(() =>
  import('../pages/item-info/ItemInfoPage').then((m) => ({ default: m.ItemInfoPage }))
);
const OrderConfirmPage = lazy(() =>
  import('../pages/order-confirm/OrderConfirmPage').then((m) => ({ default: m.OrderConfirmPage }))
);
const TrackingPage = lazy(() =>
  import('../pages/tracking/TrackingPage').then((m) => ({ default: m.TrackingPage }))
);

function PageFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-blue-500" />
    </div>
  );
}

function withSuspense(node: React.ReactNode) {
  return <Suspense fallback={<PageFallback />}>{node}</Suspense>;
}

export const router = createBrowserRouter([
  { path: '/', element: withSuspense(<HomePage />) },
  { path: '/address/:role', element: withSuspense(<AddressPage />) },
  { path: '/item-info', element: withSuspense(<ItemInfoPage />) },
  { path: '/order-confirm', element: withSuspense(<OrderConfirmPage />) },
  { path: '/tracking', element: withSuspense(<TrackingPage />) },
]);
