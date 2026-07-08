import { Link } from 'react-router';

/** 配送追踪页(frame 1507:20230/20684/21772/22206、1380:21404)· 时间轴 5 态,M5 实现。 */
export function TrackingPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <h1 className="text-lg font-medium">配送追踪</h1>
      <Link className="text-sm text-blue-600 underline" to="/">
        回首页 →
      </Link>
    </main>
  );
}
