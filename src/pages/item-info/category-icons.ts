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
  餐饮: { src: iconCategoryFood, width: 32, height: 32 },
  文件: { src: iconCategoryDocument, width: 32, height: 32 },
  生鲜: { src: iconCategoryFresh, width: 32, height: 32 },
  蛋糕: { src: iconCategoryCake, width: 32, height: 32 },
  鲜花: { src: iconCategoryFlower, width: 32, height: 32 },
  数码: { src: iconCategoryDigital, width: 32, height: 32 },
  服饰: { src: iconCategoryClothing, width: 32, height: 32 },
  帮取快递: { src: iconCategoryExpress, width: 32, height: 32 },
  五金: { src: iconCategoryHardware, width: 32, height: 32 },
  汽配: { src: iconCategoryAutoParts, width: 32, height: 32 },
  其他: { src: iconCategoryOther, width: 32, height: 32 },
};
