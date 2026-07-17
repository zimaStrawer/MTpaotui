import iconChevron from '../assets/nav/icon-chevron.svg';
import iconEdit from '../assets/item-info/icon-edit.svg';
import iconHelp from '../assets/item-info/icon-help.svg';
import logoShengxinsong from '../assets/item-info/logo-shengxinsong.svg';
import type { InsuranceTier } from '../data/models/order';
import { CornerCheck } from './CornerCheck';

const INSURANCE_OPTIONS: {
  tier: Extract<InsuranceTier, 'tier1' | 'tier2'>;
  valueLabel: string;
  feeLabel: string;
}[] = [
  { tier: 'tier1', valueLabel: '价值500元及以下', feeLabel: '保价费¥1' },
  { tier: 'tier2', valueLabel: '价值501~1000元', feeLabel: '保价费¥2' },
];

/** 缩小态展示的保价费(custom 无固定档,显示「自定义」) */
const COLLAPSED_FEE_LABEL: Record<InsuranceTier, string> = {
  none: '',
  tier1: '¥1',
  tier2: '¥2',
  custom: '自定义',
};

interface InsurancePanelProps {
  value: InsuranceTier;
  /** 易损品类(鲜花/蛋糕/数码)出「建议您保价」态 */
  fragile: boolean;
  onChange: (tier: InsuranceTier) => void;
}

/** 组件三变体(frame 1496:29632)= 一个派生状态字段 */
type PanelState = 'reminder' | 'suggest' | 'benefit';

const chipBase =
  'relative flex h-16 w-30 shrink-0 flex-col justify-center gap-1 overflow-hidden rounded-12 border px-2 text-left';
const chipSelected = 'border-brand-primary bg-brand-secondary';
const chipIdle = 'border-text-quaternary bg-bg-container';

/** 保价 slot(省心送保价服务):档位横滑,再点已选档位可取消。 */
export function InsurancePanel({ value, fragile, onChange }: InsurancePanelProps) {
  const state: PanelState =
    value !== 'none' ? 'benefit' : fragile ? 'suggest' : 'reminder';

  const toggle = (tier: InsuranceTier) =>
    onChange(value === tier ? 'none' : tier);

  return (
    <div className="relative w-full overflow-hidden rounded-8 bg-bg-page p-3">
      <div className="flex items-center gap-1">
        <img
          src={logoShengxinsong}
          alt="省心送保价服务"
          className="h-[25px] w-[92px] shrink-0"
        />
        <img src={iconHelp} alt="" className="size-4" />
      </div>
      {state === 'benefit' && (
        <p className="mt-1 text-caption-sm text-text-tertiary">
          享<span className="text-insurance-primary">高信用</span>骑手配送
          物丢物损<span className="text-insurance-primary">全额赔</span>
        </p>
      )}
      {state === 'suggest' && (
        <p className="mt-1 text-caption-sm text-alert">物品易损 建议您保价</p>
      )}
      {state === 'reminder' && (
        <p className="mt-1 text-caption-sm text-text-tertiary">
          未保价最高赔付<span className="text-accent-primary">5倍</span>配送费
        </p>
      )}
      <div className="mt-2 flex gap-2 overflow-x-auto pb-0.5">
        {INSURANCE_OPTIONS.map((option) => {
          const selected = value === option.tier;
          return (
            <button
              key={option.tier}
              type="button"
              onClick={() => toggle(option.tier)}
              className={`${chipBase} ${selected ? chipSelected : chipIdle}`}
            >
              {selected && <CornerCheck />}
              <span className="text-caption text-text-secondary">
                {option.valueLabel}
              </span>
              <span className="text-body font-medium text-text-primary">
                {option.feeLabel}
              </span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => toggle('custom')}
          className={`${chipBase} items-center ${value === 'custom' ? chipSelected : chipIdle}`}
        >
          {value === 'custom' && <CornerCheck />}
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

interface InsuranceCollapsedBarProps {
  tier: InsuranceTier;
  /** 点击展开为完整保价面板 */
  onExpand: () => void;
}

/** 已保价-缩小(1541:27854):前序流程已选保价时的单行态。 */
export function InsuranceCollapsedBar({ tier, onExpand }: InsuranceCollapsedBarProps) {
  return (
    <button
      type="button"
      onClick={onExpand}
      className="flex w-full items-center justify-between rounded-8 bg-bg-page p-2 text-left"
    >
      <span className="flex items-center gap-1 text-caption font-medium text-text-primary">
        保价费
        <span className="text-title font-semibold">
          {COLLAPSED_FEE_LABEL[tier]}
        </span>
      </span>
      <span className="flex items-center text-caption text-text-tertiary">
        省心送服务保障中
        <img src={iconChevron} alt="" className="size-3" />
      </span>
    </button>
  );
}
