import { useEffect, useState } from 'react';

import { ShowcaseLayout } from '../showcase/ShowcaseLayout';
import { AppRuntime } from './AppRuntime';

const DIRECT_APP_QUERY = '(max-width: 599px)';

function isEmbeddedApp() {
  return new URLSearchParams(window.location.search).get('embed') === '1';
}

export function App() {
  const [isDirectAppViewport, setIsDirectAppViewport] = useState(() =>
    window.matchMedia(DIRECT_APP_QUERY).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(DIRECT_APP_QUERY);
    const updateViewportMode = () => {
      setIsDirectAppViewport(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', updateViewportMode);
    return () => {
      mediaQuery.removeEventListener('change', updateViewportMode);
    };
  }, []);

  if (isEmbeddedApp() || isDirectAppViewport) {
    return <AppRuntime />;
  }

  return <ShowcaseLayout />;
}
