/** 选中角标:右上角黄三角 + 勾(宿主自带 overflow-hidden 负责圆角) */
export function CornerCheck() {
  return (
    <span className="absolute top-0 right-0 size-4 bg-brand-primary [clip-path:polygon(0_0,100%_0,100%_100%)]">
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
