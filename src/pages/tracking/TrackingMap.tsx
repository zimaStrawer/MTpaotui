import { useEffect, useState } from 'react';

import { MapMarker } from '../../components/MapMarker';
import acceptingCourierMascot from '../../assets/tracking/accepting-courier-mascot.webp';
import iconAnnounce from '../../assets/tracking/icon-announce.svg';
import courierScooter from '../../assets/tracking/courier-scooter.webp';
import mapClear from '../../assets/tracking/map-clear.webp';
import { VerticalNoticeCarousel } from '../../components/VerticalNoticeCarousel';
import {
  COURIER_ROUTE,
  COURIER_SCREEN_POSITION,
  LOCATION_REFRESH_MS,
  type MovingTrackingStage,
} from '../../data/mock/tracking-route';
import type { ItemProofServiceVariant } from '../../data/models/order';
import type { ActiveTrackingStage } from '../../data/models/tracking';
import { CourierStatusBubble } from './CourierStatusBubble';
import { ItemProofCard } from './ItemProofCard';
import { TrackingNavigation } from './TrackingNavigation';
import {
  TRACKING_NOTICES,
  TRACKING_NOTICE_INTERVAL_MS,
} from './tracking-notices';

const ACCEPTING_COUNTDOWN_SECONDS = 44;
const SONAR_WAVE_DELAYS = ['0s', '1.2s', '2.4s'] as const;

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

  return (
    <CourierStatusBubble
      variant="accepting"
      remainingSeconds={remainingSeconds}
    />
  );
}

function AcceptingSonar() {
  return (
    <div className="absolute top-[calc(136px+var(--app-safe-area-top))] left-1/2 z-10 size-44 -translate-x-1/2">
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
        decoding="async"
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

function MovingCourier({
  stage,
  premium,
}: {
  stage: MovingTrackingStage;
  premium: boolean;
}) {
  const route = COURIER_ROUTE[stage];
  const [snapshotIndex, setSnapshotIndex] = useState(0);

  useEffect(() => {
    if (route.length < 2) return;

    const timer = window.setInterval(() => {
      setSnapshotIndex((current) => Math.min(current + 1, route.length - 1));
    }, LOCATION_REFRESH_MS);

    return () => window.clearInterval(timer);
  }, [route]);

  const snapshot = route[Math.min(snapshotIndex, route.length - 1)]!;
  const arrived = stage === 'arrived';
  const statusVariant =
    stage === 'accepted'
      ? 'pickup'
      : stage === 'delivering'
        ? 'delivery'
        : 'arrived';

  return (
    <div
      className="absolute z-10 duration-[700ms] ease-out transition-[left,top] motion-reduce:transition-none"
      style={{
        left: `${snapshot.leftPercent}%`,
        top: `calc(${snapshot.topPx}px + var(--app-safe-area-top))`,
      }}
    >
      <div className="absolute" style={{ left: -56, top: -53 }}>
        <CourierStatusBubble
          variant={statusVariant}
          minutes={snapshot.minutes}
          distanceMeters={snapshot.distanceMeters}
          premium={premium}
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
  const deliveryMapView = stage === 'delivering' || stage === 'arrived';

  return (
    <section
      aria-label="配送地图"
      className="relative h-[calc(445px+var(--app-safe-area-top))]"
    >
      <div className="absolute inset-x-0 top-0 h-[calc(767px+var(--app-safe-area-top))] overflow-hidden bg-page-bg">
        <img
          src={mapClear}
          alt=""
          width={830}
          height={1107}
          decoding="async"
          draggable={false}
          className="absolute top-0 left-0 h-full w-[calc(100%+36px)] max-w-none object-cover object-top transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{
            transform: deliveryMapView
              ? 'translateX(-18px) scale(1.02)'
              : 'translateX(0) scale(1)',
          }}
        />
      </div>
      <div
        aria-hidden
        className="tracking-rain pointer-events-none absolute inset-x-0 top-0 h-[calc(445px+var(--app-safe-area-top))] overflow-hidden"
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

      <div className="absolute inset-x-0 top-[var(--app-safe-area-top)] z-10">
        <TrackingNavigation
          bookmarked={bookmarked}
          onBack={onBack}
          onBookmark={onBookmark}
          onSupport={onSupport}
        />
      </div>

      {!accepting && (
        <div className="absolute inset-x-2 top-[calc(57px+var(--app-safe-area-top))] z-10">
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
          <div className="absolute top-[calc(122px+var(--app-safe-area-top))] left-1/2 z-10 -translate-x-1/2">
            <AcceptingBubble />
          </div>
          <AcceptingSonar />
        </>
      ) : (
        <>
          <MovingCourier
            key={stage}
            stage={stage}
            premium={serviceVariant === 'express'}
          />
          <div
            className="absolute z-10"
            style={{
              left: `${COURIER_SCREEN_POSITION.destination.leftPercent}%`,
              top: `calc(${COURIER_SCREEN_POSITION.destination.topPx}px + var(--app-safe-area-top))`,
            }}
          >
            <MapMarker
              role={stage === 'accepted' ? 'pickup' : 'delivery'}
              premium={serviceVariant === 'express'}
            />
          </div>
        </>
      )}

      <div className="absolute top-[calc(409px+var(--app-safe-area-top))] left-2 z-10 flex h-7 w-fit items-center rounded-full bg-page-bg px-1.5 py-1">
        <VerticalNoticeCarousel
          align="start"
          ariaLabel="配送提示"
          className="text-caption text-text-tertiary"
          iconClassName="size-5"
          iconSrc={iconAnnounce}
          intervalMs={TRACKING_NOTICE_INTERVAL_MS}
          notices={TRACKING_NOTICES}
        />
      </div>
    </section>
  );
}
