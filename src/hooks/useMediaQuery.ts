import { useEffect, useState } from 'react';

/** 订阅媒体查询变化，避免各组件重复维护 matchMedia 监听器。 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const syncMatches = () => setMatches(mediaQuery.matches);

    syncMatches();
    mediaQuery.addEventListener('change', syncMatches);
    return () => mediaQuery.removeEventListener('change', syncMatches);
  }, [query]);

  return matches;
}
