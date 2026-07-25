import type { TrackingStage } from '../models/tracking';

/**
 * 压缩时间轴见 product.md §7：真骑手流程几十分钟，测试等不了;
 * 下单后每 10–15 秒自动推进一档,参与者一分钟内看完整条弧线。
 * 每档时长 / 文案在 M5 按设计稿细调。
 */
export const TRACKING_TIMELINE: readonly {
  stage: TrackingStage;
  /** 本档停留时长;终态为 0 */
  holdMs: number;
}[] = [
  { stage: 'accepting', holdMs: 10_000 },
  { stage: 'accepted', holdMs: 12_000 },
  { stage: 'picked', holdMs: 12_000 },
  { stage: 'delivering', holdMs: 12_000 },
  { stage: 'arrived', holdMs: 10_000 },
  { stage: 'completed', holdMs: 0 },
];
