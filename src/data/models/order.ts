/** 产品领域模型见 product.md §10；Mock 与将来的真后端共用同一套类型。 */

/** 首页业务 tab,本期只做「帮取送」 */
export type BusinessType = '帮取送' | '帮我买' | '帮个忙';

/**
 * 帮取送子服务(首页服务选择卡,下单页沿用此预选):
 * send = 帮送 / pick = 帮取(取收地址互换)/ express = 1对1急送(强化帮送)
 */
export type ServiceMode = 'send' | 'pick' | 'express';

/** 一对一急送由平台锁定运力方案,不提供二轮车/汽车切换。 */
export function supportsVehicleSelection(mode: ServiceMode): boolean {
  return mode !== 'express';
}

/** 取件 / 收件(地址页同一路由两种角色) */
export type AddressRole = 'pickup' | 'delivery';

export interface Address {
  role: AddressRole;
  /** 地图定位点,如「龙井路·红棉书院」 */
  poi: string;
  /** 门牌号,与地址簿统一使用紧凑格式,如「3-2-1802」 */
  unit: string;
  contactName: string;
  /** 11 位数字,展示格式化见 lib/format */
  phone: string;
}

export interface OrderAddresses {
  pickup: Address | null;
  delivery: Address | null;
}

/** 交换取收地址时同步修正地址角色。 */
export function swapAddressRoles({
  pickup,
  delivery,
}: OrderAddresses): OrderAddresses {
  return {
    pickup:
      delivery === null ? null : { ...delivery, role: 'pickup' as const },
    delivery:
      pickup === null ? null : { ...pickup, role: 'delivery' as const },
  };
}

/** 仅帮送与帮取直接互切时交换地址；一对一急送继承当前地址顺序。 */
export function transitionServiceAddresses(
  previousMode: ServiceMode,
  nextMode: ServiceMode,
  addresses: OrderAddresses,
): OrderAddresses {
  const swapsSendAndPick =
    (previousMode === 'send' && nextMode === 'pick') ||
    (previousMode === 'pick' && nextMode === 'send');
  return swapsSendAndPick
    ? swapAddressRoles(addresses)
    : { pickup: addresses.pickup, delivery: addresses.delivery };
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

/** 易损品类:保价组件出「建议您保价」态,车型推荐倾向汽车 */
export const FRAGILE_CATEGORIES: readonly ItemCategory[] = [
  '鲜花',
  '蛋糕',
  '数码',
];

export function isFragileCategory(category: ItemCategory): boolean {
  return FRAGILE_CATEGORIES.includes(category);
}

/**
 * 保价档位(frame 1380:20291 保价 slot):
 * none = 未保价(最高赔 5 倍跑腿费)/ tier1 = ≤500元 保价费¥1
 * tier2 = 501~1000元 保价费¥2 / custom = 自定义物品价值
 */
export type InsuranceTier = 'none' | 'tier1' | 'tier2' | 'custom';

/** 物流页物品凭证顶部服务标识。汽车配送暂沿用普通服务标识。 */
export type ItemProofServiceVariant =
  | 'standard'
  | 'insurance'
  | 'express';

/** 一对一急送优先于保价展示；其余已保价订单展示保价服务。 */
export function resolveItemProofServiceVariant(
  serviceMode: ServiceMode,
  insurance: InsuranceTier,
): ItemProofServiceVariant {
  if (serviceMode === 'express') return 'express';
  return insurance === 'none' ? 'standard' : 'insurance';
}

/** 三维尺寸,单位 cm */
export interface Volume {
  l: number;
  w: number;
  h: number;
}

/** 配送箱参照尺寸,也是物品详细尺寸的默认值。 */
export const DEFAULT_DELIVERY_BOX_VOLUME: Volume = { l: 41, w: 30, h: 31 };
export const DEFAULT_ITEM_WEIGHT_KG = 1;
export const FREE_WEIGHT_LIMIT_KG = 5;
export const VOLUME_CAR_THRESHOLD_CM = 100;
export const VOLUME_MAX_GIRTH_CM = 150;

export type VolumeDeliveryStatus =
  | 'standard'
  | 'car-recommended'
  | 'oversize';

/** 三边和超过 150cm 视为超限；否则任一边超过 100cm 时建议汽车配送。 */
export function classifyVolumeDelivery(
  volume: Volume,
): VolumeDeliveryStatus {
  const girth = volume.l + volume.w + volume.h;
  if (girth > VOLUME_MAX_GIRTH_CM) return 'oversize';
  if (Math.max(volume.l, volume.w, volume.h) > VOLUME_CAR_THRESHOLD_CM) {
    return 'car-recommended';
  }
  return 'standard';
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
export type DeliveryService = 'standard' | 'express' | 'car';

/** 首页业务模式与载具选择共同确定下单及物流页使用的服务档位。 */
export function resolveDeliveryService(
  serviceMode: ServiceMode,
  vehicle: DeliveryVehicle,
): DeliveryService {
  if (serviceMode === 'express') return 'express';
  return vehicle === 'car' ? 'car' : 'standard';
}

interface CapacityInfoContext {
  serviceMode: ServiceMode;
  vehicle: DeliveryVehicle;
  pickup: Address | null;
}

export type CapacityInfoState = 'pickup-required' | 'visible' | 'hidden';

/**
 * 运力信息需要真实取件位置才能计算。帮送/帮取的汽车模式不展示骑手运力；
 * 一对一急送无载具切换,不受草稿中遗留车型影响。
 */
export function resolveCapacityInfoState({
  serviceMode,
  vehicle,
  pickup,
}: CapacityInfoContext): CapacityInfoState {
  if (pickup === null) return 'pickup-required';
  return !supportsVehicleSelection(serviceMode) || vehicle === 'ebike'
    ? 'visible'
    : 'hidden';
}

export interface Order {
  business: BusinessType;
  serviceMode: ServiceMode;
  pickup: Address;
  delivery: Address;
  item: Item;
  vehicle: DeliveryVehicle;
  feeYuan: number;
}
