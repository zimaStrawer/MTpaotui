import type { TrackingStage } from '../models/tracking';

/**
 * 压缩时间轴见 product.md §9：真实配送需要几十分钟，
 * 原型在 44 秒内展示完整流程。
 */
export const TRACKING_TIMELINE: readonly {
  stage: TrackingStage;
  /** 本档停留时长;终态为 0 */
  holdMs: number;
}[] = [
  { stage: 'accepting', holdMs: 10_000 },
  { stage: 'accepted', holdMs: 12_000 },
  { stage: 'delivering', holdMs: 12_000 },
  { stage: 'arrived', holdMs: 10_000 },
  { stage: 'completed', holdMs: 0 },
];
