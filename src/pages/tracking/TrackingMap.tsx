import { useEffect, useState } from 'react';

import { RoleBadge } from '../../components/RoleBadge';
import iconFlower from '../../assets/item-info/icon-flower.svg';
import iconAnnounce from '../../assets/tracking/icon-announce.svg';
import courierScooter from '../../assets/tracking/courier-scooter.png';
import mapRain from '../../assets/tracking/map-rain.png';
import type { TrackingStage } from '../../data/models/tracking';
import { ItemProofCard } from './ItemProofCard';
import { TrackingNavigation } from './TrackingNavigation';

type ActiveTrackingStage = Exclude<TrackingStage, 'completed'>;
type MovingStage = Exclude<ActiveTrackingStage, 'accepting'>;

const ACCEPTING_COUNTDOWN_SECONDS = 44;
const SONAR_WAVE_DELAYS = ['0s', '1.2s', '2.4s'] as const;

const MAP_STATUS: Record<
  MovingStage,
  { minutes: string; distanceLabel: string; title: string; distance: string }
> = {
  accepted: {
    minutes: '7',
    distanceLabel: '距取件地',
    title: '骑手取件中',
    distance: '830米',
  },
  picked: {
    minutes: '3',
    distanceLabel: '距送件地',
    title: '骑手送达中',
    distance: '233米',
  },
  delivering: {
    minutes: '3',
    distanceLabel: '距送件地',
    title: '骑手送达中',
    distance: '233米',
  },
  arrived: {
    minutes: '0',
    distanceLabel: '距送件地',
    title: '已达到送件地',
    distance: '0米',
  },
};

function MapPin({ role }: { role: 'pickup' | 'delivery' }) {
  return (
    <span className="flex flex-col items-center">
      <span className="flex size-[30px] items-center justify-center rounded-full bg-bg-container shadow-[0_1px_3px_rgba(28,30,33,0.18)]">
        <RoleBadge role={role} />
      </span>
      <span className="-mt-px size-1.5 rotate-45 bg-bg-container shadow-[1px_1px_1px_rgba(28,30,33,0.12)]" />
      <span className="mt-0.5 size-1.5 rounded-full border border-bg-container bg-text-tertiary" />
    </span>
  );
}

function AcceptingBubble() {
  const [remainingSeconds, setRemainingSeconds] = useState(
    ACCEPTING_COUNTDOWN_SECONDS,
  );

  useEffect(() => {
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1_000);
      setRemainingSeconds(
        Math.max(ACCEPTING_COUNTDOWN_SECONDS - elapsedSeconds, 0),
      );
    }, 1_000);

    return () => window.clearInterval(timer);
  }, []);

  const countdown = `0:${String(remainingSeconds).padStart(2, '0')}`;

  return (
    <div className="flex h-14 overflow-hidden rounded-8 border border-bg-container bg-bg-container shadow-[0_1px_4px_rgba(28,30,33,0.12)]">
      <div className="flex w-[72px] flex-col items-center justify-center bg-bg-page px-3 py-1.5">
        <time
          dateTime={`PT${remainingSeconds}S`}
          className="font-number text-number font-medium text-accent-primary tabular-nums"
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

function AcceptingSonar() {
  return (
    <div className="absolute top-[calc(136px+env(safe-area-inset-top))] left-1/2 size-44 -translate-x-1/2">
      <div aria-hidden className="absolute inset-0">
        {SONAR_WAVE_DELAYS.map((animationDelay) => (
          <span
            key={animationDelay}
            className="tracking-sonar-wave absolute inset-0 rounded-full"
            style={{ animationDelay }}
          />
        ))}
      </div>
      <span className="absolute top-1/2 left-1/2 z-10 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-primary shadow-[0_2px_8px_rgba(28,30,33,0.10)]">
        <img src={iconFlower} alt="鲜花订单定位" className="size-8" />
      </span>
    </div>
  );
}

function CourierStatusBubble({ stage }: { stage: MovingStage }) {
  const status = MAP_STATUS[stage];
  return (
    <div className="flex h-[46px] overflow-hidden rounded-8 border border-bg-container shadow-[0_1px_4px_rgba(28,30,33,0.12)]">
      <div className="flex flex-col items-center justify-center bg-bg-page px-3 py-1.5">
        <span className="flex items-center gap-0.5 text-accent-primary">
          <span className="font-number text-number font-medium">
            {status.minutes}
          </span>
          <span className="text-caption-xs font-medium">分钟</span>
        </span>
        <span className="text-caption font-medium whitespace-nowrap text-text-primary">
          {status.distanceLabel}
        </span>
      </div>
      <div className="flex items-center gap-1 bg-bg-container py-1 pr-1 pl-2">
        <span className="flex flex-col">
          <span className="text-caption font-medium whitespace-nowrap text-text-primary">
            {status.title}
          </span>
          <span className="font-number text-caption-sm whitespace-nowrap text-accent-primary">
            {status.distance}
          </span>
        </span>
        <span aria-hidden className="text-body leading-none text-text-tertiary">
          ›
        </span>
      </div>
    </div>
  );
}

interface TrackingMapProps {
  bookmarked: boolean;
  pickupCode: string;
  stage: ActiveTrackingStage;
  onBack: () => void;
  onBookmark: () => void;
  onSupport: () => void;
  onViewBenefits: () => void;
}

/** 物流地图区(frame 1507:20230/20684/21772/22206)。 */
export function TrackingMap({
  bookmarked,
  pickupCode,
  stage,
  onBack,
  onBookmark,
  onSupport,
  onViewBenefits,
}: TrackingMapProps) {
  const accepting = stage === 'accepting';
  const arrived = stage === 'arrived';

  return (
    <section
      aria-label="配送地图"
      className="relative h-[calc(445px+env(safe-area-inset-top))] overflow-hidden"
    >
      <img
        src={mapRain}
        alt="细雨天气下的配送地图"
        className="absolute inset-x-0 top-0 h-[calc(767px+env(safe-area-inset-top))] w-full object-cover object-top"
      />

      <div className="absolute inset-x-0 top-[env(safe-area-inset-top)]">
        <TrackingNavigation
          bookmarked={bookmarked}
          onBack={onBack}
          onBookmark={onBookmark}
          onSupport={onSupport}
        />
      </div>

      {!accepting && (
        <div className="absolute inset-x-2 top-[calc(57px+env(safe-area-inset-top))] z-10">
          <ItemProofCard
            pickupCode={pickupCode}
            stage={stage}
            onViewBenefits={onViewBenefits}
          />
        </div>
      )}

      {accepting ? (
        <>
          <div className="absolute top-[calc(122px+env(safe-area-inset-top))] left-1/2 z-10 -translate-x-1/2">
            <AcceptingBubble />
          </div>
          <AcceptingSonar />
        </>
      ) : (
        <>
          <div
            className={`absolute z-10 ${
              arrived
                ? 'top-[calc(283px+env(safe-area-inset-top))] left-[37.33%]'
                : 'top-[calc(172px+env(safe-area-inset-top))] left-[8.27%]'
            }`}
          >
            <CourierStatusBubble stage={stage} />
          </div>
          <img
            src={courierScooter}
            alt="骑手配送位置"
            className={`absolute top-[calc(212px+env(safe-area-inset-top))] left-[41.07%] z-10 size-[83px] transition-transform duration-300 motion-reduce:transition-none ${
              arrived ? 'translate-x-[115px] translate-y-[110px]' : ''
            }`}
          />
          <div className="absolute top-[calc(344px+env(safe-area-inset-top))] left-[70.4%]">
            <MapPin role={stage === 'accepted' ? 'pickup' : 'delivery'} />
          </div>
        </>
      )}

      <div className="absolute top-[calc(409px+env(safe-area-inset-top))] left-2 flex h-7 w-[270px] items-center gap-0.5 rounded-full bg-bg-page py-1 pr-2.5 pl-1.5">
        <img src={iconAnnounce} alt="" className="size-5 shrink-0" />
        <p className="text-caption whitespace-nowrap text-text-tertiary">
          细雨连绵, 骑手赶路不易, 会尽全力为您配送
        </p>
      </div>
    </section>
  );
}
