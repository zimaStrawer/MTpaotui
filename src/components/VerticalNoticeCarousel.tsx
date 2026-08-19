import { useEffect, useState } from 'react';

type FourItemNoticeList = readonly [string, string, string, string];

interface VerticalNoticeCarouselProps {
  align?: 'center' | 'start';
  ariaLabel: string;
  className?: string;
  iconClassName?: string;
  iconSrc: string;
  intervalMs: number;
  notices: FourItemNoticeList;
}

/** 四条提示以固定高度向上轮播，图标与文案作为一个整体同步移动。 */
export function VerticalNoticeCarousel({
  align = 'center',
  ariaLabel,
  className = '',
  iconClassName = 'size-4',
  iconSrc,
  intervalMs,
  notices,
}: VerticalNoticeCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const noticeCount = notices.length;
  const activeNotice = notices[activeIndex];
  const accessibleSummary = `${ariaLabel}：${notices.join('；')}`;
  const alignmentClass = align === 'start' ? 'justify-start' : 'justify-center';

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % noticeCount);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, noticeCount]);

  return (
    <div
      role="note"
      aria-label={accessibleSummary}
      className={`flex h-5 min-w-0 items-start overflow-hidden leading-5 ${alignmentClass} ${className}`}
    >
      <span
        key={activeIndex}
        aria-hidden="true"
        className={`vertical-notice-carousel-item flex h-5 max-w-full min-w-0 shrink-0 items-center gap-1 whitespace-nowrap ${alignmentClass}`}
      >
        <img src={iconSrc} alt="" className={`${iconClassName} shrink-0`} />
        <span className="min-w-0 truncate">{activeNotice}</span>
      </span>
    </div>
  );
}
