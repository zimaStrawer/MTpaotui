import { useCallback, useEffect, useState } from 'react';

export interface TransientNotice {
  id: number;
  message: string;
}

const DEFAULT_NOTICE_DURATION_MS = 3_000;

/** 页面级轻提示：重复触发会刷新内容、入场动画和自动关闭计时。 */
export function useTransientNotice(
  durationMs = DEFAULT_NOTICE_DURATION_MS,
): [TransientNotice | null, (message: string) => void] {
  const [notice, setNotice] = useState<TransientNotice | null>(null);

  useEffect(() => {
    if (notice === null) return;
    const timer = window.setTimeout(() => setNotice(null), durationMs);
    return () => window.clearTimeout(timer);
  }, [durationMs, notice]);

  const showNotice = useCallback((message: string) => {
    setNotice((current) => ({
      id: (current?.id ?? 0) + 1,
      message,
    }));
  }, []);

  return [notice, showNotice];
}
