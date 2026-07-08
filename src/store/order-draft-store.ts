import { create } from 'zustand';

import { MOCK_SELF_ADDRESS } from '../data/mock/fixtures';
import type {
  Address,
  BusinessType,
  DeliveryVehicle,
  Item,
} from '../data/models/order';

/**
 * 下单流程草稿(UX 状态,仅内存,§9):
 * 首页选业务/载具 → 地址页两次(取 / 收)→ 物品信息 → 下单确认页读取汇总。
 * 不落盘;全退重开即干净起点,替代 reset 按钮。
 */
interface OrderDraftState {
  business: BusinessType;
  vehicle: DeliveryVehicle;
  pickup: Address | null;
  delivery: Address | null;
  item: Item | null;
}

interface OrderDraftActions {
  setBusiness: (business: BusinessType) => void;
  setVehicle: (vehicle: DeliveryVehicle) => void;
  /** role 已含在 Address 内,pickup / delivery 各占一槽 */
  setAddress: (address: Address) => void;
  setItem: (item: Item) => void;
  reset: () => void;
}

const initialState: OrderDraftState = {
  business: '帮取送',
  vehicle: 'ebike',
  /** 取件默认为「我的位置」定位 mock,真实实现来自定位服务 */
  pickup: MOCK_SELF_ADDRESS,
  delivery: null,
  item: null,
};

export const useOrderDraftStore = create<OrderDraftState & OrderDraftActions>()(
  (set) => ({
    ...initialState,
    setBusiness: (business) => set({ business }),
    setVehicle: (vehicle) => set({ vehicle }),
    setAddress: (address) =>
      set(
        address.role === 'pickup'
          ? { pickup: address }
          : { delivery: address },
      ),
    setItem: (item) => set({ item }),
    reset: () => set(initialState),
  }),
);
