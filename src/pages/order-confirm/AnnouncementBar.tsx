import { useEffect, useState, type ReactNode } from 'react';

import iconDynamicPrompt from '../../assets/order/icon-dynamic-prompt.svg';

const ROTATE_MS = 5_000;
const COUNTDOWN_START_SECONDS = 3 * 3600 + 9 * 60 + 35;

function formatCountdown(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((part) => String(part).padStart(2, '0')).join(':');
}

/**
 * 动态催促标签(862:4273,内容态 1-5):有内容时每 5 秒自动轮换;
 * 折扣倒计时(态 3)实时递减。
 */
export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [countdown, setCountdown] = useState(COUNTDOWN_START_SECONDS);

  useEffect(() => {
    const rotate = setInterval(
      () => setIndex((current) => (current + 1) % 5),
      ROTATE_MS,
    );
    const tick = setInterval(
      () => setCountdown((seconds) => Math.max(seconds - 1, 0)),
      1_000,
    );
    return () => {
      clearInterval(rotate);
      clearInterval(tick);
    };
  }, []);

  const slides: ReactNode[] = [
    '目前订单较多，骑手紧张，送达时间可能波动',
    '平台保障 | 超1分钟赔・物品安全保障',
    <>
      限时 <span className="text-highlight-primary">7.5折</span> 优惠{' '}
      <span className="text-highlight-primary">
        {formatCountdown(countdown)}
      </span>
    </>,
    <>
      本单享 <span className="text-highlight-primary">3折</span> 优惠
    </>,
    <>
      热评：服务态度好 <span className="text-text-secondary">6.7 万</span>
    </>,
  ];

  return (
    <div className="pointer-events-none relative flex h-11 w-full items-center justify-center overflow-hidden">
      <span className="flex items-center gap-1 rounded-8 border border-transparent bg-gradient-to-r from-[#fded40] to-transparent to-40% px-2 py-1">
        <img src={iconDynamicPrompt} alt="" className="size-6" />
        <span className="text-caption whitespace-nowrap text-text-primary">
          {slides[index]}
        </span>
      </span>
    </div>
  );
}
