import { useEffect, useState } from 'react';

import { MapMarker } from '../../components/MapMarker';
import acceptingCourierMascot from '../../assets/tracking/accepting-courier-mascot.png';
import iconChevron from '../../assets/nav/icon-chevron.svg';
import iconAnnounce from '../../assets/tracking/icon-announce.svg';
import courierScooter from '../../assets/tracking/courier-scooter.png';
import mapClear from '../../assets/tracking/map-clear.webp';
import type { ItemProofServiceVariant } from '../../data/models/order';
import type { TrackingStage } from '../../data/models/tracking';
import { ItemProofCard } from './ItemProofCard';
import { TrackingNavigation } from './TrackingNavigation';

type ActiveTrackingStage = Exclude<TrackingStage, 'completed'>;
type MovingStage = Exclude<ActiveTrackingStage, 'accepting'>;

const ACCEPTING_COUNTDOWN_SECONDS = 44;
const SONAR_WAVE_DELAYS = ['0s', '1.2s', '2.4s'] as const;
const LOCATION_REFRESH_MS = 2_000;

interface CourierRouteSnapshot {
  distanceMeters: number;
  leftPercent: number;
  minutes: number;
  topPx: number;
}

const MAP_STATUS: Record<
  MovingStage,
  { distanceLabel: string; title: string }
> = {
  accepted: {
    distanceLabel: '距取件地',
    title: '骑手取件中',
  },
  picked: {
    distanceLabel: '距送件地',
    title: '骑手送件中',
  },
  delivering: {
    distanceLabel: '距送件地',
    title: '骑手送件中',
  },
  arrived: {
    distanceLabel: '距送件地',
    title: '已达到送件地',
  },
};

/** 2 秒一帧的压缩配送轨迹，与 mock 配送阶段时长保持一致。 */
const COURIER_ROUTE: Record<MovingStage, readonly CourierRouteSnapshot[]> = {
  accepted: [
    { leftPercent: 23.2, topPx: 225, minutes: 7, distanceMeters: 830 },
    { leftPercent: 25.1, topPx: 229, minutes: 6, distanceMeters: 690 },
    { leftPercent: 26.9, topPx: 235, minutes: 5, distanceMeters: 560 },
    { leftPercent: 28.8, topPx: 242, minutes: 4, distanceMeters: 430 },
    { leftPercent: 30.1, topPx: 249, minutes: 2, distanceMeters: 300 },
    { leftPercent: 31.5, topPx: 255, minutes: 1, distanceMeters: 130 },
  ],
  picked: [
    { leftPercent: 31.5, topPx: 255, minutes: 3, distanceMeters: 233 },
    { leftPercent: 33.3, topPx: 261, minutes: 3, distanceMeters: 210 },
    { leftPercent: 35.2, topPx: 268, minutes: 2, distanceMeters: 175 },
    { leftPercent: 37.1, topPx: 276, minutes: 2, distanceMeters: 140 },
    { leftPercent: 39, topPx: 284, minutes: 1, distanceMeters: 105 },
    { leftPercent: 41, topPx: 292, minutes: 1, distanceMeters: 70 },
  ],
  delivering: [
    { leftPercent: 41, topPx: 292, minutes: 1, distanceMeters: 70 },
    { leftPercent: 43.1, topPx: 299, minutes: 1, distanceMeters: 56 },
    { leftPercent: 45, topPx: 307, minutes: 1, distanceMeters: 42 },
    { leftPercent: 47.1, topPx: 315, minutes: 1, distanceMeters: 28 },
    { leftPercent: 49, topPx: 323, minutes: 1, distanceMeters: 14 },
    { leftPercent: 51.2, topPx: 331, minutes: 0, distanceMeters: 0 },
  ],
  arrived: [
    { leftPercent: 51.2, topPx: 331, minutes: 0, distanceMeters: 0 },
  ],
};

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
    <div className="absolute top-[calc(136px+env(safe-area-inset-top))] left-1/2 z-10 size-44 -translate-x-1/2">
      <div aria-hidden className="absolute inset-0">
        {SONAR_WAVE_DELAYS.map((animationDelay) => (
          <span
            key={animationDelay}
            className="tracking-sonar-wave absolute inset-0 rounded-full"
            style={{ animationDelay }}
          />
        ))}
      </div>
      <img
        src={acceptingCourierMascot}
        alt="正在为您寻找骑手"
        draggable={false}
        className="pointer-events-none absolute top-1/2 left-1/2 z-10 size-12 -translate-x-1/2 -translate-y-1/2 object-contain select-none"
      />
    </div>
  );
}

interface CourierStatusBubbleProps {
  distanceMeters: number;
  minutes: number;
  stage: MovingStage;
}

function CourierStatusBubble({
  distanceMeters,
  minutes,
  stage,
}: CourierStatusBubbleProps) {
  const status = MAP_STATUS[stage];
  return (
    <div className="flex h-[46px] overflow-hidden rounded-8 border border-bg-container shadow-[0_1px_4px_rgba(28,30,33,0.12)]">
      <div className="flex flex-col items-center justify-center bg-bg-page px-3 py-1.5">
        <span className="flex items-center gap-0.5 text-accent-primary">
          <span className="font-number text-number font-medium">
            {minutes}
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
            {distanceMeters}米
          </span>
        </span>
        <img src={iconChevron} alt="" className="size-3" />
      </div>
    </div>
  );
}

function CourierSprite({ arrived }: { arrived: boolean }) {
  const crop = arrived
    ? { frameSize: 48.25, imageSize: 126.363, left: -71.08, top: -65.9 }
    : { frameSize: 48.875, imageSize: 128, left: -7, top: -5.75 };

  return (
    <div
      role="img"
      aria-label="骑手配送位置"
      className="absolute top-0 left-0 overflow-hidden"
      style={{ width: crop.frameSize, height: crop.frameSize }}
    >
      <img
        src={courierScooter}
        alt=""
        draggable={false}
        className="pointer-events-none absolute max-w-none object-cover select-none"
        style={{
          width: crop.imageSize,
          height: crop.imageSize,
          left: crop.left,
          top: crop.top,
        }}
      />
    </div>
  );
}

function MovingCourier({ stage }: { stage: MovingStage }) {
  const route = COURIER_ROUTE[stage];
  const [snapshotIndex, setSnapshotIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || route.length < 2) return;

    const timer = window.setInterval(() => {
      setSnapshotIndex((current) => Math.min(current + 1, route.length - 1));
    }, LOCATION_REFRESH_MS);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, route]);

  const snapshot = route[Math.min(snapshotIndex, route.length - 1)]!;
  const arrived = stage === 'arrived';

  return (
    <div
      className="absolute z-10 duration-[700ms] ease-out transition-[left,top] motion-reduce:transition-none"
      style={{
        left: `${snapshot.leftPercent}%`,
        top: `calc(${snapshot.topPx}px + env(safe-area-inset-top))`,
      }}
    >
      <div
        className="absolute"
        style={{ left: arrived ? -52 : -56, top: arrived ? -48 : -53 }}
      >
        <CourierStatusBubble
          stage={stage}
          minutes={snapshot.minutes}
          distanceMeters={snapshot.distanceMeters}
        />
      </div>
      <CourierSprite arrived={arrived} />
    </div>
  );
}

interface TrackingMapProps {
  bookmarked: boolean;
  pickupCode: string;
  serviceVariant: ItemProofServiceVariant;
  stage: ActiveTrackingStage;
  onBack: () => void;
  onBookmark: () => void;
  onItemIssue: () => void;
  onSupport: () => void;
}

/** 物流地图区(frame 1507:20230/20684/21772/22206)。 */
export function TrackingMap({
  bookmarked,
  pickupCode,
  serviceVariant,
  stage,
  onBack,
  onBookmark,
  onItemIssue,
  onSupport,
}: TrackingMapProps) {
  const accepting = stage === 'accepting';

  return (
    <section
      aria-label="配送地图"
      className="relative h-[calc(445px+env(safe-area-inset-top))]"
    >
      <img
        src={mapClear}
        alt="细雨天气下的配送地图"
        className="absolute inset-x-0 top-0 h-[calc(767px+env(safe-area-inset-top))] w-full object-cover object-top"
      />
      <div
        aria-hidden
        className="tracking-rain pointer-events-none absolute inset-x-0 top-0 h-[calc(445px+env(safe-area-inset-top))] overflow-hidden"
      >
        <span className="tracking-rain-layer tracking-rain-layer-far" />
        <span className="tracking-rain-layer tracking-rain-layer-near" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-full h-[324px]"
        style={{
          backgroundImage:
            'linear-gradient(180.107deg, rgba(246, 246, 246, 0) 0.1077%, rgb(246, 246, 246) 42.763%, rgb(246, 246, 246) 99.892%)',
        }}
      />

      <div className="absolute inset-x-0 top-[env(safe-area-inset-top)] z-10">
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
            serviceVariant={serviceVariant}
            stage={stage}
            onItemIssue={onItemIssue}
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
          <MovingCourier key={stage} stage={stage} />
          <div className="absolute top-[calc(344px+env(safe-area-inset-top))] left-[70.4%] z-10">
            <MapMarker role={stage === 'accepted' ? 'pickup' : 'delivery'} />
          </div>
        </>
      )}

      <div className="absolute top-[calc(409px+env(safe-area-inset-top))] left-2 z-10 flex h-7 w-[270px] items-center gap-0.5 rounded-full bg-bg-page py-1 pr-2.5 pl-1.5">
        <img src={iconAnnounce} alt="" className="size-5 shrink-0" />
        <p className="text-caption whitespace-nowrap text-text-tertiary">
          细雨连绵, 骑手赶路不易, 会尽全力为您配送
        </p>
      </div>
    </section>
  );
}
