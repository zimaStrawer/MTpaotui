import iconCake from '../../assets/tracking/icon-courier-cake.webp';
import iconDocument from '../../assets/tracking/icon-courier-document.webp';
import iconFlower from '../../assets/tracking/icon-courier-flower.webp';
import {
  resolveCourierSpecialtyLabel,
  type CourierSpecialtyLabel,
  type ItemCategory,
} from '../../data/models/order';

interface CourierSpecialtyBadgeProps {
  itemCategory: ItemCategory;
}

const SPECIALTY_STYLES: Record<
  CourierSpecialtyLabel,
  { background: string; icon?: string }
> = {
  鲜花使者: { background: 'bg-[#fee1e3]', icon: iconFlower },
  蛋糕天使: { background: 'bg-[#fff0ca]', icon: iconCake },
  文件保镖: { background: 'bg-[#fff7f2]', icon: iconDocument },
  美团跑腿: { background: 'bg-brand-primary' },
};

/** 专业骑手标签组件(node 1902:22758)，展示内容由物品类型派生。 */
export function CourierSpecialtyBadge({
  itemCategory,
}: CourierSpecialtyBadgeProps) {
  const label = resolveCourierSpecialtyLabel(itemCategory);
  const { background, icon } = SPECIALTY_STYLES[label];

  return (
    <span
      className={`flex shrink-0 items-center rounded-4 px-[4.5px] py-[1.5px] ${background}`}
    >
      {icon && <img src={icon} alt="" className="size-4 object-contain" />}
      <span className="font-brand text-caption-sm leading-normal text-text-primary">
        {label}
      </span>
    </span>
  );
}
