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
  const loopingNotices = [...notices, notices[0]];
  const accessibleSummary = `${ariaLabel}：${notices.join('；')}`;
  const alignmentClass = align === 'start' ? 'justify-start' : 'justify-center';

  return (
    <div
      role="note"
      aria-label={accessibleSummary}
      className={`flex h-5 items-start overflow-hidden leading-5 ${alignmentClass} ${className}`}
    >
      <span
        aria-hidden="true"
        className="vertical-notice-carousel-track flex flex-col"
        style={{ animationDuration: `${intervalMs * notices.length}ms` }}
      >
        {loopingNotices.map((notice, index) => (
          <span
            key={`${notice}-${index}`}
            className={`flex h-5 shrink-0 items-center gap-1 whitespace-nowrap ${alignmentClass}`}
          >
            <img
              src={iconSrc}
              alt=""
              className={`${iconClassName} shrink-0`}
            />
            <span>{notice}</span>
          </span>
        ))}
      </span>
    </div>
  );
}
