import type { TrackingStage } from '../models/tracking';

export type MovingTrackingStage = Exclude<
  TrackingStage,
  'accepting' | 'completed'
>;

export interface CourierRouteSnapshot {
  distanceMeters: number;
  leftPercent: number;
  minutes: number;
  topPx: number;
}

export const LOCATION_REFRESH_MS = 2_000;

export const COURIER_SCREEN_POSITION = {
  start: { leftPercent: 23.2, topPx: 225 },
  end: { leftPercent: 59.5, topPx: 341 },
  destination: { leftPercent: 70.4, topPx: 344 },
} as const;

const PICKUP_ROUTE: readonly CourierRouteSnapshot[] = [
  { leftPercent: 23.2, topPx: 225, minutes: 5, distanceMeters: 650 },
  { leftPercent: 29.8, topPx: 242, minutes: 4, distanceMeters: 520 },
  { leftPercent: 36.3, topPx: 263, minutes: 3, distanceMeters: 390 },
  { leftPercent: 43.2, topPx: 288, minutes: 2, distanceMeters: 260 },
  { leftPercent: 51.1, topPx: 315, minutes: 1, distanceMeters: 130 },
  { leftPercent: 59.5, topPx: 341, minutes: 0, distanceMeters: 0 },
];

const DELIVERY_ROUTE: readonly CourierRouteSnapshot[] = [
  { leftPercent: 23.2, topPx: 225, minutes: 12, distanceMeters: 1_800 },
  { leftPercent: 29.8, topPx: 242, minutes: 10, distanceMeters: 1_440 },
  { leftPercent: 36.3, topPx: 263, minutes: 8, distanceMeters: 1_080 },
  { leftPercent: 43.2, topPx: 288, minutes: 6, distanceMeters: 720 },
  { leftPercent: 51.1, topPx: 315, minutes: 3, distanceMeters: 360 },
  { leftPercent: 59.5, topPx: 341, minutes: 0, distanceMeters: 0 },
];

/** 位置、时间和距离由同一个快照驱动，避免三者不同步。 */
export const COURIER_ROUTE: Record<
  MovingTrackingStage,
  readonly CourierRouteSnapshot[]
> = {
  accepted: PICKUP_ROUTE,
  delivering: DELIVERY_ROUTE,
  arrived: [DELIVERY_ROUTE[DELIVERY_ROUTE.length - 1]!],
};

export function formatTrackingDistance(distanceMeters: number): string {
  if (distanceMeters < 1_000) {
    return `${distanceMeters}米`;
  }

  return `${(distanceMeters / 1_000).toFixed(1)}公里`;
}
