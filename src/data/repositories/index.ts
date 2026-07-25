import { MockOrderRepository } from './mock-order-repository';
import type { OrderRepository } from './order-repository';

/** Repository 注入点见 MTprototype-tech-spec.md §7。 */
export const orderRepository: OrderRepository = new MockOrderRepository();

export type {
  OrderReceipt,
  OrderRepository,
  Unsubscribe,
} from './order-repository';
