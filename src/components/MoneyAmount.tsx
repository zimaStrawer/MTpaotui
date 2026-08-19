import { formatYuanParts } from '../lib/money';

type MoneyAmountVariant =
  | 'hero'
  | 'quote'
  | 'checkout'
  | 'summary'
  | 'insurance-option'
  | 'insurance-collapsed'
  | 'original';

interface MoneyAmountProps {
  className?: string;
  fractionDigits?: number;
  variant: MoneyAmountVariant;
  yuan: number;
}

const VARIANT_CLASSES: Record<
  MoneyAmountVariant,
  { currency: string; gap: string; integer: string; decimal: string }
> = {
  hero: {
    currency: 'font-number text-[16px] leading-[normal] font-bold',
    gap: 'gap-0.5',
    integer: 'font-ui text-[24px] leading-6 font-semibold',
    decimal: 'font-ui text-[18px] leading-6 font-semibold',
  },
  quote: {
    currency: 'font-ui text-[14px] leading-[17px] font-semibold',
    gap: 'gap-0.5',
    integer: 'font-number text-[20px] leading-5 font-bold',
    decimal: 'font-number text-[16px] leading-5 font-bold',
  },
  checkout: {
    currency: 'font-number text-[16px] leading-6 font-bold',
    gap: 'gap-0.5',
    integer: 'font-number text-[24px] leading-6 font-semibold',
    decimal: 'font-number text-[24px] leading-6 font-semibold',
  },
  summary: {
    currency: 'font-number text-[16px] leading-6 font-bold',
    gap: 'gap-0.5',
    integer: 'font-number text-[24px] leading-6 font-bold',
    decimal: 'font-number text-[24px] leading-6 font-bold',
  },
  'insurance-option': {
    currency: 'font-ui text-[14px] leading-5 font-medium',
    gap: 'gap-0',
    integer: 'font-ui text-[14px] leading-5 font-medium',
    decimal: 'font-ui text-[14px] leading-5 font-medium',
  },
  'insurance-collapsed': {
    currency: 'font-ui text-[18px] leading-[normal] font-semibold',
    gap: 'gap-0',
    integer: 'font-ui text-[18px] leading-[normal] font-semibold',
    decimal: 'font-ui text-[18px] leading-[normal] font-semibold',
  },
  original: {
    currency: 'font-number text-[16px] leading-[normal] font-normal',
    gap: 'gap-0',
    integer: 'font-number text-[16px] leading-[normal] font-normal',
    decimal: 'font-number text-[16px] leading-[normal] font-normal',
  },
};

/** 人民币金额：统一格式化、数字字体与跨字号基线。 */
export function MoneyAmount({
  className = '',
  fractionDigits = 1,
  variant,
  yuan,
}: MoneyAmountProps) {
  const { decimal, integer } = formatYuanParts(yuan, fractionDigits);
  const styles = VARIANT_CLASSES[variant];

  return (
    <span
      className={`inline-flex items-baseline whitespace-nowrap tabular-nums ${styles.gap} ${className}`}
    >
      <span className={styles.currency}>¥</span>
      <span className="text-[0px] leading-[0]">
        <span className={styles.integer}>
          {integer}
          {decimal && '.'}
        </span>
        {decimal && <span className={styles.decimal}>{decimal}</span>}
      </span>
    </span>
  );
}
