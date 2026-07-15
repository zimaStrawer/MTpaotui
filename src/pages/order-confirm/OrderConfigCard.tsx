import iconChevron from '../../assets/nav/icon-chevron.svg';

const ROWS: { label: string; value: string; valueMuted?: boolean }[] = [
  { label: '取件时间', value: '立即取件' },
  { label: '收货码', value: '已开启' },
  { label: '小费', value: '加小费接单更快', valueMuted: true },
];

/** 订单配置行(955:8152):取件时间 / 收货码 / 小费,本期为视觉占位。 */
export function OrderConfigCard() {
  return (
    <section className="flex w-full flex-col gap-4 rounded-16 bg-bg-container px-4 py-3">
      {ROWS.map((row) => (
        <div key={row.label} className="flex items-center justify-between">
          <span className="text-body text-text-primary">{row.label}</span>
          <span className="flex items-center">
            <span
              className={
                row.valueMuted
                  ? 'text-body text-text-tertiary'
                  : 'text-body font-medium text-text-primary'
              }
            >
              {row.value}
            </span>
            <img src={iconChevron} alt="" className="size-3" />
          </span>
        </div>
      ))}
    </section>
  );
}
