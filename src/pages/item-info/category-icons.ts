import iconCategoryAutoParts from '../../assets/item-info/icon-category-auto-parts.svg';
import iconCategoryCake from '../../assets/item-info/icon-category-cake.svg';
import iconCategoryClothing from '../../assets/item-info/icon-category-clothing.svg';
import iconCategoryDigital from '../../assets/item-info/icon-category-digital.svg';
import iconCategoryDocument from '../../assets/item-info/icon-category-document.svg';
import iconCategoryExpress from '../../assets/item-info/icon-category-express.svg';
import iconCategoryFlower from '../../assets/item-info/icon-category-flower.svg';
import iconCategoryFood from '../../assets/item-info/icon-category-food.svg';
import iconCategoryFresh from '../../assets/item-info/icon-category-fresh.svg';
import iconCategoryHardware from '../../assets/item-info/icon-category-hardware.svg';
import iconCategoryOther from '../../assets/item-info/icon-category-other.svg';
import type { ItemCategory } from '../../data/models/order';

export const CATEGORY_ICON: Record<
  ItemCategory,
  { src: string; width: number; height: number }
> = {
  餐饮: { src: iconCategoryFood, width: 21.68, height: 22.8 },
  文件: { src: iconCategoryDocument, width: 24.35, height: 20.88 },
  生鲜: { src: iconCategoryFresh, width: 23.21, height: 24.52 },
  蛋糕: { src: iconCategoryCake, width: 22.95, height: 25.41 },
  鲜花: { src: iconCategoryFlower, width: 19.69, height: 25.41 },
  数码: { src: iconCategoryDigital, width: 24.89, height: 21.63 },
  服饰: { src: iconCategoryClothing, width: 27, height: 23.16 },
  帮取快递: { src: iconCategoryExpress, width: 24.22, height: 21.44 },
  五金: { src: iconCategoryHardware, width: 24.47, height: 24 },
  汽配: { src: iconCategoryAutoParts, width: 28.73, height: 20.28 },
  其他: { src: iconCategoryOther, width: 22, height: 22 },
};
