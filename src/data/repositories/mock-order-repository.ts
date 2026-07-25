import { MOCK_COURIER } from '../mock/fixtures';
import { TRACKING_TIMELINE } from '../mock/tracking-timeline';
import type { Order } from '../models/order';
import type { TrackingStage } from '../models/tracking';
import type {
  OrderReceipt,
  OrderRepository,
  Unsubscribe,
} from './order-repository';

const SUBMIT_LATENCY_MS = 600;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Mock 实现：纯内存态，状态策略见 MTprototype-tech-spec.md §6。 */
export class MockOrderRepository implements OrderRepository {
  #orderSeq = 0;

  async submitOrder(_order: Order): Promise<OrderReceipt> {
    await delay(SUBMIT_LATENCY_MS);
    this.#orderSeq += 1;
    return {
      orderId: `MT${String(this.#orderSeq).padStart(4, '0')}`,
      courier: MOCK_COURIER,
    };
  }

  watchTracking(
    _orderId: string,
    onStage: (stage: TrackingStage) => void,
  ): Unsubscribe {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let index = 0;

    const emit = () => {
      const step = TRACKING_TIMELINE[index];
      if (step === undefined) return;
      onStage(step.stage);
      index += 1;
      if (index < TRACKING_TIMELINE.length) {
        timer = setTimeout(emit, step.holdMs);
      }
    };

    emit();
    return () => clearTimeout(timer);
  }
}
