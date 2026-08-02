import { RouterProvider } from 'react-router';

import { resolveServiceVisualTheme } from '../design-tokens/service-theme';
import { useOrderDraftStore } from '../store/order-draft-store';
import { AppErrorBoundary } from './AppErrorBoundary';
import { router } from './router';

/** 业务 App 的独立运行入口，供移动端直出和 Showcase iframe 复用。 */
export function AppRuntime() {
  const serviceMode = useOrderDraftStore((state) => state.serviceMode);
  const serviceTheme = resolveServiceVisualTheme(serviceMode);

  return (
    <div data-service-theme={serviceTheme}>
      <AppErrorBoundary>
        <RouterProvider router={router} />
      </AppErrorBoundary>
    </div>
  );
}
