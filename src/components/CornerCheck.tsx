interface CornerCheckProps {
  /** 服务卡使用急送主题；保价等通用选中态保持品牌黄。 */
  color?: 'brand' | 'service';
}

/** 选中角标：右上角三角 + 勾，颜色由宿主语义决定。 */
export function CornerCheck({ color = 'brand' }: CornerCheckProps) {
  return (
    <span
      className={`absolute top-0 right-0 size-4 [clip-path:polygon(0_0,100%_0,100%_100%)] ${
        color === 'service' ? 'bg-service-primary' : 'bg-brand-primary'
      }`}
    >
      <svg
        viewBox="0 0 8 8"
        aria-hidden
        className="absolute top-0.5 right-0.5 size-2"
      >
        <path
          d="M1.5 3.8l1.7 1.7L6.5 2.3"
          fill="none"
          stroke="var(--color-text-primary)"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
