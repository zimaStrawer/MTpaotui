/** 11 位手机号 → 「138 5718 0426」(3-4-4 分组) */
export function formatPhone(digits: string): string {
  if (digits.length !== 11) return digits;
  return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
}

/** 11 位手机号 → 「138 **** 0426」(地址簿脱敏展示) */
export function maskPhone(digits: string): string {
  if (digits.length !== 11) return digits;
  return `${digits.slice(0, 3)} **** ${digits.slice(7)}`;
}
