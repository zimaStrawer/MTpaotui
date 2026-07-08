import type { Address } from '../models/order';
import type { Courier } from '../models/tracking';

/**
 * 「七夕送花」场景锚点的 mock 数据。
 * 具体文案(店名、地址、骑手名)在做对应页面时按设计稿替换。
 */

export const MOCK_COURIER: Courier = {
  name: '李师傅',
  rating: 4.9,
  badges: ['信用骑手', '鲜花使者'],
  pickupCode: '3721',
};

export const MOCK_PICKUP_ADDRESS: Address = {
  role: 'pickup',
  contactName: '花漾花店',
  phone: '13800000001',
  detail: '景顺铂悦城9号楼',
};

export const MOCK_DELIVERY_ADDRESS: Address = {
  role: 'delivery',
  contactName: '林小姐',
  phone: '13800000002',
  detail: '万象天地写字楼A座',
};

/** 情境提示(§0「事可感」)与车型推荐规则共用的环境上下文 */
export const MOCK_WEATHER = 'rain' as const;
export const MOCK_DISTANCE_KM = 3.2;
