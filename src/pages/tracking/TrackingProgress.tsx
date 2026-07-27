import type { TrackingStage } from '../../data/models/tracking';

const STAGE_PROGRESS: Record<TrackingStage, number> = {
  accepting: 0,
  accepted: 28,
  picked: 75,
  delivering: 75,
  arrived: 100,
  completed: 100,
};

interface ProgressMarkerProps {
  active: boolean;
  label: string;
  position: 'start' | 'middle' | 'end';
}

function ProgressMarker({ active, label, position }: ProgressMarkerProps) {
  const positionClass =
    position === 'start'
      ? 'left-0'
      : position === 'middle'
        ? 'left-1/2 -translate-x-1/2'
        : 'right-0';

  return (
    <span
      className={`absolute top-0 flex size-[30px] items-center justify-center rounded-full ${positionClass} ${
        active ? 'bg-brand-primary' : 'bg-text-quaternary'
      }`}
    >
      <span
        className={`flex size-4 items-center justify-center rounded-full text-[9px] leading-none font-semibold ${
          active
            ? 'bg-text-primary text-brand-primary'
            : 'bg-text-tertiary text-container-bg'
        }`}
      >
        {label}
      </span>
    </span>
  );
}

interface TrackingProgressProps {
  stage: TrackingStage;
}

/** 进度条四变体(node 842:1359)，阶段与 repository 时间线共用同一枚举。 */
export function TrackingProgress({ stage }: TrackingProgressProps) {
  const progress = STAGE_PROGRESS[stage];
  const pickupActive = progress >= 75;
  const deliveryActive = progress === 100;

  return (
    <div
      role="progressbar"
      aria-label="配送进度"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      className="relative h-[30px] w-full"
    >
      <span className="absolute top-2 right-[15px] left-[15px] h-3.5 rounded-full bg-text-quaternary" />
      <span
        className="absolute top-2 left-[15px] h-3.5 rounded-full bg-brand-primary transition-[width] duration-300 motion-reduce:transition-none"
        style={{ width: `calc((100% - 30px) * ${progress / 100})` }}
      />
      <ProgressMarker active label="¥" position="start" />
      <ProgressMarker active={pickupActive} label="取" position="middle" />
      <ProgressMarker active={deliveryActive} label="收" position="end" />
    </div>
  );
}
