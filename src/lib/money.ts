export interface YuanParts {
  decimal: string;
  formatted: string;
  integer: string;
}

/** 将元金额规范化为可分别排版的整数与小数部分。 */
export function formatYuanParts(
  yuan: number,
  fractionDigits = 1,
): YuanParts {
  const formatted = yuan.toFixed(fractionDigits);
  const [integer = '0', decimal = ''] = formatted.split('.');

  return { decimal, formatted, integer };
}
