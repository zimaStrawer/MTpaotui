import { create } from 'zustand';

import {
  swapAddressRoles,
  transitionServiceAddresses,
  type Address,
  type BusinessType,
  type DeliveryVehicle,
  type Item,
  type ServiceMode,
} from '../data/models/order';
import type { OrderReceipt } from '../data/repositories';

/**
 * 下单流程草稿(仅内存,见 tech.md §2):
 * 首页选业务/服务/载具 → 地址页两次(取 / 收)→ 物品信息 → 下单确认页读取汇总。
 * 不落盘;全退重开即干净起点,替代 reset 按钮。
 */
interface OrderDraftState {
  business: BusinessType;
  /** 帮送/帮取/急送,下单页据此预选业务配置 */
  serviceMode: ServiceMode;
  vehicle: DeliveryVehicle;
  pickup: Address | null;
  delivery: Address | null;
  item: Item | null;
  /** 提交订单后的受理结果,追踪页(M5)据此订阅时间轴 */
  receipt: OrderReceipt | null;
}

interface OrderDraftActions {
  /** 仅帮送↔帮取直接互切时交换地址;急送继承当前地址顺序 */
  setServiceMode: (mode: ServiceMode) => void;
  setVehicle: (vehicle: DeliveryVehicle) => void;
  /** role 已含在 Address 内,pickup / delivery 各占一槽 */
  setAddress: (address: Address) => void;
  /** 取/收地址互换(缩略地图互换按钮) */
  swapAddresses: () => void;
  setItem: (item: Item) => void;
  setReceipt: (receipt: OrderReceipt) => void;
  reset: () => void;
}

const initialState: OrderDraftState = {
  business: '帮取送',
  serviceMode: 'send',
  vehicle: 'ebike',
  /** 不预填:让参与者完整体验取/收地址填写流程 */
  pickup: null,
  delivery: null,
  item: null,
  receipt: null,
};

export const useOrderDraftStore = create<OrderDraftState & OrderDraftActions>()(
  (set) => ({
    ...initialState,
    setServiceMode: (mode) =>
      set((state) => ({
        serviceMode: mode,
        ...transitionServiceAddresses(state.serviceMode, mode, state),
      })),
    setVehicle: (vehicle) => set({ vehicle }),
    setAddress: (address) =>
      set(
        address.role === 'pickup'
          ? { pickup: address }
          : { delivery: address },
      ),
    swapAddresses: () =>
      set((state) => swapAddressRoles(state)),
    setItem: (item) => set({ item }),
    setReceipt: (receipt) => set({ receipt }),
    reset: () => set(initialState),
  }),
);
