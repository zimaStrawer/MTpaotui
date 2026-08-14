import { ShowcaseLayout } from '../showcase/ShowcaseLayout';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { AppRuntime } from './AppRuntime';
import { DIRECT_APP_QUERY, isEmbeddedPreview } from './runtime-mode';

export function App() {
  const isDirectAppViewport = useMediaQuery(DIRECT_APP_QUERY);

  if (isEmbeddedPreview() || isDirectAppViewport) {
    return <AppRuntime />;
  }

  return <ShowcaseLayout />;
}
