import { Link } from 'react-router';

/** 下单确认页(frame 856:1453 / 1507:10832 / 864:7899)· M4 实现。 */
export function OrderConfirmPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <h1 className="text-lg font-medium">下单确认</h1>
      <Link className="text-sm text-blue-600 underline" to="/tracking">
        提交订单 →
      </Link>
    </main>
  );
}
