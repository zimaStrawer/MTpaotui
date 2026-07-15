import iconBack from '../../assets/tracking/icon-back.svg';
import iconBookmark from '../../assets/tracking/icon-bookmark.svg';
import iconService from '../../assets/tracking/icon-service.svg';

interface TrackingNavigationProps {
  bookmarked: boolean;
  onBack: () => void;
  onBookmark: () => void;
  onSupport: () => void;
}

/** 配送链路共用导航(frame 1507:20735)。 */
export function TrackingNavigation({
  bookmarked,
  onBack,
  onBookmark,
  onSupport,
}: TrackingNavigationProps) {
  return (
    <header className="relative z-30 flex h-11 items-center justify-between px-2">
      <button
        type="button"
        aria-label="返回"
        onClick={onBack}
        className="flex size-11 items-center justify-center"
      >
        <img src={iconBack} alt="" className="size-6" />
      </button>
      <div className="flex -space-x-2">
        <button
          type="button"
          aria-label={bookmarked ? '取消收藏订单' : '收藏订单'}
          aria-pressed={bookmarked}
          onClick={onBookmark}
          className="flex size-11 items-center justify-center"
        >
          <img
            src={iconBookmark}
            alt=""
            className={`size-5 transition-opacity duration-200 motion-reduce:transition-none ${
              bookmarked ? 'opacity-100' : 'opacity-75'
            }`}
          />
        </button>
        <button
          type="button"
          aria-label="联系客服"
          onClick={onSupport}
          className="flex size-11 items-center justify-center"
        >
          <img src={iconService} alt="" className="size-5" />
        </button>
      </div>
    </header>
  );
}
