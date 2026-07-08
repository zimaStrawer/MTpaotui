import iconEdit from '../../assets/item-info/icon-edit.svg';
import iconHelp from '../../assets/item-info/icon-help.svg';
import logoShengxinsong from '../../assets/item-info/logo-shengxinsong.svg';
import type { InsuranceTier } from '../../data/models/order';
import { INSURANCE_OPTIONS } from './constants';

interface InsurancePanelProps {
  value: InsuranceTier;
  onChange: (tier: InsuranceTier) => void;
}

const chipBase =
  'flex h-16 w-30 shrink-0 flex-col justify-center gap-1 rounded-12 border px-2 text-left';
const chipSelected = 'border-insurance-primary bg-insurance-secondary';
const chipIdle = 'border-text-quaternary bg-bg-container';

/** 保价 slot(frame 1496:29444):省心送保价服务,档位横滑;再点已选档位可取消。 */
export function InsurancePanel({ value, onChange }: InsurancePanelProps) {
  const toggle = (tier: InsuranceTier) =>
    onChange(value === tier ? 'none' : tier);

  return (
    <div className="relative w-full overflow-hidden rounded-8 bg-bg-page p-3">
      <div className="flex items-center gap-1">
        <img src={logoShengxinsong} alt="省心送保价服务" className="h-6" />
        <img src={iconHelp} alt="" className="size-3.5" />
      </div>
      <p className="mt-1 text-caption-sm text-text-tertiary">
        未保价最高赔付<span className="text-accent-primary">5倍</span>配送费
      </p>
      <div className="mt-2 flex gap-2 overflow-x-auto pb-0.5">
        {INSURANCE_OPTIONS.map((option) => (
          <button
            key={option.tier}
            type="button"
            onClick={() => toggle(option.tier)}
            className={`${chipBase} ${value === option.tier ? chipSelected : chipIdle}`}
          >
            <span className="text-caption text-text-secondary">
              {option.valueLabel}
            </span>
            <span className="text-body font-medium text-text-primary">
              {option.feeLabel}
            </span>
          </button>
        ))}
        <button
          type="button"
          onClick={() => toggle('custom')}
          className={`${chipBase} items-center ${value === 'custom' ? chipSelected : chipIdle}`}
        >
          <span className="flex items-center gap-1">
            <img src={iconEdit} alt="" className="size-4" />
            <span className="text-caption text-text-secondary">
              自定义物品价值
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
