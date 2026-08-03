import iconChevron from '../../assets/nav/icon-chevron-16.svg';
import iconClose from '../../assets/nav/icon-close-12.svg';
import photoBouquet from '../../assets/item-info/photo-bouquet.webp';
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
    <section className="flex h-[276px] w-full flex-col gap-3 overflow-hidden rounded-16 bg-container-bg px-4 py-3">
      <div className="flex flex-col gap-2">
        <FieldHeader
          label="类型"
          required
          right={
            <button
              type="button"
              onClick={onReopenCategory}
              className="flex h-5 items-center"
            >
              <span
                aria-hidden
                className="size-5 shrink-0 bg-highlight-primary"
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
              <span className="text-body font-medium text-highlight-primary">
                {category}
              </span>
              <span
                aria-hidden
                className="size-4 shrink-0 bg-highlight-primary"
                style={{
                  WebkitMaskImage: `url("${iconChevron}")`,
                  maskImage: `url("${iconChevron}")`,
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                }}
              />
            </button>
          }
        />
        <ProhibitedNote />
      </div>

      <div className="flex h-[195px] shrink-0 flex-col gap-2">
        <div className="flex h-12 shrink-0 items-center gap-3">
          {category === '鲜花' && (
            <span className="relative shrink-0">
              <img
                src={photoBouquet}
                alt="物品照片"
                loading="lazy"
                decoding="async"
                className="size-12 rounded-8 object-cover"
              />
              <span className="absolute -top-1.5 -right-1.5 flex size-3.5 items-center justify-center rounded-full bg-mask-bg">
                <span
                  aria-hidden
                  className="size-3 bg-container-bg"
                  style={{
                    WebkitMaskImage: `url("${iconClose}")`,
                    maskImage: `url("${iconClose}")`,
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                  }}
                />
              </span>
            </span>
          )}
          <textarea
            value={note}
            onChange={(event) => onNoteChange(event.target.value)}
            placeholder="可备注物品描述、配送要求等"
            rows={2}
            className="h-12 flex-1 resize-none rounded-8 bg-page-bg p-2 text-caption-sm text-text-primary placeholder:text-text-tertiary focus:outline-none"
          />
        </div>

        <InsurancePanel
          value={insurance}
          fragile={isFragileCategory(category)}
          onChange={onInsuranceChange}
        />
      </div>
    </section>
  );
}
