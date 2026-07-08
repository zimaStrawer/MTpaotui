import iconChevron from '../../assets/nav/icon-chevron.svg';
import iconFlower from '../../assets/item-info/icon-flower.svg';
import iconRemoveBadge from '../../assets/item-info/icon-remove-badge.svg';
import photoBouquet from '../../assets/item-info/photo-bouquet.jpg';
import type { InsuranceTier, ItemCategory } from '../../data/models/order';
import { FieldHeader } from './FieldHeader';
import { InsurancePanel } from './InsurancePanel';
import { ProhibitedNote } from './ProhibitedNote';

interface TypeSummaryCardProps {
  category: ItemCategory;
  note: string;
  insurance: InsuranceTier;
  onReopenCategory: () => void;
  onNoteChange: (note: string) => void;
  onInsuranceChange: (tier: InsuranceTier) => void;
}

/**
 * 类型收起卡(frame 1380:20297,类型已选态):
 * 已选品类(点击返回重选)+ 物品照片与备注(物可见)+ 保价 slot。
 * 照片为「七夕送花」场景 mock,仅鲜花品类展示。
 */
export function TypeSummaryCard({
  category,
  note,
  insurance,
  onReopenCategory,
  onNoteChange,
  onInsuranceChange,
}: TypeSummaryCardProps) {
  return (
    <section className="flex w-full flex-col gap-3 rounded-16 bg-bg-container px-4 py-3">
      <div className="flex flex-col gap-2">
        <FieldHeader
          label="类型"
          required
          right={
            <button
              type="button"
              onClick={onReopenCategory}
              className="flex min-h-11 items-center"
            >
              {category === '鲜花' && (
                <img src={iconFlower} alt="" className="size-5" />
              )}
              <span className="text-body font-medium text-accent-primary">
                {category}
              </span>
              <img src={iconChevron} alt="" className="size-3.5 rotate-180" />
            </button>
          }
        />
        <ProhibitedNote />
      </div>

      <div className="flex items-center gap-3">
        {category === '鲜花' && (
          <span className="relative shrink-0">
            <img
              src={photoBouquet}
              alt="物品照片"
              className="size-12 rounded-8 object-cover"
            />
            <img
              src={iconRemoveBadge}
              alt=""
              className="absolute -top-1.5 -right-1.5 size-3.5"
            />
          </span>
        )}
        <textarea
          value={note}
          onChange={(event) => onNoteChange(event.target.value)}
          placeholder="可备注物品描述、配送要求等"
          rows={2}
          className="h-12 flex-1 resize-none rounded-8 bg-bg-page p-2 text-caption-sm text-text-primary placeholder:text-text-tertiary focus:outline-none"
        />
      </div>

      <InsurancePanel value={insurance} onChange={onInsuranceChange} />
    </section>
  );
}
