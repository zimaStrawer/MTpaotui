/** 配送追踪阶段见 product.md §9，completed 为终态。 */
export type TrackingStage =
  | 'accepting'
  | 'accepted'
  | 'delivering'
  | 'arrived'
  | 'completed';

export type ActiveTrackingStage = Exclude<TrackingStage, 'completed'>;

/** 时间轴推进顺序(压缩 mock 与进度条 UI 共用同一事实来源) */
export const TRACKING_STAGE_FLOW: readonly TrackingStage[] = [
  'accepting',
  'accepted',
  'delivering',
  'arrived',
  'completed',
];

export interface Courier {
  name: string;
  rating: number;
  satisfaction: number;
  /** 其他骑手能力标签；专业身份标签由当前订单的物品类型派生。 */
  badges: string[];
  /** 取件前 UI 显示 ✱✱✱✱，delivering 起揭示 4 位数字 */
  pickupCode?: string;
}
