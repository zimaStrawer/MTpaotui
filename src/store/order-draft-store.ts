import { create } from 'zustand';

import type {
  Address,
  BusinessType,
  DeliveryVehicle,
  Item,
  ServiceMode,
} from '../data/models/order';
import type { OrderReceipt } from '../data/repositories';

/**
 * 下单流程草稿(UX 状态,仅内存,§9):
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
  setBusiness: (business: BusinessType) => void;
  /** 帮送↔帮取 切换时,已填的取/收地址互换;急送为强化帮送,与帮送共用地址 */
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
    setBusiness: (business) => set({ business }),
    setServiceMode: (mode) =>
      set((state) => {
        const wasPick = state.serviceMode === 'pick';
        const isPick = mode === 'pick';
        if (wasPick === isPick) return { serviceMode: mode };
        return {
          serviceMode: mode,
          pickup:
            state.delivery === null
              ? null
              : { ...state.delivery, role: 'pickup' },
          delivery:
            state.pickup === null
              ? null
              : { ...state.pickup, role: 'delivery' },
        };
      }),
    setVehicle: (vehicle) => set({ vehicle }),
    setAddress: (address) =>
      set(
        address.role === 'pickup'
          ? { pickup: address }
          : { delivery: address },
      ),
    swapAddresses: () =>
      set((state) => ({
        pickup:
          state.delivery === null
            ? null
            : { ...state.delivery, role: 'pickup' },
        delivery:
          state.pickup === null
            ? null
            : { ...state.pickup, role: 'delivery' },
      })),
    setItem: (item) => set({ item }),
    setReceipt: (receipt) => set({ receipt }),
    reset: () => set(initialState),
  }),
);
