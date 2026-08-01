import { RouterProvider } from 'react-router';

import { resolveServiceVisualTheme } from '../design-tokens/service-theme';
import { useOrderDraftStore } from '../store/order-draft-store';
import { AppErrorBoundary } from './AppErrorBoundary';
import { router } from './router';

export function App() {
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
