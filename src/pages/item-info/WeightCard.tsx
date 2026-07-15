import iconHelp from '../../assets/item-info/icon-help.svg';
import { WEIGHT_FREE_KG, WEIGHT_MAX_KG, WEIGHT_TICKS } from './constants';
import { FieldHeader } from './FieldHeader';
import { TickSlider } from './TickSlider';

interface WeightCardProps {
  weightKg: number;
  onChange: (weightKg: number) => void;
}

/** 重量卡(frame 1380:20298):大数字 + 0–20 公斤刻度滑杆。 */
export function WeightCard({ weightKg, onChange }: WeightCardProps) {
  return (
    <section className="flex w-full flex-col gap-2 rounded-16 bg-bg-container px-4 py-3">
      <FieldHeader
        label="重量"
        required
        right={
          <span className="flex items-center gap-1 text-caption text-text-tertiary">
            不知道重量怎么办
            <img src={iconHelp} alt="" className="size-4" />
          </span>
        }
      />
      <p className="text-caption-sm text-text-tertiary">
        骑手取件时会评估物品重量, 5公斤内不加价, 超重需补齐差价
      </p>
      <div className="flex items-end justify-center gap-1 py-1">
        {weightKg < WEIGHT_FREE_KG && (
          <span className="text-body font-medium text-text-primary">小于</span>
        )}
        <span className="font-number text-display-lg font-medium text-text-primary">
          {Math.max(weightKg, WEIGHT_FREE_KG)}
        </span>
        <span className="text-body font-medium text-text-primary">公斤</span>
      </div>
      <TickSlider
        value={weightKg}
        max={WEIGHT_MAX_KG}
        ticks={WEIGHT_TICKS}
        ariaLabel="物品重量(公斤)"
        onChange={onChange}
      />
    </section>
  );
}
