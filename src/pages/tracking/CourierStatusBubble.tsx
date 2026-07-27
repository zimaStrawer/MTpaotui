import iconChevron from '../../assets/nav/icon-chevron.svg';
import { formatTrackingDistance } from '../../data/mock/tracking-route';

export type CourierStatusProps =
  | {
      remainingSeconds: number;
      variant: 'accepting';
    }
  | {
      distanceMeters: number;
      minutes: number;
      variant: 'pickup' | 'delivery' | 'arrived';
    };

const MOVING_STATUS_COPY = {
  pickup: {
    distanceLabel: '距取件地',
    title: '骑手取件中',
  },
  delivery: {
    distanceLabel: '距送件地',
    title: '骑手送件中',
  },
  arrived: {
    distanceLabel: '距送件地',
    title: '已到达送件地',
  },
} as const;

/** 骑手状态(node 1812:15204)，只负责展示，不维护配送状态和计时器。 */
export function CourierStatusBubble(props: CourierStatusProps) {
  if (props.variant === 'accepting') {
    const countdown = `0:${String(props.remainingSeconds).padStart(2, '0')}`;

    return (
      <div className="flex h-14 overflow-hidden rounded-8 border border-container-bg bg-container-bg shadow-[0_1px_4px_rgba(28,30,33,0.12)]">
        <div className="flex w-[72px] flex-col items-center justify-center bg-page-bg px-3 py-1.5">
          <time
            dateTime={`PT${props.remainingSeconds}S`}
            className="font-number text-number font-medium text-highlight-primary tabular-nums"
          >
            {countdown}
          </time>
          <span className="text-caption font-medium whitespace-nowrap text-text-primary">
            预计接单
          </span>
        </div>
        <div className="flex items-center px-2 text-caption font-medium whitespace-nowrap text-text-primary">
          正全力为您寻找骑手
        </div>
      </div>
    );
  }

  const status = MOVING_STATUS_COPY[props.variant];

  return (
    <div className="flex h-[46px] overflow-hidden rounded-8 border border-container-bg shadow-[0_1px_4px_rgba(28,30,33,0.12)]">
      <div className="flex flex-col items-center justify-center bg-page-bg px-3 py-1.5">
        <span className="flex items-center gap-0.5 text-highlight-primary">
          <span className="font-number text-number font-medium">
            {props.minutes}
          </span>
          <span className="text-caption-xs font-medium">分钟</span>
        </span>
        <span className="text-caption font-medium whitespace-nowrap text-text-primary">
          {status.distanceLabel}
        </span>
      </div>
      <div className="flex items-center gap-1 bg-container-bg py-1 pr-1 pl-2">
        <span className="flex flex-col">
          <span className="text-caption font-medium whitespace-nowrap text-text-primary">
            {status.title}
          </span>
          <span className="font-number text-caption-sm whitespace-nowrap text-highlight-primary">
            {formatTrackingDistance(props.distanceMeters)}
          </span>
        </span>
        <img src={iconChevron} alt="" className="size-3" />
      </div>
    </div>
  );
}
