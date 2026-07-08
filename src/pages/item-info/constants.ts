import type { InsuranceTier, Volume } from '../../data/models/order';

/** 配送箱尺寸(设计稿参照物,也是详细尺寸的默认值 / 恢复默认目标) */
export const DELIVERY_BOX_CM: Volume = { l: 41, w: 30, h: 31 };

export const DEFAULT_WEIGHT_KG = 1;
export const WEIGHT_MAX_KG = 20;
export const WEIGHT_TICKS = [0, 5, 10, 15, 20];

export const DIMENSION_MAX_CM = 150;
export const DIMENSION_TICKS = [0, 50, 100, 150];

/** 设计文案:物品尺寸三边之和在 150 厘米内可正常配送 */
export const MAX_GIRTH_CM = 150;

export const INSURANCE_OPTIONS: {
  tier: Extract<InsuranceTier, 'tier1' | 'tier2'>;
  valueLabel: string;
  feeLabel: string;
}[] = [
  { tier: 'tier1', valueLabel: '价值500元及以下', feeLabel: '保价费¥1' },
  { tier: 'tier2', valueLabel: '价值501~1000元', feeLabel: '保价费¥2' },
];
