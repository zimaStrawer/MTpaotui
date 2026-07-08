/** 领域模型(§5)· 按真实设计稿定义,mock 与将来的真后端共用同一套类型。 */

/** 首页业务 tab,本期只做「帮取送」 */
export type BusinessType = '帮取送' | '帮我买' | '帮个忙';

/** 取件 / 收件(地址页同一路由两种角色) */
export type AddressRole = 'pickup' | 'delivery';

export interface Address {
  role: AddressRole;
  contactName: string;
  phone: string;
  /** 如「景顺铂悦城9号楼」 */
  detail: string;
}

/** 物品品类,顺序即设计稿宫格顺序(frame 1380:20261,4 列 × 3 行) */
export const ITEM_CATEGORIES = [
  '餐饮',
  '文件',
  '生鲜',
  '蛋糕',
  '鲜花',
  '数码',
  '服饰',
  '帮取快递',
  '五金',
  '汽配',
  '其他',
] as const;
export type ItemCategory = (typeof ITEM_CATEGORIES)[number];

/**
 * 保价档位(frame 1380:20291 保价 slot):
 * none = 未保价(最高赔 5 倍跑腿费)/ tier1 = ≤500元 保价费¥1
 * tier2 = 501~1000元 保价费¥2 / custom = 自定义物品价值
 */
export type InsuranceTier = 'none' | 'tier1' | 'tier2' | 'custom';

/** 三维尺寸,单位 cm */
export interface Volume {
  l: number;
  w: number;
  h: number;
}

export interface Item {
  category: ItemCategory;
  /** 重量滑杆必有值(骑手取件时评估,5 公斤内不加价) */
  weightKg: number;
  /** 默认为配送箱尺寸,详细尺寸展开后可调 */
  volume: Volume;
  insurance: InsuranceTier;
  /** 物品描述 / 配送要求 */
  note?: string;
}

export type DeliveryVehicle = 'ebike' | 'car';

export interface Order {
  business: BusinessType;
  pickup: Address;
  delivery: Address;
  item: Item;
  vehicle: DeliveryVehicle;
  feeYuan: number;
}
