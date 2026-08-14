import iconPrivacy from '../../assets/home/icon-privacy.svg';
import { VerticalNoticeCarousel } from '../../components/VerticalNoticeCarousel';
import {
  HOME_SAFETY_NOTICES,
  HOME_SAFETY_NOTICE_INTERVAL_MS,
} from './safety-notices';

interface SafetyNoticeCarouselProps {
  className?: string;
}

/** 首页安全提示：每 6 秒向上切换，末尾使用首条副本实现无缝循环。 */
export function SafetyNoticeCarousel({
  className = '',
}: SafetyNoticeCarouselProps) {
  return (
    <VerticalNoticeCarousel
      ariaLabel="安全提示"
      className={`text-caption-sm text-text-tertiary ${className}`}
      iconSrc={iconPrivacy}
      intervalMs={HOME_SAFETY_NOTICE_INTERVAL_MS}
      notices={HOME_SAFETY_NOTICES}
    />
  );
}
