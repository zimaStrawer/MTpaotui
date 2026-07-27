import { createBrowserRouter } from 'react-router';

import { AddressPage } from '../pages/address/AddressPage';
import { HomePage } from '../pages/home/HomePage';
import { ItemInfoPage } from '../pages/item-info/ItemInfoPage';
import { OrderConfirmPage } from '../pages/order-confirm/OrderConfirmPage';
import { TrackingPage } from '../pages/tracking/TrackingPage';

/**
 * 路由实现见 tech.md §2:多个 Figma frame → 5 个路由。
 * 同一屏幕的多个 frame = 一个路由 + 一个状态字段。
 */
export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/address/:role', element: <AddressPage /> },
  { path: '/item-info', element: <ItemInfoPage /> },
  { path: '/order-confirm', element: <OrderConfirmPage /> },
  { path: '/tracking', element: <TrackingPage /> },
]);
