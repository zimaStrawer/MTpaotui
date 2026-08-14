import { describe, expect, it } from 'vitest';

import {
  HOME_SAFETY_NOTICES,
  HOME_SAFETY_NOTICE_INTERVAL_MS,
} from '../src/pages/home/safety-notices';

describe('首页安全提示轮播', () => {
  it('按确认顺序展示四条提示，并每 6 秒切换', () => {
    expect(HOME_SAFETY_NOTICE_INTERVAL_MS).toBe(6_000);
    expect(HOME_SAFETY_NOTICES).toEqual([
      '隐藏真实手机号码，保护您的隐私',
      '请勿运输黄金及现金',
      '开启收获码，确保安全签收',
      '购买保价，若发生货损，最高全额赔付',
    ]);
  });
});
