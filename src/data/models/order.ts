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

export type ItemCategory = '鲜花' | '文件' | '数码' | '食品' | '其他';

/** free_5x = 未保价(最高赔 5 倍跑腿费)/ paid = 保价 */
export type InsuranceTier = 'none' | 'free_5x' | 'paid';

export interface Item {
  category: ItemCategory;
  weightKg?: number;
  /** 三维体积,单位 cm */
  volume?: { l: number; w: number; h: number };
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
