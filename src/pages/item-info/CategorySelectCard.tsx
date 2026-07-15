import iconChevron from '../../assets/nav/icon-chevron.svg';
import iconAiSpark from '../../assets/item-info/icon-ai-spark.svg';
import iconCamera from '../../assets/item-info/icon-camera.svg';
import { ITEM_CATEGORIES, type ItemCategory } from '../../data/models/order';
import { CATEGORY_ICON } from './category-icons';
import { FieldHeader } from './FieldHeader';
import { ProhibitedNote } from './ProhibitedNote';

interface CategorySelectCardProps {
  onSelect: (category: ItemCategory) => void;
}

/**
 * 物品类型选择卡(frame 1380:20288)。
 * 品类宫格使用 Figma 导出的独立 SVG,按钮本身承接展示与点击。
 */
export function CategorySelectCard({ onSelect }: CategorySelectCardProps) {
  return (
    <section className="w-full rounded-16 bg-bg-container px-4 pt-3 pb-4">
      <div className="flex flex-col gap-2">
        <FieldHeader
          label="类型"
          required
          right={
            <span className="flex items-center text-caption text-text-tertiary">
              禁送清单
              <img src={iconChevron} alt="" className="size-3" />
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

      <div className="mt-2 grid w-full grid-cols-4 gap-2">
        {ITEM_CATEGORIES.map((category) => {
          const icon = CATEGORY_ICON[category];
          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelect(category)}
              className="flex aspect-square min-w-0 flex-col items-center justify-center rounded-8 bg-bg-page text-body font-normal text-text-primary transition-colors active:bg-text-primary/5 motion-reduce:transition-none"
            >
              <span className="flex size-8 items-center justify-center">
                <img
                  src={icon.src}
                  alt=""
                  style={{ width: icon.width, height: icon.height }}
                />
              </span>
              <span>{category}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
