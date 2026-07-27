interface TickSliderProps {
  value: number;
  max: number;
  ticks: number[];
  ariaLabel: string;
  onChange: (value: number) => void;
}

/** 带刻度的滑杆(重量 / 详细尺寸共用):黄条填充 + 白色圆钮,底层为原生 range。 */
export function TickSlider({ value, max, ticks, ariaLabel, onChange }: TickSliderProps) {
  const percent = (Math.min(value, max) / max) * 100;

  return (
    <div className="relative h-[52px] w-full">
      <div className="absolute inset-x-0 top-0 flex justify-between">
        {ticks.map((tick) => (
          <div key={tick} className="flex flex-col items-center gap-4">
            <span className="text-caption font-medium text-text-quaternary">
              {tick}
            </span>
            <span className="h-1.5 w-px bg-text-quaternary" />
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 top-8 h-2 rounded-full bg-page-bg" />
      <div
        className="absolute top-8 left-0 h-2 rounded-full bg-brand-primary"
        style={{ width: `${percent}%` }}
      />
      {/* 圆钮:白圆 + 双握持纹;阴影按 Elevation 规范带中性蓝调色相 */}
      <span
        className="pointer-events-none absolute top-[26px] flex size-5 -translate-x-1/2 items-center justify-center gap-[3px] rounded-full bg-container-bg shadow-[0_2px_6px_rgba(28,30,33,0.2)]"
        style={{ left: `${percent}%` }}
      >
        <span className="h-1.5 w-px rounded-full bg-text-quaternary" />
        <span className="h-1.5 w-px rounded-full bg-text-quaternary" />
      </span>
      <input
        type="range"
        min={0}
        max={max}
        step={1}
        value={value}
        aria-label={ariaLabel}
        onInput={(event) => onChange(Number(event.currentTarget.value))}
        className="absolute inset-x-0 top-2.5 h-11 w-full cursor-pointer opacity-0"
      />
    </div>
  );
}
