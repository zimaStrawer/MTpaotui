const IMAGE_PRELOAD_TIMEOUT_MS = 1_500;

export type AssetGroupName =
  | 'homeExpress'
  | 'itemDetail'
  | 'orderConfirm'
  | 'trackingCritical';

export type PreloadStatus = 'loaded' | 'error' | 'timeout' | 'unsupported';

export interface PreloadResult {
  url: string;
  status: PreloadStatus;
}

interface AssetGroupModule {
  default: readonly string[];
}

const assetGroupLoaders: Record<
  AssetGroupName,
  () => Promise<AssetGroupModule>
> = {
  homeExpress: () => import('./asset-groups/home-express'),
  itemDetail: () => import('./asset-groups/item-detail'),
  orderConfirm: () => import('./asset-groups/order-confirm'),
  trackingCritical: () => import('./asset-groups/tracking-critical'),
};

const assetGroupPromiseCache = new Map<
  AssetGroupName,
  Promise<AssetGroupModule>
>();

const imagePromiseCache = new Map<string, Promise<PreloadResult>>();

function preloadImage(url: string): Promise<PreloadResult> {
  const cached = imagePromiseCache.get(url);
  if (cached) return cached;

  if (typeof Image === 'undefined') {
    return Promise.resolve({ url, status: 'unsupported' });
  }

  const promise = new Promise<PreloadResult>((resolve) => {
    const image = new Image();
    let settled = false;

    const finish = (status: PreloadStatus) => {
      if (settled) return;
      settled = true;
      globalThis.clearTimeout(timeout);
      image.onload = null;
      image.onerror = null;
      resolve({ url, status });
    };

    const finishLoaded = async () => {
      try {
        await image.decode?.();
      } catch {
        // Safari 对部分已加载 SVG 的 decode 会拒绝；naturalWidth 才是最终依据。
      }
      finish(image.naturalWidth > 0 ? 'loaded' : 'error');
    };

    const timeout = globalThis.setTimeout(
      () => finish('timeout'),
      IMAGE_PRELOAD_TIMEOUT_MS,
    );

    image.decoding = 'async';
    image.onload = () => void finishLoaded();
    image.onerror = () => finish('error');
    image.src = url;

    if (image.complete) void finishLoaded();
  });

  imagePromiseCache.set(url, promise);
  void promise.then((result) => {
    if (result.status !== 'loaded') imagePromiseCache.delete(url);
  });
  return promise;
}

/** 预请求并解码图片；相同 URL 在成功后始终复用同一结果。 */
export function preloadImages(urls: readonly string[]): Promise<PreloadResult[]> {
  return Promise.all(urls.map(preloadImage));
}

/** 只允许页面引用统一资源组，避免各处维护零散 URL 清单。 */
export function preloadAssetGroup(
  groupName: AssetGroupName,
): Promise<PreloadResult[]> {
  let groupPromise = assetGroupPromiseCache.get(groupName);
  if (!groupPromise) {
    groupPromise = assetGroupLoaders[groupName]();
    assetGroupPromiseCache.set(groupName, groupPromise);
  }

  return groupPromise
    .then((module) => preloadImages(module.default))
    .catch(() => {
      assetGroupPromiseCache.delete(groupName);
      return [];
    });
}

interface RouteModules {
  home: typeof import('../pages/home/HomePage');
  address: typeof import('../pages/address/AddressPage');
  itemInfo: typeof import('../pages/item-info/ItemInfoPage');
  orderConfirm: typeof import('../pages/order-confirm/OrderConfirmPage');
  tracking: typeof import('../pages/tracking/TrackingPage');
}

export type RouteId = keyof RouteModules;

const rawRouteLoaders: {
  [Route in RouteId]: () => Promise<RouteModules[Route]>;
} = {
  home: () => import('../pages/home/HomePage'),
  address: () => import('../pages/address/AddressPage'),
  itemInfo: () => import('../pages/item-info/ItemInfoPage'),
  orderConfirm: () => import('../pages/order-confirm/OrderConfirmPage'),
  tracking: () => import('../pages/tracking/TrackingPage'),
};

const routePromiseCache = new Map<RouteId, Promise<unknown>>();

/** 路由渲染与提前预取共用同一份动态导入 Promise。 */
export function loadRoute<Route extends RouteId>(
  routeId: Route,
): Promise<RouteModules[Route]> {
  const cached = routePromiseCache.get(routeId) as
    | Promise<RouteModules[Route]>
    | undefined;
  if (cached) return cached;

  const promise = rawRouteLoaders[routeId]();
  routePromiseCache.set(routeId, promise);
  void promise.catch(() => {
    routePromiseCache.delete(routeId);
  });
  return promise;
}

/** 预取失败不应阻断当前页面；真正导航时仍会再次尝试加载。 */
export async function preloadRoute(routeId: RouteId): Promise<void> {
  try {
    await loadRoute(routeId);
  } catch {
    // 网络错误由路由的 Suspense / ErrorBoundary 在真正导航时处理。
  }
}
