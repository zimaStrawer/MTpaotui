import type { Order } from '../models/order';
import type { Courier, TrackingStage } from '../models/tracking';

/** 订单受理结果:骑手与收货码由「服务端」分配 */
export interface OrderReceipt {
  orderId: string;
  courier: Courier;
}

export type Unsubscribe = () => void;

/**
 * 数据层唯一入口见 tech.md §2。页面 / store 只依赖本接口;
 * 接真 API 时新增 HttpOrderRepository,改 index.ts 一处注入即可。
 */
export interface OrderRepository {
  submitOrder(order: Order): Promise<OrderReceipt>;
  /** 订阅配送阶段推进；产品状态机见 product.md §9。 */
  watchTracking(
    orderId: string,
    onStage: (stage: TrackingStage) => void,
  ): Unsubscribe;
}
