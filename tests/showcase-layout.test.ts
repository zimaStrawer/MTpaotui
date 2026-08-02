import { describe, expect, it } from 'vitest';

import {
  MAX_PHONE_FRAME,
  PHONE_PRESETS,
  resolvePhoneFrameMetrics,
  resolvePhoneScale,
} from '../src/showcase/device-presets';

describe('Showcase 手机视窗', () => {
  it('只提供五个手机选项并以 375 × 812 为设计基准', () => {
    expect(PHONE_PRESETS.map(({ id }) => id)).toEqual([
      'phone-360',
      'phone-375',
      'phone-390',
      'phone-402',
      'phone-440',
    ]);
    expect(PHONE_PRESETS[1]).toMatchObject({ width: 375, height: 812 });
    expect(PHONE_PRESETS.map(({ width, height }) => [width, height])).toEqual([
      [360, 780],
      [375, 812],
      [390, 844],
      [402, 874],
      [440, 956],
    ]);
    expect(PHONE_PRESETS.map(({ label }) => label)).toEqual([
      'Compact',
      'Standard',
      'Medium',
      'Large',
      'Max',
    ]);
  });

  it('根据透明区域将 iframe 放入样机壳', () => {
    const metrics = resolvePhoneFrameMetrics(375, 812);

    expect(metrics.outerWidth).toBeGreaterThan(375);
    expect(metrics.outerHeight).toBeGreaterThan(812);
    expect(metrics.screenLeft).toBeGreaterThan(0);
    expect(metrics.screenTop).toBeGreaterThan(0);
  });

  it('所有设备使用由最大手机决定的统一缩放比例', () => {
    const scale = resolvePhoneScale({
      availableWidth: MAX_PHONE_FRAME.outerWidth + 24,
      availableHeight: MAX_PHONE_FRAME.outerHeight * 0.8 + 24,
    });

    expect(scale).toBeCloseTo(0.8);
  });

  it('空间充足时不放大超过原始尺寸', () => {
    expect(
      resolvePhoneScale({ availableWidth: 2_000, availableHeight: 2_000 }),
    ).toBe(1);
  });
});
