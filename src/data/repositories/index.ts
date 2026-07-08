import { MockOrderRepository } from './mock-order-repository';
import type { OrderRepository } from './order-repository';

/** 注入点(§5):换真后端 = 只改这一行的实现。 */
export const orderRepository: OrderRepository = new MockOrderRepository();

export type {
  OrderReceipt,
  OrderRepository,
  Unsubscribe,
} from './order-repository';
