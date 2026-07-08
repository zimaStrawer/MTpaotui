import sliderThumb from '../../assets/item-info/slider-thumb.svg';

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
    <div className="w-full">
      <div className="flex justify-between">
        {ticks.map((tick) => (
          <div key={tick} className="flex flex-col items-center gap-1">
            <span className="text-caption font-medium text-text-quaternary">
              {tick}
            </span>
            <span className="h-1.5 w-px bg-text-quaternary" />
          </div>
        ))}
      </div>
      <div className="relative mt-2 h-5">
        <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-bg-page" />
        <div
          className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-brand-primary"
          style={{ width: `${percent}%` }}
        />
        <img
          src={sliderThumb}
          alt=""
          className="pointer-events-none absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${percent}%` }}
        />
        <input
          type="range"
          min={0}
          max={max}
          step={1}
          value={value}
          aria-label={ariaLabel}
          onChange={(event) => onChange(Number(event.target.value))}
          className="absolute inset-x-0 top-1/2 h-11 w-full -translate-y-1/2 cursor-pointer opacity-0"
        />
      </div>
    </div>
  );
}
