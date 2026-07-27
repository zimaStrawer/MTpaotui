import { describe, expect, it } from 'vitest';

import {
  COURIER_ROUTE,
  COURIER_SCREEN_POSITION,
  LOCATION_REFRESH_MS,
  formatTrackingDistance,
} from '../src/data/mock/tracking-route';

describe('配送路线快照', () => {
  it('取件和送件均使用 6 个快照并每 2 秒更新', () => {
    expect(LOCATION_REFRESH_MS).toBe(2_000);
    expect(COURIER_ROUTE.accepted).toHaveLength(6);
    expect(COURIER_ROUTE.delivering).toHaveLength(6);
  });

  it.each(['accepted', 'delivering'] as const)(
    '%s 路线从统一起点单调移动到统一终点',
    (stage) => {
      const route = COURIER_ROUTE[stage];

      expect(route[0]).toMatchObject(COURIER_SCREEN_POSITION.start);
      expect(route.at(-1)).toMatchObject(COURIER_SCREEN_POSITION.end);

      route.slice(1).forEach((snapshot, index) => {
        const previous = route[index]!;
        expect(snapshot.leftPercent).toBeGreaterThan(previous.leftPercent);
        expect(snapshot.topPx).toBeGreaterThan(previous.topPx);
        expect(snapshot.minutes).toBeLessThanOrEqual(previous.minutes);
        expect(snapshot.distanceMeters).toBeLessThan(
          previous.distanceMeters,
        );
      });
    },
  );

  it('使用确认后的两段时间与距离', () => {
    expect(COURIER_ROUTE.accepted.map(({ minutes, distanceMeters }) => [
      minutes,
      distanceMeters,
    ])).toEqual([
      [5, 650],
      [4, 520],
      [3, 390],
      [2, 260],
      [1, 130],
      [0, 0],
    ]);
    expect(COURIER_ROUTE.delivering.map(({ minutes, distanceMeters }) => [
      minutes,
      distanceMeters,
    ])).toEqual([
      [12, 1_800],
      [10, 1_440],
      [8, 1_080],
      [6, 720],
      [3, 360],
      [0, 0],
    ]);
  });

  it('按米和公里展示距离', () => {
    expect(formatTrackingDistance(0)).toBe('0米');
    expect(formatTrackingDistance(720)).toBe('720米');
    expect(formatTrackingDistance(1_080)).toBe('1.1公里');
    expect(formatTrackingDistance(1_440)).toBe('1.4公里');
    expect(formatTrackingDistance(1_800)).toBe('1.8公里');
  });

  it('到达阶段停留在送件路线终点', () => {
    expect(COURIER_ROUTE.arrived).toEqual([
      {
        ...COURIER_SCREEN_POSITION.end,
        minutes: 0,
        distanceMeters: 0,
      },
    ]);
  });
});
