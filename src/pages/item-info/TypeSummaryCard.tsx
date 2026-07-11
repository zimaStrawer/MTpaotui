import iconChevron from '../../assets/nav/icon-chevron.svg';
import photoBouquet from '../../assets/item-info/photo-bouquet.jpg';
import {
  isFragileCategory,
  type InsuranceTier,
  type ItemCategory,
} from '../../data/models/order';
import { InsurancePanel } from '../../components/InsurancePanel';
import { CATEGORY_ICON } from './category-icons';
import { FieldHeader } from './FieldHeader';
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
  const categoryIcon = CATEGORY_ICON[category];

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
              className="flex min-h-11 items-center gap-1"
            >
              <span
                aria-hidden
                className="size-5 shrink-0 bg-accent-primary"
                style={{
                  WebkitMaskImage: `url("${categoryIcon.src}")`,
                  maskImage: `url("${categoryIcon.src}")`,
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                }}
              />
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
            <span className="absolute -top-1.5 -right-1.5 flex size-3.5 items-center justify-center rounded-full bg-bg-black">
              <svg viewBox="0 0 8 8" aria-hidden className="size-1.5">
                <path
                  d="M1.2 1.2l5.6 5.6M6.8 1.2L1.2 6.8"
                  stroke="var(--color-bg-container)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
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

      <InsurancePanel
        value={insurance}
        fragile={isFragileCategory(category)}
        onChange={onInsuranceChange}
      />
    </section>
  );
}
