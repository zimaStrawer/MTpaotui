import { describe, expect, it } from 'vitest';

import {
  TRACKING_NOTICES,
  TRACKING_NOTICE_INTERVAL_MS,
} from '../src/pages/tracking/tracking-notices';

describe('物流页配送提示轮播', () => {
  it('展示四条配送提示，并每 6 秒切换', () => {
    expect(TRACKING_NOTICE_INTERVAL_MS).toBe(6_000);
    expect(TRACKING_NOTICES).toEqual([
      '细雨连绵，骑手赶路不易，会尽全力为您配送',
      '骑手位置持续更新，请留意最新配送进度',
      '请保持电话畅通，方便骑手及时联系',
      '收到物品后请当面确认，再完成安全签收',
    ]);
  });
});
