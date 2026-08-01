import iconSelected from '../../assets/item-info/icon-car-recommendation-selected.svg';

interface CarDeliveryRecommendationProps {
  selected: boolean;
  onChange: (selected: boolean) => void;
}

/** 大尺寸汽车配送推荐(node 1910:41781)，固定吸附在底部确认栏上方。 */
export function CarDeliveryRecommendation({
  selected,
  onChange,
}: CarDeliveryRecommendationProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onChange(!selected)}
      className="flex h-[33px] w-full items-center justify-between bg-highlight-bg px-3 py-2 text-left"
    >
      <span className="text-caption leading-normal text-highlight-primary">
        物品尺寸大，推荐使用汽车配送
      </span>
      {selected ? (
        <img src={iconSelected} alt="已选择汽车配送" className="size-4" />
      ) : (
        <span
          aria-label="未选择汽车配送"
          className="size-4 rounded-full border border-text-quaternary bg-container-bg"
        />
      )}
    </button>
  );
}
