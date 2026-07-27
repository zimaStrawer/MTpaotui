import { describe, expect, it } from 'vitest';

import { TRACKING_TIMELINE } from '../src/data/mock/tracking-timeline';
import { TRACKING_STAGE_FLOW } from '../src/data/models/tracking';

describe('配送追踪时间轴', () => {
  it('严格遵循领域阶段顺序', () => {
    expect(TRACKING_TIMELINE.map(({ stage }) => stage)).toEqual(
      TRACKING_STAGE_FLOW,
    );
  });

  it('完成态是唯一零停留终态', () => {
    expect(TRACKING_TIMELINE.at(-1)).toEqual({
      stage: 'completed',
      holdMs: 0,
    });
    expect(
      TRACKING_TIMELINE.slice(0, -1).every(({ holdMs }) => holdMs > 0),
    ).toBe(true);
  });

  it('压缩流程可在一分钟内完成', () => {
    const totalMs = TRACKING_TIMELINE.reduce(
      (sum, { holdMs }) => sum + holdMs,
      0,
    );
    expect(totalMs).toBeLessThanOrEqual(60_000);
  });
});
