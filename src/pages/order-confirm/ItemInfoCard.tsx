import iconChevron from '../../assets/nav/icon-chevron.svg';
import {
  InsuranceCollapsedBar,
  InsurancePanel,
} from '../../components/InsurancePanel';
import {
  isFragileCategory,
  type InsuranceTier,
  type Item,
} from '../../data/models/order';

interface ItemInfoCardProps {
  item: Item;
  /** 前序已保价时初始为缩小态,点击可展开 */
  insuranceCollapsed: boolean;
  onExpandInsurance: () => void;
  onInsuranceChange: (tier: InsuranceTier) => void;
  onNoteChange: (note: string) => void;
  onEditItem: () => void;
}

/** 物品信息卡(1113:12168):摘要行 + 保价(完整/缩小)+ 备注(与物品页同步)。 */
export function ItemInfoCard({
  item,
  insuranceCollapsed,
  onExpandInsurance,
  onInsuranceChange,
  onNoteChange,
  onEditItem,
}: ItemInfoCardProps) {
  return (
    <section className="flex w-full flex-col gap-2 rounded-16 bg-bg-container px-4 py-3">
      <button
        type="button"
        onClick={onEditItem}
        className="flex w-full items-center justify-between"
      >
        <span className="text-body text-text-primary">物品信息</span>
        <span className="flex items-center">
          <span className="text-caption font-medium text-text-primary">
            {item.category}/{item.weightKg}公斤
          </span>
          <img src={iconChevron} alt="" className="size-3" />
        </span>
      </button>

      {insuranceCollapsed ? (
        <InsuranceCollapsedBar
          tier={item.insurance}
          onExpand={onExpandInsurance}
        />
      ) : (
        <InsurancePanel
          value={item.insurance}
          fragile={isFragileCategory(item.category)}
          onChange={onInsuranceChange}
        />
      )}

      <input
        value={item.note ?? ''}
        onChange={(event) => onNoteChange(event.target.value)}
        placeholder="可备注物品描述、配送要求等"
        className="h-8 w-full rounded-8 bg-bg-page px-2 text-caption-sm text-text-primary placeholder:text-text-tertiary focus:outline-none"
      />
    </section>
  );
}
