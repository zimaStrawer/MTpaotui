/** 配送追踪阶段见 product.md §9，completed 为终态。 */
export type TrackingStage =
  | 'accepting'
  | 'accepted'
  | 'picked'
  | 'delivering'
  | 'arrived'
  | 'completed';

/** 时间轴推进顺序(压缩 mock 与进度条 UI 共用同一事实来源) */
export const TRACKING_STAGE_FLOW: readonly TrackingStage[] = [
  'accepting',
  'accepted',
  'picked',
  'delivering',
  'arrived',
  'completed',
];

export interface Courier {
  name: string;
  rating: number;
  satisfaction: number;
  /** 信用骑手 / 鲜花使者 / 大件御用 / 极速神通 */
  badges: string[];
  /** 取件前 UI 显示 ✱✱✱✱,picked 起揭示 4 位数字 */
  pickupCode?: string;
}
