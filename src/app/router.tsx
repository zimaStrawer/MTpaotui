import { createBrowserRouter } from 'react-router';

import {
  AddressPage,
  HomePage,
  ItemInfoPage,
  OrderConfirmPage,
  RouteSuspense,
  TrackingPage,
} from './RouteElements';

/**
 * 路由实现见 tech.md §2:多个 Figma frame → 5 个路由。
 * 同一屏幕的多个 frame = 一个路由 + 一个状态字段。
 *
 * 全部页面改为 React.lazy 按需加载，避免 5 个页面（含各自内联图片资源）
 * 全部打进首屏 bundle，降低移动端首屏 JS 解析成本。
 */
function withSuspense(node: React.ReactNode) {
  return <RouteSuspense>{node}</RouteSuspense>;
}

export const router = createBrowserRouter([
  { path: '/', element: withSuspense(<HomePage />) },
  { path: '/address/:role', element: withSuspense(<AddressPage />) },
  { path: '/item-info', element: withSuspense(<ItemInfoPage />) },
  { path: '/order-confirm', element: withSuspense(<OrderConfirmPage />) },
  { path: '/tracking', element: withSuspense(<TrackingPage />) },
]);
