import { describe, expect, it } from 'vitest';

import { formatYuanParts } from '../src/lib/money';

describe('formatYuanParts', () => {
  it('默认保留一位小数并拆分整数与小数', () => {
    expect(formatYuanParts(14.5)).toEqual({
      decimal: '5',
      formatted: '14.5',
      integer: '14',
    });
  });

  it('整数金额也保持统一的一位小数格式', () => {
    expect(formatYuanParts(15)).toEqual({
      decimal: '0',
      formatted: '15.0',
      integer: '15',
    });
  });

  it('允许不显示小数的保价费和划线原价', () => {
    expect(formatYuanParts(2, 0)).toEqual({
      decimal: '',
      formatted: '2',
      integer: '2',
    });
  });
});
