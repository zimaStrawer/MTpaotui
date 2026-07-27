import type { TrackingStage } from '../../data/models/tracking';
import { OrderActions } from './OrderActions';
import { TrackingProgress } from './TrackingProgress';

type ActiveTrackingStage = Exclude<TrackingStage, 'completed'>;

const STAGE_COPY: Record<
  ActiveTrackingStage,
  { time: string; label: string; description: string }
> = {
  accepting: {
    time: '20:44-20:49',
    label: '预计接单',
    description: '正在为您召唤骑士，感谢您的耐心等待',
  },
  accepted: {
    time: '21:07-21:12',
    label: '预计取件',
    description: '请准备好待取物品，并保持电话畅通',
  },
  picked: {
    time: '21:26-21:31',
    label: '预计送达',
    description: '请准备好接收，并保持电话畅通',
  },
  delivering: {
    time: '21:26-21:31',
    label: '预计送达',
    description: '请准备好接收，并保持电话畅通',
  },
  arrived: {
    time: '21:30',
    label: '到达收件地',
    description: '即将上门送件，请准备接收',
  },
};

interface TrackingStatusCardProps {
  stage: ActiveTrackingStage;
  onClaim: () => void;
  onEdit: () => void;
  onMore: () => void;
  onShare: () => void;
}

/** 配送状态卡(frame 1507:20686/21776/22210)。 */
export function TrackingStatusCard({
  stage,
  onClaim,
  onEdit,
  onMore,
  onShare,
}: TrackingStatusCardProps) {
  const copy = STAGE_COPY[stage];

  return (
    <section className="h-[202px] overflow-hidden rounded-16 bg-container-bg">
      <div className="h-[62px] bg-page-bg px-3 pt-4">
        <TrackingProgress stage={stage} />
      </div>
      <div aria-live="polite" className="px-4 pt-3 max-[350px]:px-2">
        <div className="flex h-9 items-end gap-1 whitespace-nowrap">
          <strong className="font-number text-display-xl leading-none font-bold text-text-primary">
            {copy.time}
          </strong>
          <span className="pb-0.5 text-title-sm font-semibold text-text-primary">
            {copy.label}
          </span>
        </div>
        <p className="mt-2 text-body text-text-primary">{copy.description}</p>
      </div>
      <div className="mx-4 mt-2.5 border-t border-border-divider pt-3">
        <OrderActions
          onMore={onMore}
          onEdit={onEdit}
          onClaim={onClaim}
          onShare={onShare}
        />
      </div>
    </section>
  );
}
