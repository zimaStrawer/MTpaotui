import { create } from 'zustand';

import type { Address, BusinessType, Item } from '../data/models/order';

/**
 * 下单流程草稿(UX 状态,仅内存,§9):
 * 首页选业务 → 地址页两次(取 / 收)→ 物品信息 → 下单确认页读取汇总。
 * 不落盘;全退重开即干净起点,替代 reset 按钮。
 */
interface OrderDraftState {
  business: BusinessType;
  pickup: Address | null;
  delivery: Address | null;
  item: Item | null;
}

interface OrderDraftActions {
  setBusiness: (business: BusinessType) => void;
  /** role 已含在 Address 内,pickup / delivery 各占一槽 */
  setAddress: (address: Address) => void;
  setItem: (item: Item) => void;
  reset: () => void;
}

const initialState: OrderDraftState = {
  business: '帮取送',
  pickup: null,
  delivery: null,
  item: null,
};

export const useOrderDraftStore = create<OrderDraftState & OrderDraftActions>()(
  (set) => ({
    ...initialState,
    setBusiness: (business) => set({ business }),
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
