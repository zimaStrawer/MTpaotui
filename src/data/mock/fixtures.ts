import type { Address } from '../models/order';
import type { Courier } from '../models/tracking';

/**
 * 「七夕送花」场景锚点的 mock 数据。
 * 具体文案(店名、地址、骑手名)在做对应页面时按设计稿替换。
 */

export const MOCK_COURIER: Courier = {
  name: '谢师傅',
  rating: 4.5,
  satisfaction: 97.73,
  badges: ['信用骑手'],
  pickupCode: '8251',
};

export interface AddressBookEntry extends Omit<Address, 'role'> {
  /** runner = 常用定位地址(跑腿小人头像),initial = 姓氏首字头像 */
  avatar: 'runner' | 'initial';
}

const PICKUP_BOOK_ENTRY: AddressBookEntry = {
  poi: '龙井路·红棉书院',
  unit: '3-2-1802',
  contactName: '郑木生',
  phone: '13857180426',
  avatar: 'runner',
};

const DELIVERY_BOOK_ENTRY: AddressBookEntry = {
  poi: '小河直街·木棉花畔',
  unit: '5-1-1108',
  contactName: '叶淑柔',
  phone: '18605711108',
  avatar: 'initial',
};

function createScenarioAddress(
  role: Address['role'],
  entry: AddressBookEntry,
): Address {
  const { poi, unit, contactName, phone } = entry;
  return { role, poi, unit, contactName, phone };
}

/** 场景取件地址(frame 878:5645 已填态;定位的完整表单填充目标) */
export const SCENARIO_PICKUP_ADDRESS = createScenarioAddress(
  'pickup',
  PICKUP_BOOK_ENTRY,
);

/** 场景收件地址(frame 885:6377 已填态) */
export const SCENARIO_DELIVERY_ADDRESS = createScenarioAddress(
  'delivery',
  DELIVERY_BOOK_ENTRY,
);

/** 地址簿(frame 884:5711,取/收两页共用同一列表) */
export const MOCK_ADDRESS_BOOK: AddressBookEntry[] = [
  PICKUP_BOOK_ENTRY,
  DELIVERY_BOOK_ENTRY,
  {
    poi: '阿里西溪园区',
    unit: 'B区2号楼 0605',
    contactName: '郑木生',
    phone: '13857180426',
    avatar: 'initial',
  },
  {
    poi: '浙江省美术馆·策展办公室',
    unit: '207',
    contactName: '叶淑柔',
    phone: '18605711108',
    avatar: 'initial',
  },
  {
    poi: '浙大玉泉校区·教三楼',
    unit: '512',
    contactName: '郑木生',
    phone: '13857180426',
    avatar: 'initial',
  },
  {
    poi: '中国美院南山校区·南苑3号楼',
    unit: '0412',
    contactName: '叶淑柔',
    phone: '18605711108',
    avatar: 'initial',
  },
  {
    poi: '西溪诚园',
    unit: '22-2-0801',
    contactName: '郑木生',
    phone: '13857180426',
    avatar: 'initial',
  },
  {
    poi: '满觉陇·桂语山房',
    unit: '8号院',
    contactName: '叶淑柔',
    phone: '18605711108',
    avatar: 'initial',
  },
];

/** 首页价格条起步价(mock 报价,M4 接费用计算) */
export const MOCK_BASE_FEE_YUAN = 14.5;

/** 情境提示与车型推荐共用的原型环境上下文；界面固定展示为“大雨”，见 product.md §8、§10。 */
export const MOCK_WEATHER = 'rain' as const;
export const MOCK_DISTANCE_KM = 3.2;
