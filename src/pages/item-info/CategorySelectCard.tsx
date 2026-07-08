import iconChevron from '../../assets/nav/icon-chevron.svg';
import categoryGrid from '../../assets/item-info/category-grid.png';
import iconAiSpark from '../../assets/item-info/icon-ai-spark.svg';
import iconCamera from '../../assets/item-info/icon-camera.svg';
import { ITEM_CATEGORIES, type ItemCategory } from '../../data/models/order';
import { FieldHeader } from './FieldHeader';
import { ProhibitedNote } from './ProhibitedNote';

interface CategorySelectCardProps {
  onSelect: (category: ItemCategory) => void;
}

/**
 * 物品类型选择卡(frame 1380:20288)。
 * 品类宫格在设计稿中为整图导出,以透明热区网格(4 列 × 3 行,与图内布局对齐)承接点击。
 */
export function CategorySelectCard({ onSelect }: CategorySelectCardProps) {
  return (
    <section className="w-full rounded-16 bg-bg-container px-4 py-3">
      <div className="flex flex-col gap-2">
        <FieldHeader
          label="类型"
          required
          right={
            <span className="flex items-center text-caption text-text-tertiary">
              禁送清单
              <img src={iconChevron} alt="" className="size-3.5 rotate-180" />
            </span>
          }
        />
        <ProhibitedNote />
      </div>

      <div className="mt-2 flex h-12 items-center gap-2 rounded-8 bg-bg-page px-3">
        <span className="relative shrink-0">
          <img src={iconCamera} alt="" className="size-6" />
          <img
            src={iconAiSpark}
            alt=""
            className="absolute -top-1 -left-1 size-3"
          />
        </span>
        <span className="h-4 w-px bg-text-quaternary" />
        <p className="text-body text-text-tertiary">
          上传照片识别物品，匹配更合适的骑手
        </p>
      </div>

      <div className="relative mx-auto mt-3 w-full max-w-[317px]">
        <img src={categoryGrid} alt="" className="w-full" />
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-3">
          {ITEM_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              aria-label={category}
              onClick={() => onSelect(category)}
              className="active:rounded-8 active:bg-text-primary/5"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
